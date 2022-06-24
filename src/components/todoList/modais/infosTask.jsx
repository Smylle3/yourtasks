import { CheckOutlined, DeleteFilled } from "@ant-design/icons";
import { DatePicker, message, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/authContext";
import "./styles.css";

export default function InfosTask({
    isModalVisible,
    setModalVisible,
    taskObject,
    setTaskObject,
    taskIsDone,
}) {
    const { allTask, allTaskDone } = useAuth();
    const [change, setChange] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [localTask, setLocalTask] = useState();
    const [simpleDescription, setSimpleDescription] = useState({
        text: "",
        checked: false,
    });

    useEffect(() => {
        setLocalTask(allTask[taskObject]);
    }, [taskObject]);

    const handleCancel = () => {
        setIsEdit(false);
        setTaskObject(null);
        setModalVisible(false);
    };

    const handleEditConfirm = (id) => {
        if (localTask.description.length <= 0) {
            message.error("Adicione ao menos um item à lista!");
            return;
        }
        allTask[id] = localTask;
        setIsEdit(false);
        localStorage.setItem("todo", JSON.stringify(allTask));
    };

    const handleDescription = (key) => {
        if (
            simpleDescription.text.length > 0 &&
            (key === "Enter" || key === "NumpadEnter")
        ) {
            localTask.description.push(simpleDescription);
            setSimpleDescription({ text: "", checked: false });
        }
    };

    const editItem = (value, index) => {
        localTask.description[index].text = value;
        setChange(!change);
    };

    const detailDescription = () =>
        isEdit ? (
            <textarea
                className="desc-task on-edit"
                placeholder={localTask.description}
                onChange={(e) =>
                    setLocalTask((prevState) => ({
                        ...prevState,
                        description: e.target.value,
                    }))
                }
                value={localTask.description}
            />
        ) : (
            <textarea disabled className="desc-info">{allTask[taskObject].description}</textarea>
        );

    const listDescription = (taskId) =>
        isEdit ? (
            <>
                <section className="simple-desc-inputs">
                    <input
                        onChange={(e) => {
                            setSimpleDescription({
                                text: e.target.value,
                                checked: false,
                            });
                        }}
                        onKeyDown={(e) => handleDescription(e.code)}
                        placeholder="Add novo item"
                        value={simpleDescription.text}
                    />
                    <CheckOutlined
                        onClick={() => handleDescription("Enter")}
                        className="check-icon"
                    />
                </section>
                {localTask.description.map((content, id) => (
                    <div className="simple-desc-content" key={id}>
                        <p>{id + 1}</p>
                        <input
                            autoFocus={id === 0 ? true : false}
                            className="list-input"
                            placeholder={content.text}
                            onChange={(e) => editItem(e.target.value, id)}
                            value={localTask.description[id].text}
                        />
                        <DeleteFilled
                            className="item-editor-button"
                            onClick={() => {
                                localTask.description.splice(id, 1);
                                setChange(!change);
                            }}
                        />
                    </div>
                ))}
            </>
        ) : (
            <>
                {allTask[taskId].description.map((content, id) => (
                    <div className="simple-desc-content" key={id}>
                        <p>{id + 1}</p>
                        <input
                            className="input-checkbox"
                            type="checkbox"
                            id={`content${id}`}
                            checked={content.checked}
                            onChange={(e) => {
                                content.checked = e.target.checked;
                                localStorage.setItem(
                                    "todo",
                                    JSON.stringify(allTask)
                                );
                                setChange(!change);
                            }}
                        />
                        <label
                            className="simple-label"
                            htmlFor={`content${id}`}
                        >
                            {content.text}
                        </label>
                    </div>
                ))}
            </>
        );

    const dateDescription = (id) =>
        isEdit && allTask[id].date ? (
            <DatePicker
                className="date-pickeC"
                format="YYYY-MM-DD"
                onChange={(ev, e) =>
                    setLocalTask((prevState) => ({
                        ...prevState,
                        date: e,
                    }))
                }
            />
        ) : (
            <>
                {!allTask[id].date || allTask[id].date.length === 0 ? null : (
                    <div className="date-info">
                        <p>Data para conclusão</p>
                        <p>{allTask[id].date}</p>
                    </div>
                )}
            </>
        );

    if (taskObject !== null) {
        if (!taskIsDone) {
            return (
                <Modal
                    visible={isModalVisible}
                    onCancel={handleCancel}
                    footer={null}
                    width={300}
                    closable={false}
                    style={{ cursor: "default" }}
                >
                    <div className="info-modal">
                        {isEdit ? (
                            <input
                                className="title-task on-edit"
                                placeholder={allTask[taskObject].title}
                                onChange={(e) =>
                                    setLocalTask((prevState) => ({
                                        ...prevState,
                                        title: e.target.value,
                                    }))
                                }
                                value={localTask.title}
                            />
                        ) : (
                            <h1 className="title-info">
                                {allTask[taskObject].title}
                            </h1>
                        )}

                        {allTask[taskObject].simple
                            ? listDescription(taskObject)
                            : detailDescription()}

                        {dateDescription(taskObject)}

                        {isEdit ? (
                            <button
                                onClick={() => handleEditConfirm(taskObject)}
                                className="confirm-button-modal my-button"
                            >
                                CONFIRMAR
                            </button>
                        ) : (
                            <button
                                onClick={() => setIsEdit(true)}
                                className="alert-button-modal my-button"
                            >
                                EDITAR
                            </button>
                        )}
                        <button
                            onClick={(e) => handleCancel()}
                            className="cancel-button-modal my-button"
                        >
                            FECHAR
                        </button>
                    </div>
                </Modal>
            );
        }

        if (taskIsDone) {
            return (
                <Modal
                    visible={isModalVisible}
                    onCancel={handleCancel}
                    footer={null}
                    width={300}
                    closable={false}
                    style={{ cursor: "default" }}
                >
                    <div className="info-modal">
                        <h1 className="title-info">
                            {allTaskDone[taskObject].title}
                        </h1>
                        {allTaskDone[taskObject].simple ? (
                            <>
                                {allTaskDone[taskObject].description.map(
                                    (content, id) => (
                                        <div
                                            className="simple-desc-content"
                                            key={id}
                                        >
                                            <p>{id + 1}</p>
                                            <input
                                                type="checkbox"
                                                disabled
                                                id={`content${id}`}
                                                checked={content.checked}
                                            />
                                            <label htmlFor={`content${id}`}>
                                                {content.text}
                                            </label>
                                        </div>
                                    )
                                )}
                            </>
                        ) : (
                            <textarea disabled className="desc-info">
                                {allTaskDone[taskObject].description}
                            </textarea>
                        )}
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                setModalVisible(false);
                                setTaskObject(null);
                            }}
                            className="cancel-button-modal my-button"
                        >
                            FECHAR
                        </button>
                    </div>
                </Modal>
            );
        }
    }
}
