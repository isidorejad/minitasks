# MiniTasks: Full-Stack Task Manager

An "Exceptional" grade task management application built for the **Orbtronics Ltd** Technical Design Round. This project features a Python (FastAPI) backend, a Next.js frontend, and a MongoDB database, all orchestrated via Docker.

## 🏗️ System Architecture

![System Architecture Diagram](./architecture.png)

*The application follows a modern decoupled architecture:*
1.  **Frontend**: Next.js (React 19) styled with Tailwind CSS, utilizing Optimistic UI updates.
2.  **Backend**: FastAPI (Python 3.11) providing a robust REST JSON API.
3.  **Database**: MongoDB for flexible task storage.
4.  **AI Layer**: OpenAI (GPT-4o-mini) integration for intelligent due-date suggestions.

## 🚀 Quick Start (Docker)

Ensure you have Docker and Docker Desktop installed and running.

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd mini-tasks
    ```

2.  **Environment Setup:**
    *   Create `backend/.env` (see backend/README.md).
    *   Frontend environment variables are handled automatically via Docker build args.

3.  **Launch the Stack:**
    ```bash
    docker-compose up --build
    ```

4.  **Access the App:**
    *   Open [http://localhost:3000](http://localhost:3000)
    *   API Docs: [http://localhost:8000/docs](http://localhost:8000/docs)

## 🧪 Demo Credentials
You can sign up a new user, or use:
*   **Email**: `test@example.com`
*   **Password**: `password123`