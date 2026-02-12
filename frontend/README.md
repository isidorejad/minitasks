# MiniTasks Frontend

A modern, responsive task management UI built with **Next.js 16** and **React 19**.

## ✨ Features
- **Glassmorphism UI**: Tailwind styling with backdrop-blur.
- **Optimistic UI**: Immediate feedback on task actions.
- **Secure Auth**: Handled via HttpOnly cookies (production) or JS-Cookies (demo) with Axios interceptors.

## ⚙️ Setup & Installation

### Option 1: Docker (Recommended)
Run from the root directory using `docker-compose`.

### Option 2: Local Development
1.  **Install dependencies**:
    ```bash
    npm install
    ```
2.  **Environment**:
    Create `.env.local`:
    ```env
    NEXT_PUBLIC_API_URL=http://localhost:8000
    ```
    *Note: Ensure your backend is running on port 8000.*

3.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    Access at `http://localhost:3000`.

## 📦 Production Build
The Dockerfile uses Next.js `standalone` mode to reduce image size. Ensure `next.config.mjs` contains:
```javascript
const nextConfig = {
  output: 'standalone',
};