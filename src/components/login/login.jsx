import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { GithubFilled, GoogleOutlined } from "@ant-design/icons";
import { useAuth } from "context/authContext";
import { signInWithPopup } from "firebase/auth";
import { auth, gitProvider, googleProvider } from "config/firebase";
import logo from "../../assets/logo192.png";
import {
    LoginButton,
    LoginCard,
    LoginIcon,
    LoginLoading,
    LoginPage,
    LoginTitle,
    LoginTitleText,
} from "./stylesLogin";

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
        <LoginPage>
            <LoginCard>
                <LoginTitle>
                    <LoginIcon alt="logo" src={logo} />
                    <LoginTitleText>Bem vindo ao YourTasks</LoginTitleText>
                    <LoginIcon alt="logo" src={logo} />
                </LoginTitle>
                {loading ? (
                    <>
                        <LoginLoading border="var(--color-three)">
                            <Spin />
                        </LoginLoading>
                        <LoginLoading border="var(--dark-color)">
                            <Spin />
                        </LoginLoading>
                    </>
                ) : (
                    <>
                        <LoginButton
                            color="var(--color-three)"
                            border="var(--color-three)"
                            onClick={() => handleLogin("google")}
                        >
                            <GoogleOutlined />
                            Login com Google
                        </LoginButton>
                        <LoginButton
                            color="var(--dark-color)"
                            border="var(--dark-color)"
                            onClick={() => handleLogin("google")}
                        >
                            <GithubFilled />
                            Login com GitHub
                        </LoginButton>
                    </>
                )}
            </LoginCard>
        </LoginPage>
    );
}
