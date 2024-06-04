import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useFirebase } from "./context/Firebase";
import Article from "./pages/Article";

function App() {

  const firebase = useFirebase();

  const currentUser = firebase.isLoggedIn;

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/"></Navigate>;
  }

  return (
    <Routes>
      <Route path="/home" element={<RequireAuth><Home /></RequireAuth>} />
      <Route index path="/register" element={<Register />} />
      <Route index element={<Login />} />
      <Route path="/article" element={<RequireAuth><Article /></RequireAuth>} />
    </Routes>
  );
}

export default App;