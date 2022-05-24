import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/login";
import Chats from "./components/chats/chats";

// import { AuthProvider } from "../contexts/AuthContext"


function App() {
  return (
    <div style={{ fontFamily: "Avenir" }}>
      <BrowserRouter>
        {/* <AuthProvider> */}
        <Routes>
          <Route path="/chats" element={<Chats />} />
          <Route path="/" element={<Login />} />
        </Routes>
        {/* </AuthProvider> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
