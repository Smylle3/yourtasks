import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import useMobile from "../../functions/useMobile";
import { useNavigate } from "react-router-dom";
import { BsListCheck, BsClock } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";

import logo from "../../assets/logo192.png";
import "./styles.css";
import { Popover } from "antd";
import { LogoutOutlined, SettingOutlined } from "@ant-design/icons";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useEffect } from "react";
import TypeStorage from "../notifications/typeStorage/typeStorage";

export default function NavBar() {
    const [page, setPage] = useState(window.location.pathname);
    const { user } = useAuth();
    const navigate = useNavigate();
    const isMobile = useMobile();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setPage(window.location.pathname);
    }, [navigate]);

    function handleLogout() {
        signOut(auth);
    }
    
    const handleVisibleChange = (newVisible) => {
        setVisible(newVisible);
    };

    const content = (
        <div className="settings-user-menu">
            <button className="logout-button" onClick={handleLogout}>
                <LogoutOutlined className="icon-logout" /> LogOut
            </button>
            <button
                className="logout-button"
                onClick={() => {
                    TypeStorage();
                    setVisible(false);
                }}
            >
                <SettingOutlined className="icon-logout" /> Armazenamento
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
                <div
                    className={`buttom ${
                        page === "/pomodoro" ? "selected" : null
                    }`}
                    onClick={() => navigate("/pomodoro")}
                >
                    <BsClock className="icon" />
                    {isMobile ? null : <>Pomodoro</>}
                </div>
                <Popover
                    content={content}
                    title="Usuário"
                    visible={visible}
                    onVisibleChange={handleVisibleChange}
                    trigger="click"
                >
                    <div className="user-profile buttom">
                        <AiOutlineUser className="icon" />
                        {isMobile ? null : user.displayName}
                    </div>
                </Popover>
            </div>
        );
    }
}
