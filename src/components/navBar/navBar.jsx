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
import { userOptionsContent } from "../myPopoversContent/myPopoversContent";

export default function NavBar() {
    const [page, setPage] = useState(window.location.pathname);
    const { user, storageInfo, turnCloudToLocal, turnLocalToCloud } = useAuth();
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
                <button
                    className={`buttom ${page === "/" && "selected"}`}
                    onClick={() => navigate("/")}
                >
                    <BsListCheck />
                    {!isMobile && <>Todo</>}
                </button>
                <button
                    className={`buttom ${page === "/pomodoro" && "selected"}`}
                    onClick={() => navigate("/pomodoro")}
                >
                    <BsClock />
                    {!isMobile && <>Pomodoro</>}
                </button>
                <Popover
                    content={userOptionsContent(
                        setVisible,
                        storageInfo,
                        turnCloudToLocal,
                        turnLocalToCloud
                    )}
                    title={user.displayName}
                    visible={visible}
                    onVisibleChange={handleVisibleChange}
                    trigger="click"
                >
                    <button className="user-profile">
                        <AiOutlineUser className="icon" />
                        {!isMobile && user.displayName}
                    </button>
                </Popover>
            </nav>
        );
    }
}
