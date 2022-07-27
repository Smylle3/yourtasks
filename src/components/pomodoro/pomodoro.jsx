import {
    CaretRightOutlined,
    CloseOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import { Dropdown, InputNumber, Menu, Popover, Progress } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import "./styles.css";

export default function Pomodoro() {
    const [timer, setTimer] = useState(false);
    const [isStart, setIsStart] = useState(false);
    const [min, setMin] = useState(0);
    const [sec, setSec] = useState(0);
    const [prog, setProg] = useState(0);
    const [finalTime, setFinalTime] = useState(25);
    const [finalSleep, setFinalSleep] = useState(5);
    const [timerFunction, setTimerFunction] = useState("work");

    let seconds = 0;
    let minutes = 0;
    let progress = 0;

    useEffect(() => {
        if (min === finalTime && timerFunction === "work") {
            stopTimer();
            setTimerFunction("sleep");
            startTimer();
        }
        if (min === finalSleep && timerFunction === "sleep") {
            stopTimer();
            setTimerFunction("work");
            startTimer();
        }
    }, [min]);

    function startTimer() {
        setIsStart(true);
        setTimer(setInterval(() => showTime(), 1000));
    }
    function stopTimer() {
        clearInterval(timer);
        setMin(0);
        setSec(0);
        setProg(0);
        setIsStart(false);
        setTimerFunction("work");
    }

    function showTime() {
        seconds++;
        progress++;
        setProg(progress);
        setSec(seconds);
        if (seconds > 59) {
            seconds = 0;
            minutes++;
            setSec(seconds);
            setMin(minutes);
        }
    }

    const menu = (
        <div className="set-timers">
            <p>
                Concentrar (min):
                <InputNumber
                    disabled={isStart}
                    min={1}
                    max={60}
                    bordered={false}
                    defaultValue={finalTime}
                    onChange={(e) => setFinalTime(e)}
                    autoFocus
                    controls={false}
                    size="small"
                />
            </p>
            <p>
                Descansar (min):
                <InputNumber
                    disabled={isStart}
                    min={1}
                    max={60}
                    bordered={false}
                    defaultValue={finalSleep}
                    onChange={(e) => setFinalSleep(e)}
                    controls={false}
                    size="small"
                />
            </p>
        </div>
    );

    return (
        <div className="pomo-page">
            <text
                className={`type-time ${
                    timerFunction === "work" ? "work" : "sleep"
                }`}
            >
                {timerFunction === "work"
                    ? `Tempo para concentrar: ${finalTime} min`
                    : `Tempo para descansar: ${finalSleep} min`}
            </text>
            <h1>
                {min < 10 ? `0${min}` : min}:{sec < 10 ? `0${sec}` : sec}
            </h1>
            <div className="set-config">
                <Popover content={menu} trigger={["click"]} placement="bottom">
                    <SettingOutlined />
                </Popover>
            </div>
            <div className="progress-bar">
                <Progress
                    percent={Math.trunc(
                        (prog * 100) /
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
            </div>
            <section className="button-section">
                {!isStart ? (
                    <button
                        className="confirm-button-modal my-button"
                        onClick={() => startTimer()}
                    >
                        START
                        <CaretRightOutlined />
                    </button>
                ) : (
                    <button
                        className="cancel-button-modal my-button"
                        onClick={() => stopTimer()}
                    >
                        STOP
                        <CloseOutlined />
                    </button>
                )}
            </section>
        </div>
    );
}
