import React, { useEffect, useState } from "react";
import { GithubFilled, GoogleOutlined } from "@ant-design/icons";
import logo from "../../assets/logo192.png";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, gitProvider } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { Spin } from "antd";

export default function Login() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        if (user) navigate("/");
    }, [navigate, user]);

    async function handleLogin(type) {
        setLoading(true);
        try {
            if (type === "google") await signInWithPopup(auth, googleProvider);
            else if (type === "github")
                await signInWithPopup(auth, gitProvider);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            navigate("/");
        }
    }

    return (
        <div id="login-page">
            <div id="login-card">
                <div id="login-title">
                    <img alt="logo" src={logo} />
                    <h2>Bem vindo ao YourTasks</h2>
                    <img alt="logo" src={logo} />
                </div>
                {loading ? (
                    <>
                        <div className="loading google"><Spin /></div>
                        <div className="loading github"><Spin /></div>
                    </>
                ) : (
                    <>
                        <div
                            className="login-button google"
                            onClick={() => handleLogin("google")}
                        >
                            <GoogleOutlined />
                            Login com Google
                        </div>
                        <div
                            className="login-button github"
                            onClick={() => handleLogin("github")}
                        >
                            <GithubFilled /> Login com GitHub
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
