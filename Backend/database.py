import sqlite3
import os
import hashlib
import secrets

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR,"user.db")

def hash_password(password: str) -> str:
    salt = secrets.token_hex(16)
    pwd_hash = hashlib.pbkdf2_hmac(
        'sha256',
        password.encode('utf-8'),
        salt.encode('utf-8'),
        100000
    ).hex()
    return f"{salt}:{pwd_hash}"

def verify_password(password: str, stored_hash: str) -> bool:
    try:
        salt, pwd_hash = stored_hash.split(":")
        calc_hash = hashlib.pbkdf2_hmac(
            'sha256',
            password.encode('utf-8'),
            salt.encode('utf-8'),
            100000
        ).hex()
        return secrets.compare_digest(pwd_hash, calc_hash)
    except Exception:
        return False

def init_db():
    conn = sqlite3.connect(DB_PATH,check_same_thread=False,timeout=10)
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
            user_id TEXT PRIMARY KEY,
            usage INTEGER DEFAULT 0,
            plan TEXT DEFAULT 'free'
                   )""")
    
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS accounts (
            email TEXT PRIMARY KEY,
            password_hash TEXT NOT NULL,
            name TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                   )""")

    cursor.execute("CREATE INDEX IF NOT EXISTS idx_user_id ON users(user_id)")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_accounts_email ON accounts(email)")

    conn.commit()
    conn.close()

def get_user(user_id):
    try:
        conn = sqlite3.connect(DB_PATH,check_same_thread=False,timeout=10)
        cursor = conn.cursor()

        cursor.execute("SELECT usage, plan FROM users WHERE user_id = ?",(user_id,))
        user = cursor.fetchone()

        conn.close()
        return user 
    except Exception as e:
        print("DB ERROR",e)
        return None

def create_user(user_id):
    conn = sqlite3.connect(DB_PATH,check_same_thread=False,timeout=10)
    cursor = conn.cursor()

    cursor.execute("""INSERT OR IGNORE INTO users (user_id) VALUES (?)""",(user_id,))
    conn.commit()
    conn.close()

def update_usage(user_id,usage):
    conn = sqlite3.connect(DB_PATH,check_same_thread=False,timeout=10)
    cursor = conn.cursor()

    cursor.execute("""
            UPDATE users SET usage = ?
                   WHERE user_id = ?""", (usage,user_id))
    if cursor.rowcount == 0 :
        cursor.execute("""
             INSERT INTO users (user_id,usage)
                       VALUES(?, ?)""",(user_id,usage))
    conn.commit()
    conn.close()

def create_account(email, password, name):
    email = email.strip().lower()
    name = name.strip()
    pwd_hash = hash_password(password)
    
    conn = sqlite3.connect(DB_PATH, check_same_thread=False, timeout=10)
    cursor = conn.cursor()
    try:
        cursor.execute("""
            INSERT INTO accounts (email, password_hash, name)
            VALUES (?, ?, ?)
        """, (email, pwd_hash, name))
        conn.commit()
        # Also initialize user limits
        cursor.execute("""
            INSERT OR IGNORE INTO users (user_id, plan)
            VALUES (?, 'free')
        """, (email,))
        conn.commit()
        return {"email": email, "name": name}
    except sqlite3.IntegrityError:
        return {"error": "Email already registered"}
    except Exception as e:
        return {"error": str(e)}
    finally:
        conn.close()

def authenticate_account(email, password):
    email = email.strip().lower()
    conn = sqlite3.connect(DB_PATH, check_same_thread=False, timeout=10)
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT password_hash, name FROM accounts WHERE email = ?", (email,))
        row = cursor.fetchone()
        if row:
            stored_hash, name = row
            if verify_password(password, stored_hash):
                return {"email": email, "name": name}
        return None
    except Exception as e:
        print("Auth Error:", e)
        return None
    finally:
        conn.close()
    

