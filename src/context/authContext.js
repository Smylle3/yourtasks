/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect, createContext } from "react";
import { auth, db } from "../config/firebase";
import {
    doc,
    updateDoc,
    getDoc,
    setDoc,
    onSnapshot,
    deleteDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { message, notification } from "antd";
import moment from "moment";
import Cookies from "js-cookie";
import TypeStorage from "../components/notifications/typeStorage/typeStorage";

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
        if (Cookies.get("typeStorage") === "local") {
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
        }
    }, []);
    useEffect(() => {
        if (
            user &&
            user.uid !== undefined &&
            Cookies.get("typeStorage") === "cloud"
        )
            updateDBTasks();
        else {
            localStorage.setItem("todo", JSON.stringify(allTask));
            localStorage.setItem("done", JSON.stringify(allTaskDone));
        }
    }, [allTask.length, allTaskDone.length]);

    /*FIREBASE SPACE*/
    const getDBTasks = async (user) => {
        const docRef = doc(db, `usersTasks/${user.uid}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setAllTask(docSnap.data().allTasks);
            setAllTaskDone(docSnap.data().allTasksDone);
        } else {
            await setDoc(docRef, {
                allTasks: allTask,
                allTasksDone: allTaskDone,
            });
        }
    };

    const updateDBTasks = async () => {
        const userDbCredentials = doc(db, `usersTasks/${user.uid}`);
        await updateDoc(userDbCredentials, {
            allTasks: allTask,
            allTasksDone: allTaskDone,
        });
    };

    const realTimeUpdate = async () => {
        const docRef = doc(db, `usersTasks/${user.uid}`);
        onSnapshot(docRef, (doc) => {
            setAllTask(doc.data().allTasks);
            setAllTaskDone(doc.data().allTasksDone);
        });
    };

    const turnCloudToLocal = async () => {
        localStorage.setItem("todo", JSON.stringify(allTask));
        localStorage.setItem("done", JSON.stringify(allTaskDone));
        const docRef = doc(db, `usersTasks/${user.uid}`);
        await deleteDoc(docRef);
    };

    const turnLocalToCloud = async () => {
        const docRef = doc(db, `usersTasks/${user.uid}`);
        await setDoc(docRef, {
            allTasks: allTask,
            allTasksDone: allTaskDone,
        });
        localStorage.clear();
    };
    /*FIREBASE SPACE*/

    useEffect(() => {
        setCurrentPage(window.location.pathname);
        auth.onAuthStateChanged((user) => {
            user && Cookies.get("typeStorage") === "cloud" && getDBTasks(user);
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
        if (user && !Cookies.get("typeStorage")) TypeStorage();
        if (user && user.uid && Cookies.get("typeStorage") === "cloud")
            realTimeUpdate();
    }, [user, navigate]);

    const setIsDone = (id) => {
        if (id === -1) return;
        const doneTask = allTask[id];
        doneTask.date = moment()._d;
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
        updateDBTasks,
        turnCloudToLocal,
        turnLocalToCloud,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
