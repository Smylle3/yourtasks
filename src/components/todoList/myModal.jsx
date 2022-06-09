import React, { useState } from "react";
import { DatePicker, message, Modal } from "antd";
import moment from "moment";

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
    const [hasDate, setHasDate] = useState(false);

    function handleSend(isOption, event) {
        event.preventDefault();
        if (isOption === "cancel") setIsModalVisible(false);
        else {
            if (task.title.length === 0) {
                message.error("Adicione ao menos um título!");
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
                    <div className="date-group">
                        <label
                            className="date-picker"
                            onClick={() => setHasDate(!hasDate)}
                        >
                            {hasDate
                                ? `Não definir data para conclusão`
                                : `Definir uma data para a conclusão`}
                        </label>
                        {hasDate ? (
                            <DatePicker
                                className="date-pickeC"
                                format="YYYY-MM-DD"
                                onChange={(ev, e) =>
                                    setTask({
                                        title: task.title,
                                        description: task.description,
                                        date: e,
                                    })
                                }
                            />
                        ) : null}
                    </div>
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
    } else if (typeModal === "info" && allTask[deleteId]) {
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
                    {allTask[deleteId].description.length === 0 ? null : (
                        <p className="desc-info">
                            {allTask[deleteId].description}
                        </p>
                    )}
                    {allTask[deleteId].date.length === 0 ? null : (
                        <div className="date-info">
                            <p>Data para conclusão</p>
                            <p>{allTask[deleteId].date}</p>
                        </div>
                    )}
                    <button
                        onClick={(e) => handleSend("cancel", e)}
                        className="cancel-button-modal my-button"
                    >
                        FECHAR
                    </button>
                </div>
            </Modal>
        );
    } else if (typeModal === "infoDone" && allTaskDone[deleteId]) {
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
                    {allTaskDone[deleteId].description.length === 0 ? null : (
                        <p className="desc-info">
                            {allTaskDone[deleteId].description}
                        </p>
                    )}
                    <div className="date-info">
                        <p>Data de conclusão:</p>
                        <p>
                            {moment(allTaskDone[deleteId].date).format(
                                "DD  MMMM YYYY, h:mm a"
                            )}
                        </p>
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
    }
}
