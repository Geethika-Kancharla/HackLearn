import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useFirebase } from "./context/Firebase";
import Article from "./pages/Article";
import Chat from "./pages/Chat";
import Card from "./components/Card";
import Voice from "./pages/Voice";
import Details from "./pages/Details";

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
      <Route path="/chat" element={<RequireAuth><Chat /></RequireAuth>} />
      <Route path="/card" element={<RequireAuth><Card /></RequireAuth>} />
      <Route path="/voice" element={<RequireAuth><Voice /></RequireAuth>} />
      <Route path="/details" element={<RequireAuth><Details /></RequireAuth>} />

    </Routes>
  );
}

//react-tostify

export default App;