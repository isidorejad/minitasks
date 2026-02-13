# MiniTasks Backend

This is the Python/FastAPI backend for MiniTasks, configured for deployment on Fly.io.

## 🔑 Environment Variables
You must set these in your Fly.io dashboard or local `.env`:
* `MONGO_URL`: Your MongoDB Atlas connection string.
* `DB_NAME`: `minitasks`
* `SECRET_KEY`: A secure random string.
* `GOOGLE_API_KEY`: Your Gemini API Key (from Google AI Studio).
* `ALLOWED_ORIGINS`: Comma-separated list of frontend URLs (e.g., `http://localhost:3000,https://mini-tasks.vercel.app`).

## 🏗 Architecture
<img src="./architecture.png" alt="System Architecture Diagram" width="600" />

## 🚀 Deployment (Fly.io)
1.  **Install Fly CLI**: `curl -L https://fly.io/install.sh | sh`
2.  **Login**: `flyctl auth login`
3.  **Launch**:
    ```bash
    flyctl launch --no-deploy
    ```
    * Say "Yes" to copying configuration if asked.
    * This generates/updates `fly.toml`.
4.  **Set Secrets**:
    ```bash
    flyctl secrets set MONGO_URL="mongodb+srv://..." SECRET_KEY="..." GOOGLE_API_KEY="..."
    ```
5.  **Deploy**:
    ```bash
    flyctl deploy
    ```
