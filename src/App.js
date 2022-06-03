import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoList from "./components/todoList/todoList";
import Login from "./components/login/login";
import Pomodoro from "./components/pomodoro/pomodoro";
import Calendar from "./components/calendar/calendar";

import { AuthProvider } from "./context/authContext";
import NavBar from "./components/navBar/navBar";

function App() {
    return (
        <div>
            <BrowserRouter>
                <AuthProvider>
                    <NavBar />
                    <Routes>
                        <Route path="/" element={<TodoList />} />
                        <Route path="/calendar" element={<Calendar />} />
                        <Route path="/pomodoro" element={<Pomodoro />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
