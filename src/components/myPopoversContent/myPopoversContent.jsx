import {
    LogoutOutlined,
    QuestionCircleOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import { Divider, InputNumber, Tooltip } from "antd";
import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../../config/firebase";

function handleLogout() {
    signOut(auth);
}

const clicleText = (finalTime, timerObj, finalSleep) => (
    <span className="cicle-text">
        Um ciclo é o tempo de uma Concentração. Atualmente um ciclo equivale à{" "}
        {finalTime} minutos e, o total de {timerObj.cicles} ciclo(s) equivale à{" "}
        {finalTime * timerObj.cicles + (timerObj.cicles - 1) * finalSleep}{" "}
        minutos.
    </span>
);

const userOptionsContent = (
    TypeStorage,
    setVisible,
    turnCloudToLocal,
    turnLocalToCloud,
    isMobile
) => (
    <section className="settings-user-menu">
        <button
            className="logout-button"
            onClick={() => {
                TypeStorage(turnCloudToLocal, turnLocalToCloud, isMobile);
                setVisible(false);
            }}
        >
            <SettingOutlined className="icon-logout" /> Storage
        </button>
        <button
            className="logout-button"
            onClick={() => {
                setVisible(false);
                handleLogout();
            }}
        >
            <LogoutOutlined className="icon-logout" /> LogOut
        </button>
    </section>
);

const pomodoroTaskListContent = (
    visiblePopover,
    setVisiblePopover,
    setTaskSelected,
    allTask
) => (
    <section className="task-list">
        <h3
            onClick={() => {
                setVisiblePopover(!visiblePopover);
                setTaskSelected({ id: -2, task: "Apenas concentração" });
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
    </section>
);

const pomodoroSetTimerContent = (
    timer,
    finalTime,
    setFinalTime,
    finalSleep,
    setFinalSleep,
    timerObj,
    setTimerObj
) => (
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
            <Tooltip
                placement="top"
                title={clicleText(finalTime, timerObj, finalSleep)}
            >
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

export { userOptionsContent, pomodoroTaskListContent, pomodoroSetTimerContent };
