import React, { useContext, useState, useEffect, createContext } from "react";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(window.location.pathname);
    const [allTaskDone, setAllTaskDone] = useState([]);
    const [allTask, setAllTask] = useState([]);
    const [task, setTask] = useState({
        title: "",
        description: "",
        date: "",
    });
    const [simpleList, setSimpleList] = useState({
        title: "",
        description: [],
        simple: true,
    });

    useEffect(() => {
        let localTask = localStorage.getItem("todo");
        let localTaskDone = localStorage.getItem("done");

        if (JSON.parse(localTask)) {
            if (JSON.parse(localTask).length > 0)
                setAllTask(JSON.parse(localTask));
        }

        if (JSON.parse(localTaskDone)) {
            if (JSON.parse(localTaskDone).length > 0)
                setAllTaskDone(JSON.parse(localTaskDone));
        }
    }, []);

    useEffect(() => {
        setCurrentPage(window.location.pathname);
        auth.onAuthStateChanged((user) => {
            setUser(user);
            !user && navigate("/login");
        });
        if (
            currentPage !== "/" &&
            currentPage !== "/pomodoro" &&
            currentPage !== "/login"
        ) {
            navigate("/");
        }
    }, [user, navigate]);

    const value = {
        user,
        allTaskDone,
        setAllTaskDone,
        allTask,
        setAllTask,
        task,
        setTask,
        simpleList,
        setSimpleList,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
