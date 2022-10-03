import React, { useEffect, useState } from "react";
import { useAuth } from "context/authContext";
import moment from "moment";
import TextareaAutosize from "react-autosize-textarea/lib";
import { DatePicker, message } from "antd";
import { CheckOutlined, DeleteFilled } from "@ant-design/icons";
import {
    ButtonModal,
    Checkbox,
    ChecklistContent,
    ChecklistInput,
    IconsModal,
    InfoModal,
    LabelModal,
    ModalInput,
    ShowDate,
} from "./stylesModal";

export default function CollapseTask({ task, id, isCollapsed, status }) {
    const { allTask, updateDBTasks, setChange, change } = useAuth();
    const [isEdit, setIsEdit] = useState(false);
    const [localTask, setLocalTask] = useState();
    const [simpleDescription, setSimpleDescription] = useState({
        text: "",
        checked: false,
    });

    useEffect(() => {
        setLocalTask(task);
        if (isCollapsed.length === 0) setIsEdit(false);
    }, [task, isCollapsed]);

    const handleEditConfirm = (id) => {
        if (localTask.title.length <= 0) {
            message.error("Adicione ao menos um titulo à tarefa!");
            return;
        }
        allTask[id] = localTask;
        setIsEdit(false);
        updateDBTasks();
        setChange(!change);
    };

    const handleDescription = (key) => {
        if (
            simpleDescription.text.length > 0 &&
            (key === "Enter" || key === "NumpadEnter")
        ) {
            localTask.checkList.push(simpleDescription);
            setSimpleDescription({ text: "", checked: false });
        }
    };

    const editItem = (value, index) => {
        localTask.checkList[index].text = value;
        setChange(!change);
    };

    const handleChangeCheck = (content, e) => {
        content.checked = e.target.checked;
        updateDBTasks();
        setChange(!change);
    };

    const footerButtons = (
        <>
            {isEdit ? (
                <ButtonModal
                    onClick={() => handleEditConfirm(id)}
                    type="confirm"
                >
                    CONFIRMAR
                </ButtonModal>
            ) : (
                <ButtonModal type="alert" onClick={() => setIsEdit(true)}>
                    EDITAR
                </ButtonModal>
            )}
        </>
    );

    if (localTask !== undefined) {
        return (
            <InfoModal>
                <ModalInput
                    disabled={!isEdit}
                    placeholder="Título..."
                    onChange={(e) =>
                        setLocalTask((prevState) => ({
                            ...prevState,
                            title: e.target.value,
                        }))
                    }
                    value={localTask.title}
                    type="2em"
                    isEdit="1px"
                    border={isEdit ? "#8080805f" : null}
                />
                <TextareaAutosize
                    disabled={!isEdit}
                    className="desc-task"
                    onChange={(e) => {
                        setLocalTask((prevState) => ({
                            ...prevState,
                            description: e.target.value,
                        }));
                    }}
                    placeholder="Descrição..."
                    value={localTask?.description}
                    rows={2}
                />
                {isEdit && (
                    <ChecklistInput onSubmit={(e) => e.preventDefault()}>
                        <ModalInput
                            onChange={(e) => {
                                setSimpleDescription({
                                    text: e.target.value,
                                    checked: false,
                                });
                            }}
                            onKeyDown={(e) => handleDescription(e.code)}
                            placeholder="Add novo item"
                            value={simpleDescription.text}
                            type="18px"
                            border="#8080805f"
                            autoFocus
                        />
                        <CheckOutlined
                            onClick={() => handleDescription("Enter")}
                            className="check-icon"
                        />
                    </ChecklistInput>
                )}
                {task.checkList?.map((content, id) => (
                    <ChecklistContent key={id}>
                        <>{id + 1}</>

                        {isEdit ? (
                            <ModalInput
                                placeholder={content.text}
                                onChange={(e) => editItem(e.target.value, id)}
                                value={localTask?.checkList[id].text}
                            />
                        ) : (
                            <>
                                <Checkbox
                                    disabled={status === "done" && true}
                                    type="checkbox"
                                    id={`content${id}`}
                                    checked={content.checked}
                                    onChange={(e) =>
                                        handleChangeCheck(content, e)
                                    }
                                />
                                <LabelModal
                                    htmlFor={`content${id}`}
                                    checked={content.checked}
                                >
                                    {content.text}
                                </LabelModal>
                            </>
                        )}
                        {isEdit && (
                            <IconsModal
                                onClick={() => {
                                    localTask.checkList.splice(id, 1);
                                    setChange(!change);
                                }}
                            >
                                <DeleteFilled />
                            </IconsModal>
                        )}
                    </ChecklistContent>
                ))}
                {isEdit ? (
                    <DatePicker
                        showTime={{ format: "HH:mm" }}
                        format="YYYY-MM-DD HH:mm"
                        onChange={(ev, e) =>
                            setLocalTask((prevState) => ({
                                ...prevState,
                                date: e,
                            }))
                        }
                    />
                ) : (
                    <ShowDate>
                        {task.date.length > 0 && (
                            <>
                                <div>Data para conclusão:</div>
                                <div>
                                    {moment(task?.date).format(
                                        "DD  MMMM YYYY, h:mm a"
                                    )}
                                </div>
                            </>
                        )}
                    </ShowDate>
                )}
                {status === "todo" && footerButtons}
            </InfoModal>
        );
    }
}
