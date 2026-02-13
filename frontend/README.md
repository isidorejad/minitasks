# MiniTasks Frontend

A modern, responsive task management UI built with **Next.js 16**, **React 19**, and **Tailwind CSS**.

## ✨ Features

* **Landing Page**: High-conversion welcome screen with feature breakdown.
* **Dashboard**: Secure task management area (protected by JWT).
* **AI Integration**: One-click "Suggest Due Date" powered by Google Gemini.
* **Optimistic UI**: Immediate interface updates before API confirmation.
* **Glassmorphism**: Modern UI aesthetics with backdrop-blur effects.

## 📂 Project Structure

```bash
├── app/
│   ├── page.js            # Public Landing Page
│   ├── dashboard/         # Protected Task Dashboard
│   ├── login/             # Auth Pages
│   └── layout.js          # Root Layout (Navbar & Providers)
├── components/            # Reusable UI components
├── utils/
│   └── api.js             # Axios instance with Interceptors
└── public/                # Static assets
```

## 🚀 Getting Started

### Prerequisites
* Node.js 18+
* Backend API running (Locally or on Fly.io)

### Local Development

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Configure Environment:**
    Create a `.env.local` file in the root of the frontend directory:
    ```bash
    # Point this to your backend (Localhost or Fly.io URL)
    NEXT_PUBLIC_API_URL=http://localhost:8000
    ```

3.  **Run Dev Server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000).

## 🐳 Docker Deployment

To build and run the frontend container locally:

1.  **Build Image:**
    *Note: You must pass the API URL as a build argument.*
    ```bash
    docker build \
      --build-arg NEXT_PUBLIC_API_URL=https://your-backend.fly.dev \
      -t minitasks-frontend .
    ```

2.  **Run Container:**
    ```bash
    docker run -p 3000:3000 minitasks-frontend
    ```

## 🧪 Key Decisions & Trade-offs

*   **Auth**: Used `js-cookie` for simplicity in this demo. In a high-security production env, we would use `httpOnly` cookies set by the backend to prevent XSS.
*   **State Management**: React `useState` + Optimistic UI patterns were chosen over Redux/Zustand to keep complexity low for this specific scope.
*   **Styling**: Tailwind CSS was selected for rapid development and consistent design tokens.
