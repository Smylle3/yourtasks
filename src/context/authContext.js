import React, { useContext, useState, useEffect, createContext } from "react";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { message, notification } from "antd";
import moment from "moment";

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

    const setIsDone = (id) => {
        if (id === -1) return;
        const doneTask = allTask[id];
        allTask[id].date = moment();
        setAllTaskDone((arr) => [...arr, doneTask]);
        allTask.splice(id, 1);
    };

    /*POMODORO SPACE*/
    const [timer, setTimer] = useState(false);
    const [timerObj, setTimerObj] = useState({
        min: 0,
        sec: 0,
        prog: 0,
        cicles: 1,
    });
    const [finalTime, setFinalTime] = useState(25);
    const [finalSleep, setFinalSleep] = useState(5);
    const [timerFunction, setTimerFunction] = useState("work");
    const [taskSelected, setTaskSelected] = useState({ id: -1, task: null });
    const [ciclesNumber, setCiclesNumber] = useState(1);
    let seconds = 0;
    let minutes = 0;
    let progress = 0;

    const openNotificationWithIcon = (userCloser) => {
        const key = `open${Date.now()}`;
        const btn = (
            <div className="notification-buttons">
                <button
                    className="confirm-button-modal my-button"
                    onClick={() => {
                        notification.close(key);
                        setTaskSelected({ id: -1, task: null });
                        setIsDone(taskSelected.id);
                    }}
                >
                    SIM
                </button>
                <button
                    className="cancel-button-modal my-button"
                    onClick={() => {
                        notification.close(key);
                        message.info(
                            "Poxa, mas não desista logo logo você finaliza!"
                        );
                    }}
                >
                    NÃO
                </button>
            </div>
        );
        notification.success(
            userCloser
                ? {
                      message: `Você finalizou a task ${taskSelected.task}?`,
                      btn,
                      key,
                      placement: "top",
                      duration: 0,
                  }
                : {
                      message: "Parabéns! Você finalizou mais um ciclo.",
                      description: `Que ótimo que finalizou os ciclos, você também finalizou a task ${taskSelected.task}?`,
                      btn,
                      key,
                      placement: "top",
                      duration: 0,
                  }
        );
    };

    useEffect(() => {
        if (timerObj.min === finalTime && timerFunction === "work") {
            stopTimer();
            if (ciclesNumber === timerObj.cicles && taskSelected.id !== -1) {
                openNotificationWithIcon();
            } else if (
                ciclesNumber === timerObj.cicles &&
                taskSelected.id === -1
            ) {
                setCiclesNumber(1);
                message.success("Parabéns você finalizou todos os ciclos");
                setTaskSelected({ id: -1, task: null });
            } else {
                setCiclesNumber(1);
                setTimerFunction("sleep");
                setCiclesNumber(ciclesNumber + 1);
                startTimer();
            }
        }
        if (timerObj.min === finalSleep && timerFunction === "sleep") {
            stopTimer();
            setTimerFunction("work");
            startTimer();
        }
    }, [timerObj.min]);

    function startTimer() {
        if (!taskSelected.task)
            message.error("Selecione uma tarefa e verifique os tempos!");
        else setTimer(setInterval(() => showTime(), 1000));
    }
    function stopTimer(userCloser) {
        userCloser && openNotificationWithIcon(userCloser);
        clearInterval(timer);
        setTimer(false);
        setTimerObj((prevState) => ({
            ...prevState,
            min: 0,
            sec: 0,
            prog: 0,
        }));
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
        setIsDone,
        finalTime,
        setFinalSleep,
        setFinalTime,
        finalSleep,
        timerFunction,
        timerObj,
        setTimerObj,
        startTimer,
        stopTimer,
        timer,
        taskSelected,
        setTaskSelected,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
