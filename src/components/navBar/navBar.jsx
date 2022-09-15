import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Popover } from "antd";
import {
    ButtonNav,
    ContainerNavBar,
    ImageLogo,
    ImgLogo,
    UserButtonNav,
} from "./stylesNavbar";
import { useAuth } from "context/authContext";
import { BsListCheck, BsClock } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { userOptionsContent } from "components/myPopoversContent/myPopoversContent";
import useMobile from "functions/useMobile";

import logo from "../../assets/logo192.png";

export default function NavBar() {
    const [page, setPage] = useState(window.location.pathname);
    const { user } = useAuth();
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
            <ContainerNavBar>
                <ImageLogo>
                    <ImgLogo alt="logo" src={logo} />
                    {!isMobile && <>YOURTASKS</>}
                </ImageLogo>
                <ButtonNav
                    selected={page === "/" ? "black" : "white"}
                    onClick={() => navigate("/")}
                >
                    <BsListCheck />
                    {!isMobile && <>Todo</>}
                </ButtonNav>
                <ButtonNav
                    selected={page === "/pomodoro" ? "black" : "white"}
                    onClick={() => navigate("/pomodoro")}
                >
                    <BsClock />
                    {!isMobile && <>Pomodoro</>}
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
                        {!isMobile && user.displayName}
                    </UserButtonNav>
                </Popover>
            </ContainerNavBar>
        );
    }
}
