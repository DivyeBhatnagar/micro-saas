# 🚀 EchoStream - AI Powered Content Repurposing SaaS

EchoStream is a design-first, high-fidelity AI-powered Micro SaaS platform that transforms raw long-form content (audio transcripts, article assets, raw drafts) into high-end social threads, LinkedIn posts, and concise executive summaries in seconds.

The visual direction features absolute restraint, minimal typography, luxury glassmorphic layouts, and smooth interactive WebGL particle meshes.

---

## ✨ Key Features

### 1. High-End Editorial Typography
- Migrated to **Fellix** primary typeface (with local Regular 400 and Medium 500 configurations mapped in `index.css`) for vision-pro and linear.app aesthetic standards.
- Apple-style headline settings: font-size `76px`, line-height `0.92`, letter-spacing `-0.06em`, and solid `#FAFAFA` white.
- Secondary headlines styled with a premium metallic brushed-aluminum gradient (`linear-gradient(180deg, #E7EBF2 0%, #A7B0BE 100%)`).

### 2. Multi-Channel Content Repurposing
- **Audio Transcript Parsing**: Converts complex source meetings, transcript text, or blog items.
- **Social Media Packaging**:
  - Twitter Threads (rendered as card-based threads with selectable hook options).
  - LinkedIn Posts (curated professional formatting).
  - Executive Summaries (minimal, clean metadata representation).
- **Email Newsletters**: Campaigns formatted ready for distribution.
- **Instagram Posts**: Structured captions and trending hashtag blocks.

### 3. Interactive WebGL Backgrounds & Section Dividers
- **Ferrofluid Background**: An interactive WebGL particle mesh in the Hero and Footer sections, responding to global mouse coordinates for a fluid, tactile feel.
- **DarkVeil Workspace Canvas**: Spans the Generative Workspace, overlaying CPPN waves behind active input fields.
- **Silk Pricing Backdrop**: A vibrant violet silk shader that flows dynamically behind the pricing section.
- **ColorBends Features Backdrop**: Smooth, floating red/blue/turquoise gradients behind the bento grid section.
- **FlowingMenu Divider**: A GSAP-powered horizontal scrolling row (Repurpose, Translate, Scale) that previews image overlays on hover.

### 4. Interactive Staggered Nodes & 3D Perspective Tilt
- The Hero Right workflow diagram floats continuously using Framer Motion.
- Calculates dynamic mouse coordinates to tilt the centerpiece card container in a 3D perspective (X/Y axis rotation up to `4°`).
- Connectors animates slow moving light pulses along 1px gradient paths.
- Subtle backing radial light glow (`rgba(110,168,254,0.08)`) with `140px` blur creates deep visual hierarchy.

### 5. Custom Authentication System
- Beautiful full-screen overlay for Login & Sign Up.
- Supports secure email login and **Continue with Google** OAuth integration.
- Persists user sessions locally via `localStorage` with reactive login/logout states in the navbar.
- Same premium backdrop canvas is kept active behind sign-in forms to maintain absolute style continuity.

### 6. Performance Optimization
- Configured Vite manual-chunking output splits inside `vite.config.js` to extract heavy packages (Three.js, OGL, GSAP) into separate vendors chunks. This resolves Vite >500kB warning messages and improves browser caching performance.

---

## 🛠 Tech Stack

- **Frontend**: React (Vite), CSS-First Design System, GSAP, Three.js, OGL, Framer Motion.
- **Backend**: Python, Flask, Flask-CORS.
- **AI Engine**: OpenRouter API, Meta Llama 3 (8B Instruct model).
- **Hosting & CI/CD**: Vercel (Frontend), Render (Backend).

---

## 📂 Project Structure

```bash
Micro-Saas-Repurposing/
│
├── Backend/
│   ├── services/
│   │   └── ai_service.py
│   │
│   ├── app.py
│   ├── database.py
│   ├── config.py
│   ├── requirements.txt
│   └── .env
│
├── Frontend/
│   ├── public/
│   │   └── fonts/         
│   ├── src/
│   │   ├── App.jsx        
│   │   ├── main.jsx
│   │   ├── index.css       
│   │   ├── BorderGlow.jsx
│   │   ├── ColorBends.jsx
│   │   ├── DarkVeil.jsx
│   │   ├── Ferrofluid.jsx
│   │   ├── FlowingMenu.jsx
│   │   └── Silk.jsx
│   │
│   ├── package.json
│   └── vite.config.js      
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/DivyeBhatnagar/micro-saas.git
cd micro-saas
```

### 2. Backend Setup
```bash
cd Backend
python -m venv venv

# Windows activation
venv\Scripts\activate
# Mac/Linux activation
source venv/bin/activate

pip install -r requirements.txt
```

Create a `.env` file in the `Backend/` directory:
```env
GEMINI_API_KEY=your_gemini_api_key
FREE_LIMIT=100
```

Run Flask:
```bash
python3 app.py
# Backend runs at http://127.0.0.1:5000
```

### 3. Frontend Setup
```bash
cd ../Frontend
npm install
```

Create a `.env` file in the `Frontend/` directory:
```env
VITE_API_URL=http://127.0.0.1:5000
```

Run Vite:
```bash
npm run dev
# Frontend runs at http://localhost:5173
```

---

## 🔌 API Endpoint Specification

### 1. User Sign Up
**POST** `/api/signup`

**Request Body**:
```json
{
    "email": "user@example.com",
    "password": "secure_password",
    "name": "Jane Doe"
}
```

**Response Body (201 Created)**:
```json
{
    "email": "user@example.com",
    "name": "Jane Doe"
}
```

### 2. User Sign In
**POST** `/api/login`

**Request Body**:
```json
{
    "email": "user@example.com",
    "password": "secure_password"
}
```

**Response Body (200 OK)**:
```json
{
    "email": "user@example.com",
    "name": "Jane Doe"
}
```

### 3. Fetch Usage & Limits
**GET** `/api/usage/<user_id>`

**Response Body (200 OK)**:
```json
{
    "usage": 3,
    "limit": 100,
    "plan": "free"
}
```

### 4. Generate Repurposed Output
**POST** `/generate`

**Request Body**:
```json
{
    "text": "AI is transforming startups by streamlining content distribution...",
    "tone": "professional",
    "format": "social",
    "userId": "user@example.com",
    "instructions": "",
    "brandVoice": "professional",
    "audience": "Startup Founders"
}
```

**Response Body (200 OK)**:
```json
{
   "twitter": [
      "Tweet 1...",
      "Tweet 2...",
      "Tweet 3...",
      "Tweet 4...",
      "Tweet 5..."
   ],
   "linkedin": "LinkedIn post content...",
   "summary": "Summary post content...",
   "usage": 4,
   "limit": 100
}
```

---

## 🚀 Production Deployment Settings

### Backend (Render)
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `gunicorn app:app`
- **Environment Variables**:
  - `GEMINI_API_KEY`: `your_gemini_api_key`
  - `FREE_LIMIT`: `100`

### Frontend (Vercel)
- **Root Directory**: `Frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Environment Variables**:
  - `VITE_API_URL`: `https://your-render-backend-url.onrender.com`

