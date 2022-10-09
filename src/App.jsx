import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "context/authContext";
import { PomodoroProvider } from "context/pomodoroContext";

import Pomodoro from "components/pomodoro/pomodoro";
import Login from "components/login/login";
import NavBar from "components/navBar/navBar";
import HomePage from "components/todoList/homePage";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <PomodoroProvider>
                    <NavBar />
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/pomodoro" element={<Pomodoro />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </PomodoroProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
