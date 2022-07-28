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
        checkList: [],
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
        localStorage.setItem("todo", JSON.stringify(allTask));
    }, [allTask.length]);
    useEffect(() => {
        localStorage.setItem("done", JSON.stringify(allTaskDone));
    }, [allTaskDone.length]);

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

    /*POMODORO SPACE*/
    const [timer, setTimer] = useState(false);
    const [timerObj, setTimerObj] = useState({
        min: 0,
        sec: 0,
        prog: 0,
    });
    const [finalTime, setFinalTime] = useState(25);
    const [finalSleep, setFinalSleep] = useState(5);
    const [timerFunction, setTimerFunction] = useState("work");

    let seconds = 0;
    let minutes = 0;
    let progress = 0;

    useEffect(() => {
        if (timerObj.min === finalTime && timerFunction === "work") {
            stopTimer();
            setTimerFunction("sleep");
            startTimer();
        }
        if (timerObj.min === finalSleep && timerFunction === "sleep") {
            stopTimer();
            setTimerFunction("work");
            startTimer();
        }
    }, [timerObj.min]);

    function startTimer() {
        setTimer(setInterval(() => showTime(), 1000));
    }
    function stopTimer() {
        clearInterval(timer);
        setTimer(false);
        setTimerObj({
            min: 0,
            sec: 0,
            prog: 0,
        });
        setTimerFunction("work");
    }

    function showTime() {
        seconds++;
        progress++;
        setTimerObj((prevState) => ({
            ...prevState,
            sec: seconds,
            prog: progress,
        }));
        if (seconds > 59) {
            seconds = 0;
            minutes++;
            setTimerObj((prevState) => ({
                ...prevState,
                sec: seconds,
                min: minutes,
            }));
        }
    }
    /*POMODORO SPACE*/

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
        finalTime,
        setFinalSleep,
        setFinalTime,
        finalSleep,
        timerFunction,
        timerObj,
        startTimer,
        stopTimer,
        timer,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
