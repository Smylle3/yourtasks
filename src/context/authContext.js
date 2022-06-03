import React, { useContext, useState, useEffect, createContext } from "react";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setUser(user);
            !user && navigate("/login");
        });
    }, [user, navigate]);

    const value = { user };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
