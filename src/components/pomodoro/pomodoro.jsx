import {
    CaretRightOutlined,
    CloseOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import { Dropdown, InputNumber, Menu, Popover, Progress } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../../context/authContext";
import "./styles.css";

export default function Pomodoro() {
    const {
        finalTime,
        setFinalSleep,
        setFinalTime,
        finalSleep,
        timerFunction,
        timerObj,
        startTimer,
        stopTimer,
        timer,
    } = useAuth();

    const menu = (
        <div className="set-timers">
            <p>
                Concentrar (min):
                <InputNumber
                    disabled={timer}
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
                    disabled={timer}
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
                {timerObj.min < 10 ? `0${timerObj.min}` : timerObj.min}:
                {timerObj.sec < 10 ? `0${timerObj.sec}` : timerObj.sec}
            </h1>
            <div className="set-config">
                <Popover content={menu} trigger={["click"]} placement="bottom">
                    <SettingOutlined />
                </Popover>
            </div>
            <div className="progress-bar">
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
            </div>
            <section className="button-section">
                {!timer ? (
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
