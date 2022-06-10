import React, { useEffect, useState } from "react";
import { DatePicker, message, Modal } from "antd";
import moment from "moment";
import { CheckOutlined } from "@ant-design/icons";

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
    deleteId,
    checked,
    setChecked,
}) {
    const [hasDate, setHasDate] = useState(false);
    const [edit, setEdit] = useState(false);
    
    const [simpleDescription, setSimpleDescription] = useState({
        text: "",
        checked: false,
    });

    useEffect(() => {
        setSimpleList({
            title: "",
            description: [],
            simple: true,
        });
    }, [isModalVisible]);

    function handleDescription() {
        if (simpleDescription.text.length > 0) {
            simpleList.description.push(simpleDescription);
            setSimpleDescription({ text: "", checked: false });
        }
    }

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

    if (typeModal === "create") {
        if (deleteId === "detail") {
            return (
                <Modal
                    title={task.title.length > 0 ? task.title : "Nova tarefa"}
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={null}
                    style={{ cursor: "default" }}
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
                                onClick={(e) => handleSend("cancel", e)}
                                className="cancel-button-modal my-button"
                            >
                                CANCELAR
                            </button>
                            <button
                                onClick={(e) =>
                                    handleSend("confirm", e, deleteId)
                                }
                                className="confirm-button-modal my-button"
                            >
                                ADICIONAR
                            </button>
                        </div>
                    </form>
                </Modal>
            );
        } else if (deleteId === "simple") {
            return (
                <Modal
                    title={
                        simpleList.title.length > 0
                            ? simpleList.title
                            : "Lista simples"
                    }
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={null}
                    width={350}
                    style={{ cursor: "default" }}
                >
                    <form className="modal-form">
                        <input
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
                                placeholder="Ex.: 1 - Arroz"
                                value={simpleDescription.text}
                            />
                            <CheckOutlined
                                onClick={() => handleDescription()}
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
                                        <p>{content.text}</p>
                                    </div>
                                ))}
                            </div>
                        ) : null}
                        <div className="button-form-modal">
                            <button
                                onClick={(e) => handleSend("cancel", e)}
                                className="cancel-button-modal my-button"
                            >
                                CANCELAR
                            </button>
                            <button
                                onClick={(e) =>
                                    handleSend("confirm", e, deleteId)
                                }
                                className="confirm-button-modal my-button"
                            >
                                ADICIONAR
                            </button>
                        </div>
                    </form>
                </Modal>
            );
        }
    } else if (typeModal === "info" && allTask[deleteId]) {
        console.log(allTask[deleteId]);
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
                            placeholder={allTask[deleteId].title}
                            onChange={(e) =>
                                (allTask[deleteId].title = e.target.value)
                            }
                        />
                    ) : (
                        <h1 className="title-info">
                            {allTask[deleteId].title}
                        </h1>
                    )}
                    {allTask[deleteId].description.length === 0 ? null : (
                        <>
                            {allTask[deleteId].simple ? (
                                <>
                                    {allTask[deleteId].description.map(
                                        (content, id) => (
                                            <div
                                                className="simple-desc-content"
                                                key={id}
                                            >
                                                <input
                                                    type="checkbox"
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
                                <>
                                    {edit ? (
                                        <textarea
                                            onChange={(e) =>
                                                (allTask[deleteId].description =
                                                    e.target.value)
                                            }
                                            className="desc-task edit-task"
                                            placeholder={
                                                allTask[deleteId].description
                                            }
                                        />
                                    ) : (
                                        <p className="desc-info">
                                            {allTask[deleteId].description}
                                        </p>
                                    )}
                                </>
                            )}
                        </>
                    )}
                    {!allTask[deleteId].date ||
                    allTask[deleteId].date.length === 0 ? null : (
                        <>
                            {edit ? (
                                <>
                                    <DatePicker
                                        className="date-pickeC"
                                        format="YYYY-MM-DD"
                                        onChange={(ev, e) =>
                                            (allTask[deleteId].date = e)
                                        }
                                    />
                                </>
                            ) : (
                                <div className="date-info">
                                    <p>Data para conclusão</p>
                                    <p>{allTask[deleteId].date}</p>
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
    } else if (typeModal === "infoDone" && allTaskDone[deleteId]) {
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
                        {allTaskDone[deleteId].title}
                    </h1>
                    {allTaskDone[deleteId].description.length === 0 ? null : (
                        <>
                            {allTaskDone[deleteId].simple ? (
                                <>
                                    {allTaskDone[deleteId].description.map(
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
                                    {allTaskDone[deleteId].description}
                                </p>
                            )}
                        </>
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
