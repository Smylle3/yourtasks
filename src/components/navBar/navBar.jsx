import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Popover } from "antd";
import {
    ButtonNav,
    ContainerNavBar,
    ImageLogo,
    ImgLogo,
    LabelP,
    UserButtonNav,
} from "./stylesNavbar";
import { useAuth } from "context/authContext";
import { BsListCheck, BsClock } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { userOptionsContent } from "components/myPopoversContent/myPopoversContent";

import logo from "../../assets/logo192.svg";

export default function NavBar() {
    const [page, setPage] = useState(window.location.pathname);
    const { user } = useAuth();
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setPage(window.location.pathname);
    }, [navigate]);

    const handleVisibleChange = (newVisible) => {
        setVisible(newVisible);
    };

    if (user) {
        return (
            <ContainerNavBar>
                <ImageLogo>
                    <ImgLogo alt="logo" src={logo} />
                    <LabelP>YOURTASKS</LabelP>
                </ImageLogo>
                <ButtonNav
                    selected={page === "/" ? "black" : "white"}
                    onClick={() => navigate("/")}
                >
                    <BsListCheck />
                    <LabelP>Todo</LabelP>
                </ButtonNav>
                <ButtonNav
                    selected={page === "/pomodoro" ? "black" : "white"}
                    onClick={() => navigate("/pomodoro")}
                >
                    <BsClock />
                    <LabelP>Pomodoro</LabelP>
                </ButtonNav>
                <Popover
                    content={userOptionsContent(setVisible)}
                    title={user.displayName}
                    visible={visible}
                    onVisibleChange={handleVisibleChange}
                    trigger="click"
                >
                    <UserButtonNav>
                        <AiOutlineUser className="icon" />
                        <LabelP>{user.displayName}</LabelP>
                    </UserButtonNav>
                </Popover>
            </ContainerNavBar>
        );
    }
}
