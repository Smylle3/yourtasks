import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import useMobile from "../../functions/useMobile";
import { useNavigate } from "react-router-dom";
import { BsListCheck, BsClock } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";

import logo from "../../assets/logo192.png";
import "./styles.css";
import { Popover } from "antd";
import { useEffect } from "react";
import TypeStorage from "../notifications/typeStorage/typeStorage";
import { userOptionsContent } from "../myPopoversContent/myPopoversContent";

export default function NavBar() {
    const [page, setPage] = useState(window.location.pathname);
    const { user, turnCloudToLocal, turnLocalToCloud } = useAuth();
    const navigate = useNavigate();
    const isMobile = useMobile();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setPage(window.location.pathname);
    }, [navigate]);

    const handleVisibleChange = (newVisible) => {
        setVisible(newVisible);
    };

    if (user) {
        return (
            <nav className="container-navbar">
                <div className="image-logo">
                    <img alt="logo" src={logo} className="logo-image" />
                    {!isMobile && <>YOURTASKS</>}
                </div>
                <div
                    className={`buttom ${page === "/" && "selected"}`}
                    onClick={() => navigate("/")}
                >
                    <BsListCheck className="icon" />
                    {!isMobile && <>Todo</>}
                </div>
                <div
                    className={`buttom ${page === "/pomodoro" && "selected"}`}
                    onClick={() => navigate("/pomodoro")}
                >
                    <BsClock className="icon" />
                    {!isMobile && <>Pomodoro</>}
                </div>
                <Popover
                    content={userOptionsContent(
                        TypeStorage,
                        setVisible,
                        turnCloudToLocal,
                        turnLocalToCloud,
                        isMobile
                    )}
                    title={user.displayName}
                    visible={visible}
                    onVisibleChange={handleVisibleChange}
                    trigger="click"
                >
                    <div className="user-profile buttom">
                        <AiOutlineUser className="icon" />
                        {!isMobile && user.displayName}
                    </div>
                </Popover>
            </nav>
        );
    }
}
