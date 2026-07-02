from flask import Flask,request,jsonify
import os
from services.ai_service import generate_content
from flask_cors import CORS
from database import init_db, get_user, create_user, update_usage, create_account, authenticate_account

app = Flask(__name__)
CORS(app)

init_db()

FREE_LIMIT = int(os.getenv("FREE_LIMIT", 100)) 

@app.route("/")
def home():
    return "Hello! Backend Is Running"

@app.route("/api/signup", methods=['POST'])
def signup():
    data = request.get_json(silent=True)
    if not data or "email" not in data or "password" not in data or "name" not in data:
        return jsonify({"error": "Invalid Input"}), 400
    
    email = data.get("email")
    password = data.get("password")
    name = data.get("name")
    
    if not email or not password or not name:
        return jsonify({"error": "Fields cannot be empty"}), 400
        
    result = create_account(email, password, name)
    if "error" in result:
        return jsonify({"error": result["error"]}), 400
        
    return jsonify(result), 201

@app.route("/api/login", methods=['POST'])
def login():
    data = request.get_json(silent=True)
    if not data or "email" not in data or "password" not in data:
        return jsonify({"error": "Invalid Input"}), 400
        
    email = data.get("email")
    password = data.get("password")
    
    result = authenticate_account(email, password)
    if not result:
        return jsonify({"error": "Invalid email or password"}), 401
        
    return jsonify(result), 200

@app.route("/api/usage/<user_id>", methods=['GET'])
def get_usage_limit(user_id):
    if not user_id or "@" not in user_id:
        ip = request.remote_addr
        user_id = f"anonymous_{ip}"
    user = get_user(user_id)
    if not user:
        create_user(user_id)
        usage = 0
        plan = "free"
    else:
        usage, plan = user
    return jsonify({
        "usage": usage,
        "limit": FREE_LIMIT,
        "plan": plan
    }), 200


@app.route("/generate",methods =['POST'])
def generate():
    # 1.Get Text
    data = request.get_json(silent = True)

    # Validate first
    if not data or "text" not in data:
        return jsonify({
            "error":"Invalid Input"
        }),400
    
    if len(data.get("text","")) > 5000:
        return jsonify({"error":"Text too long"}),400


    user_id = data.get("userId", "anonymous")
    # If the user is anonymous or not provided, bind with IP. Otherwise, use email.
    if not user_id or "@" not in user_id:
        ip = request.remote_addr
        user_id = f"anonymous_{ip}"

    # Get User From Database
    user = get_user(user_id)


    if not user:
        create_user(user_id)
        usage = 0
        plan = "free"
    else:
        usage,plan = user
    
    # CHECK LIMIT
    if plan == "free" and usage >= FREE_LIMIT:
        return jsonify({
            "error":"limit_reached",
            "message":"Free limit reached"
        })
    
    text = data.get("text")

    tone = data.get("tone","professional")

    format = data.get("format","social")
    
    instructions = data.get("instructions","")

    brand_voice = data.get("brandVoice", "professional")

    audience = data.get("audience","Startup Founders")
    
    
    #2.Print Data
    print(f"[REQUEST] user ={user_id} Usage: {usage}/{FREE_LIMIT}")

    #3. AI CALL
    try:
     ai_output = generate_content(text,
                                  tone,
                                  format, instructions,
                                  brand_voice,
                                  audience
                                  )
    except Exception as e:
     print("AI ERROR:",str(e))
     return jsonify({"error":"AI service failed"}),500

    # Update Usage Only If Success
    if isinstance(ai_output,dict) and "error" not in ai_output:
        usage += 1
        update_usage(user_id,usage) 

    

    # 4.return jsonify
    
    return jsonify ({
        **ai_output,
        "usage":usage,
        "limit":FREE_LIMIT
    })
    
    




if __name__ == "__main__":
    app.run(host="0.0.0.0",port=5001)