import React from "react";
import { Modal } from "antd";

export default function MyModal({
    isModalVisible,
    handleOk,
    handleCancel,
    setIsModalVisible,
    task,
    setTask,
    allTask,
    setAllTask,
    typeModal,
    deleteId,
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

    const handleDelete = (event) => {
        event.preventDefault();
        allTask.splice(deleteId, 1);
        setIsModalVisible(false);
    };

    switch (typeModal) {
        case "create":
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
        case "info":
            return (
                <Modal
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={null}
                    width={300}
                >
                    <div className="info-modal">
                        <h1 className="title-info">
                            {allTask[deleteId].title}
                        </h1>
                        <p className="desc-info">
                            {allTask[deleteId].description}
                        </p>
                        <div className="date-info">
                            <p>Data de conclusão:</p>
                            <p>{allTask[deleteId].date}</p>
                        </div>
                        <button
                            onClick={(e) => handleSend("cancel", e)}
                            className="cancel-button-modal my-button"
                        >
                            FECHAR
                        </button>
                    </div>
                </Modal>
            );
        case "delete":
            return (
                <Modal
                    title={
                        allTask.length > 0
                            ? `Deletar ${allTask[deleteId].title}`
                            : `Deletar`
                    }
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={null}
                    width={250}
                >
                    <div className="buttons-delete-task">
                        <button
                            onClick={(e) => handleDelete(e)}
                            className="cancel-button-modal my-button"
                        >
                            DELETAR
                        </button>
                        <button
                            onClick={() => setIsModalVisible(false)}
                            className="confirm-button-modal my-button"
                        >
                            CANCELAR
                        </button>
                    </div>
                </Modal>
            );
        default:
            break;
    }
}
