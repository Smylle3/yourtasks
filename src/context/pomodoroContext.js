/* eslint-disable react-hooks/exhaustive-deps */
import { message } from "antd";
import React, { useContext, useState, useEffect, createContext } from "react";
import DoneTimer from "../components/notifications/doneTimer/doneTimer";
import { useAuth } from "./authContext";

const PomodoroContext = createContext({});

export const usePomodoro = () => useContext(PomodoroContext);

export const PomodoroProvider = ({ children }) => {
    const { setIsDone } = useAuth();
    const [timer, setTimer] = useState(false);
    const [finalTime, setFinalTime] = useState(25);
    const [finalSleep, setFinalSleep] = useState(5);
    const [timerFunction, setTimerFunction] = useState("work");
    const [taskSelected, setTaskSelected] = useState({ id: -1, task: null });
    const [ciclesNumber, setCiclesNumber] = useState(1);
    const [timerObj, setTimerObj] = useState({
        min: 0,
        sec: 0,
        prog: 0,
        cicles: 1,
    });
    let seconds = 0;
    let minutes = 0;
    let progress = 0;

    useEffect(() => {
        if (timerObj.min === finalTime && timerFunction === "work") {
            stopTimer();
            if (ciclesNumber === timerObj.cicles && taskSelected.id !== -1) {
                DoneTimer(setIsDone, taskSelected, setTaskSelected, false);
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
        userCloser &&
            DoneTimer(setIsDone, taskSelected, setTaskSelected, userCloser);
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

    const value = {
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
        <PomodoroContext.Provider value={value}>
            {children}
        </PomodoroContext.Provider>
    );
};
