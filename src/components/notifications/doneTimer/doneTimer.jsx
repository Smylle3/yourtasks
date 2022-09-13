import { message, notification } from "antd";
import React from "react";

export default function DoneTimer(
    setIsDone,
    taskSelected,
    setTaskSelected,
    userCloser
) {
    const key = `open${Date.now()}`;
    const btn = (
        <div className="notification-buttons">
            <button
                className="confirm-button-modal my-button"
                onClick={() => {
                    notification.close(key);
                    taskSelected.id !== -2 && setIsDone(taskSelected.id);
                    setTaskSelected({ id: -1, task: null });
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
}
