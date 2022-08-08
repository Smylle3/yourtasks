import { LogoutOutlined, SettingOutlined } from "@ant-design/icons";
import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../../config/firebase";

function handleLogout() {
    signOut(auth);
}

const userOptionsContent = (
    TypeStorage,
    setVisible,
    turnCloudToLocal,
    turnLocalToCloud,
    isMobile
) => (
    <div className="settings-user-menu">
        <button
            className="logout-button"
            onClick={() => {
                TypeStorage(turnCloudToLocal, turnLocalToCloud, isMobile);
                setVisible(false);
            }}
        >
            <SettingOutlined className="icon-logout" /> Storage
        </button>
        <button
            className="logout-button"
            onClick={() => {
                setVisible(false);
                handleLogout();
            }}
        >
            <LogoutOutlined className="icon-logout" /> LogOut
        </button>
    </div>
);

export { userOptionsContent };
