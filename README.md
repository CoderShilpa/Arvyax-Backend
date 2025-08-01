# 🧘 Arvyax Wellness App

A full-stack wellness application that enables users to create, auto-save, and publish wellness sessions (e.g. yoga, meditation). It features secure login, session management, real-time feedback, and autosave support.

---

## 📁 Project Structure

-arvyax-fullstack/
├── backend/ # Node.js + Express + MongoDB
├── frontend/ # React + Vite
└── README.md # Root-level project overview


---

## 🚀 Features

- 🔒 JWT-based User Authentication  
- 📝 Session Creation, Auto-save, and Publishing  
- 📦 REST API (protected and public)  
- 🌐 Explore Public Sessions  
- ✅ Real-time Toast Notifications  
- ⏱️ Auto-save on inactivity and interval  
- 💡 Edit session by ID  
- 📱 Fully Responsive UI  
- 🔐 Protected Dashboard Routes  

---

## ⚙️ Tech Stack

| Layer       | Tech Used                               |
|-------------|------------------------------------------|
| Frontend    | React, Vite, Tailwind CSS, React Router |
| Backend     | Node.js, Express.js, MongoDB, Mongoose  |
| Auth        | JWT (JSON Web Token)                    |
| Deployment  | Vercel (frontend), Render (backend)     |

---

## 🧩 API Endpoints

### 🧑‍💼 Auth Routes

| Method | Endpoint              | Description             |
|--------|-----------------------|-------------------------|
| POST   | `/api/auth/register`  | Register a new user     |
| POST   | `/api/auth/login`     | Login user and get JWT  |

### 📦 Session Routes

| Method | Endpoint                        | Description                         |
|--------|---------------------------------|-------------------------------------|
| GET    | `/api/sessions`                 | Get all published sessions (public) |
| GET    | `/api/my-sessions`              | Get logged-in user's sessions       |
| GET    | `/api/my-sessions/:id`          | Get single session (protected)      |
| POST   | `/api/my-sessions/save-draft`   | Save session as draft               |
| POST   | `/api/my-sessions/publish`      | Publish a session                   |

---

## 🧑‍💻 Local Development Setup

### 1. Clone the Repo

```bash
git clone https://github.com/CoderShilpa/-arvyax-fullstack.git
cd -arvyax-fullstack
