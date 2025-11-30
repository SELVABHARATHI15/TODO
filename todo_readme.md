# 📝 Full-Stack ToDo Web Application

A modern full-stack ToDo application built with **Node.js (Express), MongoDB, React, and Bootstrap**.  
Users can create, read, update, and delete tasks, with **Light/Dark theme support** and a responsive UI.

---

## 🚀 Features

### 🔹 Backend (Node.js / Express / MongoDB)
- REST API for CRUD operations
- MongoDB database with Mongoose schema
- Error-handled API responses
- CORS and JSON middleware enabled

### 🔹 Frontend (React + Bootstrap)
- Add, edit, delete tasks
- Real-time updates without page refresh
- Success and error alerts
- Modern card-based UI
- Dark / Light theme toggle (persisted with LocalStorage)

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React, Bootstrap, Bootstrap Icons |
| Backend | Node.js, Express |
| Database | MongoDB |
| Protocol | REST API |
| State Management | React Hooks (useState, useEffect) |

---

## 📂 Project Structure

```
ToDo/
├─ todo-backend/
│  ├─ package-lock.json
│  ├─ package.json
│  └─ server.js
├─ todo-frontend/
│  ├─ public/
│  │  ├─ favicon.ico
│  │  ├─ index.html
│  │  └─ ...
│  ├─ src/
│  │  ├─ App.js
│  │  └─ Todo.js
│  ├─ package.json
│  └─ README.md
├─ .gitignore
└─ README.md
```

---

## ▶ Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/SELVABHARATHI15/TODO.git
cd TODO
```

### 2️⃣ Backend Setup
```bash
cd todo-backend
npm install
```

Start MongoDB (local):
```bash
# On Windows / Linux / Mac
mongod
```

Start the backend server:
```bash
node server.js
```

Server runs on:
```
http://localhost:4000
```

### 3️⃣ Frontend Setup
Open a new terminal and navigate to the frontend:
```bash
cd ../todo-frontend
npm install
npm start
```

Frontend runs on:
```
http://localhost:3000
```

Your React app communicates with the backend via:
```
http://localhost:4000/
```

---

## 🌐 API Endpoints

| Method | Endpoint    | Description          |
|--------|------------|--------------------|
| POST   | /todos     | Create a new task   |
| GET    | /todos     | Fetch all tasks     |
| PUT    | /todos/:id | Update a task by ID |
| DELETE | /todos/:id | Delete a task by ID |

**Sample Request Body (POST / PUT)**

```json
{
  "title": "Study React",
  "description": "Complete ToDo App with Light/Dark theme"
}
```

---

## 💡 Features in Frontend

- Display all tasks in a card layout
- Edit task inline without page refresh
- Delete tasks with confirmation
- Notifications for success/error messages
- Light/Dark theme toggle persisted in browser
- Responsive design for desktop & mobile

---

## 🔮 Future Enhancements

- User authentication & authorization
- Due dates and reminders
- Priority-based tasks
- Deploy backend (Render / Railway) & frontend (Netlify / Vercel)
- Mobile app version (React Native)

---

## 👤 Author

**Selva Bharathi**  
🔗 GitHub: [https://github.com/SELVABHARATHI15](https://github.com/SELVABHARATHI15)

---

## 📜 License

MIT License – free to use and modify.

