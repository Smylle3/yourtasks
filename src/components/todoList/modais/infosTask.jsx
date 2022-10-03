import { CheckOutlined, DeleteFilled } from "@ant-design/icons";
import { DatePicker, message, Modal } from "antd";
import { useAuth } from "context/authContext";
import moment from "moment";
import React, { useEffect, useState } from "react";
import TextareaAutosize from "react-autosize-textarea/lib";
import "../styles.css";
import {
    ButtonModal,
    Checkbox,
    ChecklistContent,
    ChecklistInput,
    IconsModal,
    InfoModal,
    InputGroup,
    LabelModal,
    ModalInput,
    ShowDate,
} from "./stylesModal";

export default function InfosTask({
    isModalVisible,
    setModalVisible,
    taskObject,
    setTaskObject,
    taskIsDone,
}) {
    const { allTask, allTaskDone, updateDBTasks } = useAuth();
    const [change, setChange] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [localTask, setLocalTask] = useState();
    const [simpleDescription, setSimpleDescription] = useState({
        text: "",
        checked: false,
    });

    useEffect(() => {
        taskIsDone
            ? setLocalTask(allTaskDone[taskObject])
            : setLocalTask(allTask[taskObject]);
    }, [taskObject, allTask, allTaskDone, taskIsDone]);

    const handleCancel = () => {
        setIsEdit(false);
        setTaskObject(null);
        setModalVisible(false);
        setLocalTask();
    };

    const handleChangeCheck = (content, e) => {
        content.checked = e.target.checked;
        updateDBTasks();
        setChange(!change);
    };

    const handleEditConfirm = (id) => {
        if (localTask.title.length <= 0) {
            message.error("Adicione ao menos um titulo à tarefa!");
            return;
        }
        allTask[id] = localTask;
        setIsEdit(false);
        updateDBTasks();
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

    const detailDescription = () => (
        <TextareaAutosize
            disabled={!isEdit}
            className="desc-task"
            placeholder={localTask.description}
            onChange={(e) => {
                setLocalTask((prevState) => ({
                    ...prevState,
                    description: e.target.value,
                }));
            }}
            value={localTask.description}
            rows={2}
        />
    );

    const listDescription = (isFinish) =>
        isEdit ? (
            <>
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
                <InputGroup>
                    {localTask.checkList.map((content, id) => (
                        <ChecklistContent key={id}>
                            <>{id + 1}</>
                            <ModalInput
                                placeholder={content.text}
                                onChange={(e) => editItem(e.target.value, id)}
                                value={localTask.checkList[id].text}
                            />
                            <IconsModal
                                onClick={() => {
                                    localTask.checkList.splice(id, 1);
                                    setChange(!change);
                                }}
                            >
                                <DeleteFilled />
                            </IconsModal>
                        </ChecklistContent>
                    ))}
                </InputGroup>
            </>
        ) : (
            <>
                {localTask.checkList.map((content, id) => (
                    <ChecklistContent key={id}>
                        <>{id + 1}</>
                        <Checkbox
                            disabled={isFinish}
                            type="checkbox"
                            id={`content${id}`}
                            checked={content.checked}
                            onChange={(e) => handleChangeCheck(content, e)}
                        />
                        <LabelModal
                            htmlFor={`content${id}`}
                            checked={content.checked}
                        >
                            {content.text}
                        </LabelModal>
                    </ChecklistContent>
                ))}
            </>
        );

    const dateDescription = (isFinish) =>
        isEdit ? (
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
            <>
                <ShowDate>
                    {localTask.date.length > 0 && (
                        <>
                            <div>Data para conclusão:</div>
                            <div>
                                {moment(localTask?.date).format(
                                    "DD  MMMM YYYY, h:mm a"
                                )}
                            </div>
                        </>
                    )}
                    {isFinish && (
                        <>
                            <div>Concluído dia:</div>
                            <div>
                                {moment(
                                    allTaskDone[taskObject].endDate
                                        ? moment(
                                              allTaskDone[taskObject].endDate
                                          )
                                        : moment(allTaskDone[taskObject].date)
                                ).format("DD  MMMM YYYY, h:mm a")}
                            </div>
                        </>
                    )}
                </ShowDate>
            </>
        );

    if (localTask !== undefined) {
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
                    <InfoModal>
                        <ModalInput
                            disabled={!isEdit}
                            placeholder={allTask[taskObject].title}
                            onChange={(e) =>
                                setLocalTask((prevState) => ({
                                    ...prevState,
                                    title: e.target.value,
                                }))
                            }
                            value={localTask.title}
                            type="2em"
                            isEdit="1px"
                            border={isEdit ? "#8080805f":null}
                        />
                        {detailDescription()}
                        {allTask[taskObject].checkList &&
                            listDescription(false)}
                        {dateDescription()}
                        {isEdit ? (
                            <ButtonModal
                                onClick={() => handleEditConfirm(taskObject)}
                                type="confirm"
                            >
                                CONFIRMAR
                            </ButtonModal>
                        ) : (
                            <ButtonModal
                                type="alert"
                                onClick={() => setIsEdit(true)}
                            >
                                EDITAR
                            </ButtonModal>
                        )}
                        <ButtonModal
                            type="cancel"
                            onClick={(e) => handleCancel()}
                        >
                            FECHAR
                        </ButtonModal>
                    </InfoModal>
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
                    <InfoModal>
                        <ModalInput
                            disabled
                            value={localTask.title}
                            type="2em"
                        />
                        {localTask.description.length > 0 &&
                            detailDescription()}
                        {allTaskDone[taskObject].checkList &&
                            listDescription(true)}
                        {dateDescription(true)}
                        <ButtonModal
                            type="cancel"
                            onClick={(e) => handleCancel()}
                        >
                            FECHAR
                        </ButtonModal>
                    </InfoModal>
                </Modal>
            );
        }
    }
}
