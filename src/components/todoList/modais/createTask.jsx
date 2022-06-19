import { CheckOutlined } from "@ant-design/icons";
import { DatePicker, message, Modal } from "antd";
import React, { useState } from "react";
import { useAuth } from "../../../context/authContext";

export default function CreateTask({ isModalVisible, setModalVisible, type }) {
    const { task, setTask, setAllTask, simpleList, setSimpleList } = useAuth();
    const [hasDate, setHasDate] = useState(false);
    const [simpleDescription, setSimpleDescription] = useState({
        text: "",
        checked: false,
    });

    const handleCancel = () => {
        setModalVisible(false);
    };

    function handleDescription(key) {
        if (
            simpleDescription.text.length > 0 &&
            (key === "Enter" || key === "NumpadEnter")
        ) {
            simpleList.description.push(simpleDescription);
            setSimpleDescription({ text: "", checked: false });
        }
    }

    function handleSend(event, type) {
        event.preventDefault();

        if (type === "detail") {
            if (task.title.length === 0 || task.description.length === 0) {
                message.error("Preencha os campos corretamente!");
                return;
            }
            setAllTask((arr) => [...arr, task]);
            setTask({
                title: "",
                description: "",
                date: "",
            });
        } else if (type === "simple") {
            if (
                simpleList.title.length === 0 ||
                simpleList.description.length === 0
            ) {
                message.error("Preencha os campos corretamente!");
                return;
            }
            setAllTask((arr) => [...arr, simpleList]);
            setSimpleList({
                title: "",
                description: "",
            });
        }
        setModalVisible(false);
    }

    switch (type) {
        case "detail":
            return (
                <Modal
                    title="Nova tarefa"
                    visible={isModalVisible}
                    onCancel={handleCancel}
                    footer={null}
                    closable={false}
                    style={{ cursor: "default" }}
                >
                    <form className="modal-form">
                        <input
                            autoFocus
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
                            wrap="on"
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
                                    : `Clique para definir uma data para a conclusão`}
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
                                onClick={(e) => {
                                    e.preventDefault();
                                    setModalVisible(false);
                                }}
                                className="cancel-button-modal my-button"
                            >
                                CANCELAR
                            </button>
                            <button
                                onClick={(e) => handleSend(e, type)}
                                className="confirm-button-modal my-button"
                            >
                                ADICIONAR
                            </button>
                        </div>
                    </form>
                </Modal>
            );
        case "simple":
            return (
                <Modal
                    title="Lista simples"
                    visible={isModalVisible}
                    onCancel={handleCancel}
                    footer={null}
                    width={350}
                    closable={false}
                    style={{ cursor: "default" }}
                >
                    <div className="modal-form">
                        <input
                            autoFocus
                            className="title-task"
                            placeholder="Ex.: Lista de compras"
                            onChange={(e) =>
                                setSimpleList({
                                    title: e.target.value,
                                    description: simpleList.description,
                                    simple: true,
                                })
                            }
                            value={simpleList.title}
                        />
                        <section className="simple-desc-inputs">
                            <input
                                onChange={(e) => {
                                    setSimpleDescription({
                                        text: e.target.value,
                                        checked: false,
                                    });
                                }}
                                onKeyDown={(e) => handleDescription(e.code)}
                                placeholder="Ex.: Arroz"
                                value={simpleDescription.text}
                            />
                            <CheckOutlined
                                onClick={() => handleDescription("Enter")}
                                className="check-icon"
                            />
                        </section>
                        {simpleList.description.length > 0 ? (
                            <div className="input-group">
                                {simpleList.description.map((content, id) => (
                                    <div
                                        className="simple-desc-content"
                                        key={id}
                                    >
                                        <p>{id + 1}</p>
                                        <p>{content.text}</p>
                                    </div>
                                ))}
                            </div>
                        ) : null}
                        <div className="button-form-modal">
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    setModalVisible(false);
                                }}
                                className="cancel-button-modal my-button"
                            >
                                CANCELAR
                            </button>
                            <button
                                onClick={(e) => handleSend(e, type)}
                                className="confirm-button-modal my-button"
                            >
                                ADICIONAR
                            </button>
                        </div>
                    </div>
                </Modal>
            );
        default:
            break;
    }
}
