import { CheckOutlined, DeleteFilled } from "@ant-design/icons";
import { DatePicker, message, Modal } from "antd";
import React, { useState } from "react";
import { useAuth } from "../../../context/authContext";

export default function CreateTask({ isModalVisible, setModalVisible, type }) {
    const { task, setTask, setAllTask } = useAuth();
    const [hasDate, setHasDate] = useState(false);
    const [hasCheckList, setHasCheckList] = useState(false);
    const [change, setChange] = useState(false);
    const [simpleDescription, setSimpleDescription] = useState({
        text: "",
        checked: false,
    });

    const handleCancel = () => {
        setTask({
            title: "",
            description: "",
            checkList: [],
            date: "",
        });
        setSimpleDescription({
            text: "",
            checked: false,
        });
        setModalVisible(false);
        setHasDate(false);
        setHasCheckList(false);
    };

    function handleDescription(key) {
        if (
            simpleDescription.text.length > 0 &&
            (key === "Enter" || key === "NumpadEnter")
        ) {
            task.checkList.push(simpleDescription);
            setSimpleDescription({ text: "", checked: false });
        }
    }

    function handleSend(event, type) {
        event.preventDefault();

        if (type === "detail") {
            if (task.title.length === 0) {
                message.error("Preencha os campos corretamente!");
                return;
            }
            setAllTask((arr) => [...arr, task]);
            setTask({
                title: "",
                description: "",
                checkList: [],
                date: "",
            });
        }
        setModalVisible(false);
    }

    switch (type) {
        case "detail":
            return (
                <Modal
                    visible={isModalVisible}
                    onCancel={handleCancel}
                    footer={null}
                    closable={false}
                    style={{ cursor: "default" }}
                >
                    <div className="modal-form">
                        <input
                            autoFocus
                            className="title-task"
                            placeholder="Título..."
                            onChange={(e) =>
                                setTask((prevState) => ({
                                    ...prevState,
                                    title: e.target.value,
                                }))
                            }
                            value={task.title}
                        />
                        <textarea
                            onChange={(e) =>
                                setTask((prevState) => ({
                                    ...prevState,
                                    description: e.target.value,
                                }))
                            }
                            wrap="on"
                            value={task.description}
                            className="desc-task"
                            placeholder="Descrição..."
                        />
                        <section className="variable-inputs-group">
                            <label
                                className="variable-inputs-picker"
                                onClick={() => {
                                    setTask((prevState) => ({
                                        ...prevState,
                                        checkList: [],
                                    }));
                                    setSimpleDescription({
                                        text: "",
                                        checked: false,
                                    });
                                    setHasCheckList(!hasCheckList);
                                }}
                            >
                                {hasCheckList
                                    ? `Excluir o checklist`
                                    : `Clique para criar um checklist`}
                            </label>
                            {hasCheckList && (
                                <section className="simple-desc-inputs">
                                    <input
                                        onChange={(e) => {
                                            setSimpleDescription({
                                                text: e.target.value,
                                                checked: false,
                                            });
                                        }}
                                        onKeyDown={(e) =>
                                            handleDescription(e.code)
                                        }
                                        placeholder="Ex.: Item 1"
                                        value={simpleDescription.text}
                                    />
                                    <CheckOutlined
                                        onClick={() =>
                                            handleDescription("Enter")
                                        }
                                        className="check-icon"
                                    />
                                </section>
                            )}
                            {task.checkList.length > 0 && (
                                <div className="input-group">
                                    {task.checkList.map((content, id) => (
                                        <div
                                            className="simple-desc-content"
                                            key={id}
                                        >
                                            <p>{id + 1}</p>
                                            <input
                                                className="list-input"
                                                disabled
                                                value={content.text}
                                            />
                                            <DeleteFilled
                                                className="item-editor-button"
                                                onClick={() => {
                                                    task.checkList.splice(
                                                        id,
                                                        1
                                                    );
                                                    setChange(!change);
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}

                            <label
                                className="variable-inputs-picker"
                                onClick={() => setHasDate(!hasDate)}
                            >
                                {hasDate
                                    ? `Não definir data para conclusão`
                                    : `Clique para definir uma data para a conclusão`}
                            </label>
                            {hasDate && (
                                <DatePicker
                                    className="date-pickeC"
                                    format="YYYY-MM-DD"
                                    onChange={(ev, e) =>
                                        setTask((prevState) => ({
                                            ...prevState,
                                            date: e,
                                        }))
                                    }
                                />
                            )}
                        </section>
                        <div className="button-form-modal">
                            <button
                                onClick={(e) => handleCancel()}
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
