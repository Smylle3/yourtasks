import React from "react";
import { DatePicker, message, Modal } from "antd";

export default function MyModal({
    isModalVisible,
    handleOk,
    handleCancel,
    setIsModalVisible,
    task,
    setTask,
    allTask,
    setAllTask,
    allTaskDone,
    typeModal,
    deleteId,
}) {
    function handleSend(isOption, event) {
        event.preventDefault();
        if (isOption === "cancel") setIsModalVisible(false);
        else {
            if (
                task.title.length === 0 ||
                task.description.length === 0 ||
                task.date.length === 0
            ) {
                message.error("Preencha todos os campos corretamente!");
                return;
            }
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

    if (typeModal === "create") {
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
                    <label>Data e hora prevista para conclusão:</label>
                    <DatePicker
                        format="YYYY-MM-DD HH:mm:ss"
                        onChange={(ev, e) =>
                            setTask({
                                title: task.title,
                                description: task.description,
                                date: e,
                            })
                        }
                        showTime
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
    } else if (typeModal === "info") {
        return (
            <Modal
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                width={300}
            >
                <div className="info-modal">
                    <h1 className="title-info">{allTask[deleteId].title}</h1>
                    <p className="desc-info">{allTask[deleteId].description}</p>
                    <div className="date-info">
                        <p>Data para conclusão</p>
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
    } else if (typeModal === "infoDone") {
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
                        {allTaskDone[deleteId].title}
                    </h1>
                    <p className="desc-info">
                        {allTaskDone[deleteId].description}
                    </p>
                    <div className="date-info">
                        <p>Data de criação:</p>
                        <p>{allTaskDone[deleteId].date}</p>
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
    } else if (typeModal === "delete") {
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
    }
}
