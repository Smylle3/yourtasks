import React, { useEffect, useState } from "react";
import { DatePicker, message, Modal } from "antd";
import moment from "moment";
import "./styles.css";

export default function MyModal({
    isModalVisible,
    handleOk,
    handleCancel,
    setIsModalVisible,
    task,
    setTask,
    simpleList,
    setSimpleList,
    allTask,
    setAllTask,
    allTaskDone,
    typeModal,
    taskObject,
    checked,
    setChecked,
}) {
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        setSimpleList({
            title: "",
            description: [],
            simple: true,
        });
    }, [isModalVisible]);

    function handleSend(isOption, event, type) {
        event.preventDefault();
        if (isOption === "cancel") {
            setIsModalVisible(false);
            setEdit(false);
        } else if (isOption === "edit") {
            setEdit(true);
        } else {
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
                if (simpleList.title.length === 0) {
                    message.error("Adicione ao menos um título!");
                    return;
                }
                setAllTask((arr) => [...arr, simpleList]);
                setSimpleList({
                    title: "",
                    description: "",
                });
            }
            setIsModalVisible(false);
        }
    }

    if (typeModal === "info" && allTask[taskObject]) {
        return (
            <Modal
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                width={300}
                closable={false}
                style={{ cursor: "default" }}
            >
                <div className="info-modal">
                    {edit ? (
                        <input
                            className="title-task edit-task"
                            placeholder={allTask[taskObject].title}
                            onChange={(e) =>
                                (allTask[taskObject].title = e.target.value)
                            }
                        />
                    ) : (
                        <h1 className="title-info">
                            {allTask[taskObject].title}
                        </h1>
                    )}
                    {allTask[taskObject].description.length === 0 ? null : (
                        <>
                            {allTask[taskObject].simple ? (
                                <>
                                    {allTask[taskObject].description.map(
                                        (content, id) => (
                                            <div
                                                className="simple-desc-content"
                                                key={id}
                                            >
                                                {edit ? (
                                                    <input
                                                        onChange={(e) =>
                                                            (content.text =
                                                                e.target.value)
                                                        }
                                                        className="simple-input-edit"
                                                        placeholder={
                                                            content.text
                                                        }
                                                    />
                                                ) : (
                                                    <>
                                                        <input
                                                            type="checkbox"
                                                            id={`content${id}`}
                                                            checked={
                                                                content.checked
                                                            }
                                                            onChange={(e) => {
                                                                content.checked =
                                                                    e.target.checked;
                                                                setChecked(
                                                                    !checked
                                                                );
                                                            }}
                                                        />
                                                        <label
                                                            htmlFor={`content${id}`}
                                                        >
                                                            {content.text}
                                                        </label>
                                                    </>
                                                )}
                                            </div>
                                        )
                                    )}
                                </>
                            ) : (
                                <>
                                    {edit ? (
                                        <textarea
                                            onChange={(e) =>
                                                (allTask[
                                                    taskObject
                                                ].description = e.target.value)
                                            }
                                            className="desc-task edit-task"
                                            placeholder={
                                                allTask[taskObject].description
                                            }
                                        />
                                    ) : (
                                        <p className="desc-info">
                                            {allTask[taskObject].description}
                                        </p>
                                    )}
                                </>
                            )}
                        </>
                    )}
                    {!allTask[taskObject].date ||
                    allTask[taskObject].date.length === 0 ? null : (
                        <>
                            {edit ? (
                                <>
                                    <DatePicker
                                        className="date-pickeC"
                                        format="YYYY-MM-DD"
                                        onChange={(ev, e) =>
                                            (allTask[taskObject].date = e)
                                        }
                                    />
                                </>
                            ) : (
                                <div className="date-info">
                                    <p>Data para conclusão</p>
                                    <p>{allTask[taskObject].date}</p>
                                </div>
                            )}
                        </>
                    )}
                    {edit ? (
                        <button
                            onClick={(e) => setEdit(false)}
                            className="confirm-button-modal my-button"
                        >
                            CONFIRMAR
                        </button>
                    ) : (
                        <button
                            onClick={(e) => handleSend("edit", e)}
                            className="alert-button-modal my-button"
                        >
                            EDITAR
                        </button>
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
    } else if (typeModal === "infoDone" && allTaskDone[taskObject]) {
        return (
            <Modal
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                width={300}
                style={{ cursor: "default" }}
            >
                <div className="info-modal">
                    <h1 className="title-info">
                        {allTaskDone[taskObject].title}
                    </h1>
                    {allTaskDone[taskObject].description.length === 0 ? null : (
                        <>
                            {allTaskDone[taskObject].simple ? (
                                <>
                                    {allTaskDone[taskObject].description.map(
                                        (content, id) => (
                                            <div
                                                className="simple-desc-content"
                                                key={id}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={content.checked}
                                                    disabled
                                                    id={`content${id}`}
                                                />
                                                <label htmlFor={`content${id}`}>
                                                    {content.text}
                                                </label>
                                            </div>
                                        )
                                    )}
                                </>
                            ) : (
                                <p className="desc-info">
                                    {allTaskDone[taskObject].description}
                                </p>
                            )}
                        </>
                    )}
                    <div className="date-info">
                        <p>Data de conclusão:</p>
                        <p>
                            {moment(allTaskDone[taskObject].date).format(
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
