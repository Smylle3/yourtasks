import {
    CaretDownOutlined,
    CaretRightOutlined,
    CaretUpOutlined,
    CloseOutlined,
    EditOutlined,
    QuestionCircleOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import { Divider, InputNumber, Popover, Progress, Tooltip } from "antd";
import React, { useState } from "react";
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
        setTimerObj,
        startTimer,
        stopTimer,
        timer,
        allTask,
        taskSelected,
        setTaskSelected,
    } = useAuth();

    const [visiblePopover, setVisiblePopover] = useState(false);

    const clicleText = (
        <span className="cicle-text">
            Um ciclo é o tempo de uma Concentração mais um Descanso. Atualmente
            um ciclo equivale à {finalTime + finalSleep} minutos e, o total de{" "}
            {timerObj.cicles} ciclo(s) equivale à{" "}
            {(finalTime + finalSleep) * timerObj.cicles} minutos.
        </span>
    );

    const taskList = (
        <div className="task-list">
            <h3
                onClick={() => {
                    setVisiblePopover(!visiblePopover);
                    setTaskSelected({ id: -1, task: "Apenas concentração" });
                }}
            >
                Apenas concentração
            </h3>
            <Divider>Suas tasks</Divider>
            {allTask.map((task, id) => (
                <section
                    className=""
                    key={id}
                    onClick={() => {
                        setVisiblePopover(!visiblePopover);
                        setTaskSelected({ id: id, task: task.title });
                    }}
                >
                    <h3>
                        {id + 1} - {task.title}
                    </h3>
                </section>
            ))}
        </div>
    );

    const menu = (
        <div className="set-timers">
            <span>
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
            </span>
            <span>
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
            </span>
            <span>
                Número de ciclos{" "}
                <Tooltip placement="top" title={clicleText}>
                    <QuestionCircleOutlined />
                </Tooltip>
                :
                <InputNumber
                    disabled={timer}
                    min={1}
                    max={60}
                    bordered={false}
                    defaultValue={timerObj.cicles}
                    onChange={(e) =>
                        setTimerObj((prevState) => ({
                            ...prevState,
                            cicles: e,
                        }))
                    }
                    controls={false}
                    size="small"
                />
            </span>
        </div>
    );

    return (
        <div className="pomo-page">
            <div
                className={`type-time ${
                    timerFunction === "work" ? "work" : "sleep"
                }`}
            >
                <Popover
                    content={taskList}
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
                </Popover>
            </div>
            <h1>
                {timerObj.min < 10 ? `0${timerObj.min}` : timerObj.min}:
                {timerObj.sec < 10 ? `0${timerObj.sec}` : timerObj.sec}
            </h1>
            <div className="set-config">
                <Popover content={menu} trigger={["click"]} placement="bottom">
                    {timerFunction === "work" ? (
                        <span>
                            {finalTime} min <EditOutlined />
                        </span>
                    ) : (
                        <span>
                            {finalSleep} min <EditOutlined />
                        </span>
                    )}
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
