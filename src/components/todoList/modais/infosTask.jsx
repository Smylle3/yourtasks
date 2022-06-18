import { CheckOutlined } from "@ant-design/icons";
import { DatePicker, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/authContext";
import './styles.css'

export default function InfosTask({
    isModalVisible,
    setModalVisible,
    taskObject,
    setTaskObject,
    taskIsDone,
}) {
    const { allTask, allTaskDone } = useAuth();
    const [checked, setChecked] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [localTask, setLocalTask] = useState(null);
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

    const handleEdit = (id) => {
        allTask[id] = localTask;
        setIsEdit(false);
        localStorage.setItem("todo", JSON.stringify(allTask));
    };

    const handleDescription = () => {
        if (simpleDescription.text.length > 0) {
            localTask.description.push(simpleDescription);
            setSimpleDescription({ text: "", checked: false });
        }
    };

    const detailDescription = (id) =>
        isEdit ? (
            <textarea
                className="desc-task on-edit"
                placeholder={allTask[taskObject].description}
                onChange={(e) =>
                    setLocalTask({
                        title: localTask.title,
                        description: e.target.value,
                        date: localTask.date,
                    })
                }
                value={localTask.description}
            />
        ) : (
            <p className="desc-info">{allTask[id].description}</p>
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
                        placeholder="Add novo item"
                        value={simpleDescription.text}
                    />
                    <CheckOutlined
                        onClick={() => handleDescription(taskId)}
                        className="check-icon"
                    />
                </section>
                {allTask[taskId].description.map((content, id) => (
                    <div className="simple-desc-content" key={id}>
                        <p>{id + 1}</p>
                        <input
                            className="list-input"
                            placeholder={content.text}
                            onChange={(e) => (content.text = e.target.value)}
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
                            type="checkbox"
                            id={`content${id}`}
                            checked={content.checked}
                            onChange={(e) => {
                                content.checked = e.target.checked;
                                setChecked(!checked);
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
                    setLocalTask({
                        title: localTask.title,
                        description: localTask.description,
                        date: e,
                    })
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
                                    setLocalTask({
                                        title: e.target.value,
                                        description: localTask.description,
                                        date: localTask.date,
                                    })
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
                            : detailDescription(taskObject)}

                        {dateDescription(taskObject)}

                        {isEdit ? (
                            <button
                                onClick={() => handleEdit(taskObject)}
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
                                                onChange={(e) => {
                                                    content.checked =
                                                        e.target.checked;
                                                    setChecked(!checked);
                                                }}
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
