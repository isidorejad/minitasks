# MiniTasks Backend API

Built with **FastAPI** and **Motor** (Async MongoDB driver).

## 🔐 Security & Design
- **Authentication**: Custom OAuth2 flow using JWT (JSON Web Tokens).
- **Password Safety**: Hashing performed via `bcrypt` (passlib).
- **Validation**: Strict Pydantic models.
- **AI Fallback**: Robust error handling for OpenAI; falls back to random dates on failure.

## ⚙️ Setup & Installation

### Option 1: Docker (Recommended)
Run from the root directory using `docker-compose`.

### Option 2: Local Development
1.  **Create venv**:
    ```bash
    python -m venv venv
    source venv/bin/activate  # Windows: venv\Scripts\activate
    ```
2.  **Install Deps**:
    ```bash
    pip install -r requirements.txt
    ```
3.  **Environment Variables**:
    Create a `.env` file in this directory:
    ```env
    SECRET_KEY=super_secret_key_change_me
    ALGORITHM=HS256
    MONGO_URL=mongodb://localhost:27017
    DB_NAME=minitasks
    OPENAI_API_KEY=your_key_here
    ALLOWED_ORIGINS=http://localhost:3000
    ```
4.  **Run**:
    ```bash
    uvicorn app.main:app --reload --port 8000
    ```

## 📚 API Documentation
Once running, visit `/docs` for the interactive Swagger UI.