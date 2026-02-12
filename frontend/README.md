# MiniTasks Frontend

A modern, responsive task management UI built with **Next.js 16** and **React 19**.

## ✨ Features
- **Glassmorphism UI**: Tailwind styling with backdrop-blur.
- **Optimistic UI**: Immediate feedback on task actions.
- **Secure Auth**: Custom JWT authentication flow.
- **AI Integration**: Connects to backend Gemini/OpenAI endpoints.

## 🚀 Live Deployment
Hosted on Vercel, connected to a Fly.io backend.

## ⚙️ Setup & Installation

### Local Development
1.  **Install dependencies**:
    ```bash
    npm install
    ```
2.  **Environment**:
    Create `.env.local`:
    ```env
    NEXT_PUBLIC_API_URL=https://minitasks-backend.fly.dev
    ```
3.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    Access at `http://localhost:3000`.

### Vercel Deployment
1.  Push this folder to GitHub.
2.  Import project into Vercel.
3.  Set Environment Variable:
    *   `NEXT_PUBLIC_API_URL`: `https://minitasks-backend.fly.dev`
4.  Deploy.

## 🏗️ Architecture
*   **Frontend**: Next.js App Router
*   **Styling**: Tailwind CSS
*   **State**: React `useState` + Optimistic UI patterns
*   **Networking**: Axios with Interceptors for Token Injection