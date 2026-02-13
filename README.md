# MiniTasks: Intelligent Task Management

A full-stack, AI-powered task manager built for the **Orbtronics Ltd** Technical Design Round. 

This project demonstrates a modern **Microservices** architecture, utilizing **FastAPI** for high-performance backend logic and **Next.js 16** for a reactive, optimistic UI. It features an AI agent powered by **Google Gemini 2.5** that analyzes task descriptions to intelligently suggest due dates.

---

## 🚀 Live Deployment

* **Frontend (Vercel)**: [https://minitasks-dev.vercel.app/](https://minitasks-dev.vercel.app/)
* **Backend API (Fly.io)**: [https://minitasks-backend.fly.dev/docs](https://minitasks-backend.fly.dev/docs)
* **Demo Credentials**:
    * **Email**: `test@example.com`
    * **Password**: `password123`

---

## 🏗️ System Architecture

The application is containerized and follows a decoupled client-server model:

<img src="./architecture.png" alt="System Architecture Diagram" width="700" />

### Tech Stack
* **Frontend**: Next.js 16 (App Router), React 19, Tailwind CSS, Axios (with Interceptors).
* **Backend**: Python 3.11, FastAPI, Motor (Async MongoDB), Pydantic V2.
* **Database**: MongoDB Atlas (Cloud).
* **AI Layer**: Google Gemini 2.5 Flash (via Google Generative AI SDK).
* **DevOps**: Docker, Docker Compose, GitHub Actions (CI), Fly.io.

---

## ⚡ Quick Start (Local Docker)

The easiest way to run the full stack locally is via Docker Compose.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/isidorejad/minitasks.git
    cd minitasks
    ```

2.  **Environment Setup:**
    Create a `.env` file in the `backend/` directory:
    ```env
    MONGO_URL=mongodb://db:27017
    DB_NAME=minitasks
    SECRET_KEY=dev_secret_key_123
    GOOGLE_API_KEY=your_gemini_api_key_here
    ALLOWED_ORIGINS=http://localhost:3000
    ```

3.  **Launch the Stack:**
    ```bash
    docker-compose up --build
    ```

4.  **Access the App:**
    * **Frontend**: [http://localhost:3000](http://localhost:3000)
    * **API Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 🛠️ Manual Development Setup

If you prefer running services individually without Docker:

### Backend
1.  Navigate to `backend/`
2.  Install dependencies: `pip install -r requirements.txt`
3.  Run server: `uvicorn main:app --reload`

### Frontend
1.  Navigate to `frontend/`
2.  Install dependencies: `npm install`
3.  Run dev server: `npm run dev`

---

## 🧠 AI Implementation & Safeguards

The "Suggest Due Date" feature uses **Gemini 2.5 Flash** for low-latency inference.

### Prompt Engineering
The system uses a strict, deterministic prompt to prevent hallucination. We instruct the model to act solely as a date extractor/calculator based on the current UTC time.

> *"Analyze this task description and suggest a due date (YYYY-MM-DD) relative to today. Return ONLY the date string."*

### Security & Guardrails
1.  **Server-Side Execution**: The Google API Key is stored strictly in backend environment variables. The client never communicates directly with Google.
2.  **Input Validation**: The backend validates that the AI response matches the `YYYY-MM-DD` format.
3.  **Graceful Fallback**: If the AI API times out, rate limits, or returns invalid data, the system falls back to a randomized heuristic (1-5 days in the future) to ensure the UI never breaks.

---

## ✅ Testing

The backend includes `pytest` integration for API endpoint verification.

To run tests (ensure backend dependencies are installed):
```bash
cd backend
pytest
```

* **Scope**: Covers Auth flows (Signup/Login), CRUD operations, and Async DB connectivity.

---

## 🔮 Trade-offs & Future Improvements

* **Auth**: Currently uses stateless JWTs. For higher security, we would implement Refresh Tokens and store access tokens in `httpOnly` cookies to prevent XSS.
* **Database**: MongoDB is schema-less, but we enforce strict schemas via Pydantic. A migration tool (like Beanie or Alembic) would be added for production schema changes.
* **AI Context**: Currently, the AI only sees the description. Future versions could pass the user's "historical velocity" to better estimate due dates.
