import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import useMobile from "../../functions/useMobile";
import { useNavigate } from "react-router-dom";
import { BsListCheck, BsClock } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";

import logo from "../../assets/logo192.png";
import "./styles.css";
import { Popover, Tag } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useEffect } from "react";

export default function NavBar() {
    const [page, setPage] = useState(window.location.pathname);
    const { user } = useAuth();
    const navigate = useNavigate();
    const isMobile = useMobile();

    useEffect(() => {
        setPage(window.location.pathname)
    }, [navigate]);

    function handleLogout() {
        signOut(auth);
    }

    const content = (
        <div>
            <button className="logout-button" onClick={handleLogout}>
                <LogoutOutlined className="icon-logout" /> LogOut
            </button>
        </div>
    );

    if (!user) {
        return null;
    } else {
        return (
            <div className="container-navbar">
                <div className="image-logo">
                    <img alt="logo" src={logo} className="logo-image" />
                    {isMobile ? null : <>YOURTASKS</>}
                </div>
                <div
                    className={`buttom ${page === "/" ? "selected" : null}`}
                    onClick={() => navigate("/")}
                >
                    <BsListCheck className="icon" />
                    {isMobile ? null : <>Todo</>}
                </div>
                <div style={{ display: "flex", gap: ".2em" }}>
                    <div
                        className={`buttom ${
                            page === "/pomodoro" ? "selected" : null
                        }`}
                        onClick={() => navigate("/pomodoro")}
                    >
                        <BsClock className="icon" />
                        {isMobile ? null : <>Pomodoro</>}
                    </div>
                    <Tag color="processing">New</Tag>
                </div>
                <Popover content={content} title="Usuário" trigger="click">
                    <div className="user-profile buttom">
                        <AiOutlineUser className="icon" />
                        {isMobile ? null : user.displayName}
                    </div>
                </Popover>
            </div>
        );
    }
}
