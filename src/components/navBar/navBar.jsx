import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { BsListCheck, BsCalendarDate, BsClock } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";

import logo from "../../assets/logo192.png";
import "./styles.css";

export default function NavBar() {
    const [page, setPage] = useState(window.location.pathname);
    const { user } = useAuth();
    const navigate = useNavigate();

    function handleNabigation(page) {
        navigate(page);
        setPage(page);
    }
    if (!user) {
        return null;
    } else {
        return (
            <div className="container-navbar">
                <div className="image-logo">
                    <img alt="logo" src={logo} className="logo-image" />YOURTASKS
                </div>
                <div
                    className={`buttom ${page === "/" ? "selected" : null}`}
                    onClick={() => handleNabigation("/")}
                >
                    <BsListCheck className="icon" />
                    Todo
                </div>
                <div
                    className={`buttom ${
                        page === "/calendar" ? "selected" : null
                    }`}
                    onClick={() => handleNabigation("/calendar")}
                >
                    <BsCalendarDate className="icon" />
                    Calendar
                </div>
                <div
                    className={`buttom ${
                        page === "/pomodoro" ? "selected" : null
                    }`}
                    onClick={() => handleNabigation("/pomodoro")}
                >
                    <BsClock className="icon" />
                    Pomodoro
                </div>
                <div className="user-profile buttom">
                    <AiOutlineUser className="icon" />
                    {user.displayName}
                </div>
            </div>
        );
    }
}
