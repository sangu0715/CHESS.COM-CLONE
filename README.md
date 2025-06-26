
# ♟ Chess.com Clone

A full-stack web-based Chess application inspired by [Chess.com](https://www.chess.com), enabling users to play live chess, manage accounts, and enjoy a clean, interactive UI with real-time updates.

## 🧩 Features

* 🔐 **User Authentication:** Sign-up, login, and session handling using JWT.
* 👥 **Multiplayer Chess Matches:** Play real-time chess with another user.
* ♟ **Interactive Chessboard:** Frontend board built with drag-and-drop functionality.
* 💬 **Chat Feature:** In-game chat between players.
* 🔄 **Real-time Updates:** Socket.io integration for real-time game state and messaging.
* 🧠 **Game Logic:** Backend validates and processes all chess moves.
* 💾 **Game History:** Store and retrieve past games.

## ⚙️ Tech Stack

### Frontend (`frontendSetup.yaml`)

* **React.js** for component-based UI
* **Redux Toolkit** for state management
* **Tailwind CSS** for responsive styling
* **React Router** for navigation
* **Chessboard.jsx** to render the chessboard UI
* **Socket.io-client** for real-time interactions

### Backend (`backendSetup.yaml`)

* **Node.js + Express.js** for REST APIs
* **MongoDB** with **Mongoose** for user and match data storage
* **JWT** for secure authentication
* **Socket.io** for real-time WebSocket communication
* **Chess.js** for validating chess moves and game status

## 🚀 Getting Started

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm start
```

Make sure to configure your environment variables (e.g., `MONGO_URI`, `JWT_SECRET`) in a `.env` file in the `backend/` folder.

## 📂 Folder Structure

```
/frontend
  /src
    /components
    /redux
    /pages
    ...

/backend
  /controllers
  /models
  /routes
  ...
```

## ✅ To-Do

* Add AI-based Chess Engine
* Implement Leaderboards and Ratings
* Enable Friend Invites and Custom Game Modes

