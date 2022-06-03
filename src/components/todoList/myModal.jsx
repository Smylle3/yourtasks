import React from "react";
import { Modal } from "antd";

export default function MyModal({
    isModalVisible,
    handleOk,
    handleCancel,
    setTask,
    task,
    setAllTask,
    setIsModalVisible,
    create,
}) {
    function handleSend(isOption, event) {
        event.preventDefault();
        if (isOption === "cancel") setIsModalVisible(false);
        else {
            setAllTask((arr) => [...arr, task]);
            setTask({
                title: "",
                description: "",
                date: "",
            });
            setIsModalVisible(false);
        }
    }

    switch (create) {
        case true:
            return (
                <Modal
                    title={task.title.length > 0 ? task.title : "Nova tarefa"}
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <form className="modal-form">
                        <input
                            className="title-task"
                            placeholder="Título..."
                            onChange={(e) =>
                                setTask({
                                    title: e.target.value,
                                    description: task.description,
                                    date: task.date,
                                })
                            }
                            value={task.title}
                        />
                        <textarea
                            onChange={(e) =>
                                setTask({
                                    title: task.title,
                                    description: e.target.value,
                                    date: task.date,
                                })
                            }
                            value={task.description}
                            className="desc-task"
                            placeholder="Descrição..."
                        />
                        <label>Data de conclusão</label>
                        <input
                            onChange={(e) =>
                                setTask({
                                    title: task.title,
                                    description: task.description,
                                    date: e.target.value,
                                })
                            }
                            value={task.date}
                            id="myDate"
                            type="date"
                            className="desc-task date"
                        />
                        <div className="button-form-modal">
                            <button
                                onClick={(e) => handleSend("cancel", e)}
                                className="cancel-button-modal my-button"
                            >
                                CANCELAR
                            </button>
                            <button
                                onClick={(e) => handleSend("confirm", e)}
                                className="confirm-button-modal my-button"
                            >
                                ADICIONAR
                            </button>
                        </div>
                    </form>
                </Modal>
            );
        case false:
            return (
                <Modal
                    title="Deletar tarefa?"
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={null}
                    width={250}
                >
                    <form className="modal-form">
                        <div className="button-form-modal">
                            <button className="confirm-button-modal my-button">
                                CANCELAR
                            </button>
                            <button className="cancel-button-modal my-button">
                                DELETAR
                            </button>
                        </div>
                    </form>
                </Modal>
            );
    }
}
