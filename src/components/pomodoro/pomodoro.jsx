import {
    CaretDownOutlined,
    CaretRightOutlined,
    CaretUpOutlined,
    CloseOutlined,
    EditOutlined,
} from "@ant-design/icons";
import { Popover, Progress } from "antd";
import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import { usePomodoro } from "../../context/pomodoroContext";
import {
    pomodoroSetTimerContent,
    pomodoroTaskListContent,
} from "../myPopoversContent/myPopoversContent";
import "./styles.css";

export default function Pomodoro() {
    const { allTask } = useAuth();
    const {
        finalTime,
        finalSleep,
        timerFunction,
        timerObj,
        startTimer,
        stopTimer,
        timer,
        taskSelected,
        setTaskSelected,
        setFinalTime,
        setFinalSleep,
        setTimerObj,
    } = usePomodoro();

    const [visiblePopover, setVisiblePopover] = useState(false);

    return (
        <div className="pomo-page">
            <section
                className={`type-time ${
                    timerFunction === "work" ? "work" : "sleep"
                }`}
            >
                <Popover
                    content={pomodoroTaskListContent(
                        visiblePopover,
                        setVisiblePopover,
                        setTaskSelected,
                        allTask
                    )}
                    trigger={["click"]}
                    placement="bottom"
                    className="popover-style"
                    onVisibleChange={() => setVisiblePopover(!visiblePopover)}
                    visible={visiblePopover}
                >
                    {taskSelected.task
                        ? `${taskSelected.task}`
                        : "Selecione uma tarefa!"}
                    {visiblePopover ? (
                        <CaretUpOutlined />
                    ) : (
                        <CaretDownOutlined />
                    )}
                    {taskSelected.id !== -1 && (
                        <CloseOutlined
                            onClick={() => {
                                setTaskSelected({ id: -1, task: null });
                            }}
                        />
                    )}
                </Popover>
            </section>
            <h1>
                {timerObj.min < 10 ? `0${timerObj.min}` : timerObj.min}:
                {timerObj.sec < 10 ? `0${timerObj.sec}` : timerObj.sec}
            </h1>
            <section className="set-config">
                <Popover
                    content={pomodoroSetTimerContent(
                        timer,
                        finalTime,
                        setFinalTime,
                        finalSleep,
                        setFinalSleep,
                        timerObj,
                        setTimerObj
                    )}
                    trigger={["click"]}
                    placement="bottom"
                >
                    {timerFunction === "work" ? (
                        <span>
                            Concentração: {finalTime} min <EditOutlined />
                        </span>
                    ) : (
                        <span>
                            Descanso: {finalSleep} min <EditOutlined />
                        </span>
                    )}
                </Popover>
            </section>
            <section className="progress-bar">
                <Progress
                    percent={Math.trunc(
                        (timerObj.prog * 100) /
                            (timerFunction === "work"
                                ? finalTime * 60
                                : finalSleep * 60)
                    )}
                    strokeColor={
                        timerFunction === "work"
                            ? {
                                  "0%": "#87d068",
                                  "100%": "#108ee9",
                              }
                            : {
                                  "0%": "#108ee9",
                                  "100%": "#87d068",
                              }
                    }
                    strokeWidth={50}
                />
            </section>
            <section className="button-section">
                {!timer ? (
                    <button
                        className="start-timer-button loading-button"
                        onClick={() => startTimer()}
                    >
                        START
                        <CaretRightOutlined />
                    </button>
                ) : (
                    <button
                        className="cancel-button-modal my-button"
                        onClick={() => stopTimer(true)}
                    >
                        STOP
                        <CloseOutlined />
                    </button>
                )}
            </section>
        </div>
    );
}
