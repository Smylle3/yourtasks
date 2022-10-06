import React, { useEffect, useState } from "react";
import { useAuth } from "context/authContext";
import { DatePicker, Modal } from "antd";
import moment from "moment";
import TextareaAutosize from "react-autosize-textarea/lib";
import { CheckOutlined, DeleteFilled } from "@ant-design/icons";
import {
    ChecklistInput,
    ModalInput,
    InputGroup,
    ChecklistContent,
    IconsModal,
    Checkbox,
    LabelModal,
    ShowDate,
    InfoModal,
    ButtonModal,
    HeaderModal,
} from "./stylesModal";
import {
    editItem,
    handleChangeCheck,
    handleDescription,
    handleEditConfirm,
} from "functions/tasksEdit";
import PriorityDropdown from "components/dropdowns/priorityDropdown";
import { priorityColor, priorityText } from "functions/setPriority";
import {
    ContainerPriority,
    DotPriority,
} from "components/dropdowns/stylesDropdown";

export default function ModalTask({
    isModalVisible,
    setModalVisible,
    id,
    setId,
    status,
}) {
    const { allTask, allTaskDone, updateDBTasks, change, setChange } =
        useAuth();
    const [localTask, setLocalTask] = useState();
    const [isEdit, setIsEdit] = useState(false);
    const [simpleDescription, setSimpleDescription] = useState({
        text: "",
        checked: false,
    });

    useEffect(() => {
        status === "done"
            ? setLocalTask(allTaskDone[id])
            : setLocalTask(allTask[id]);
    }, [id, allTask, allTaskDone, status]);

    const handleCancel = () => {
        setIsEdit(false);
        setId(null);
        setModalVisible(false);
        setLocalTask();
    };

    const detailDescription = () => (
        <TextareaAutosize
            disabled={!isEdit}
            className="desc-task"
            placeholder={localTask?.description}
            onChange={(e) => {
                setLocalTask((prevState) => ({
                    ...prevState,
                    description: e.target.value,
                }));
            }}
            value={localTask?.description}
            rows={2}
        />
    );

    const listDescription = (isFinish) => (
        <>
            {isEdit && (
                <ChecklistInput onSubmit={(e) => e.preventDefault()}>
                    <ModalInput
                        onChange={(e) => {
                            setSimpleDescription({
                                text: e.target.value,
                                checked: false,
                            });
                        }}
                        onKeyDown={(e) =>
                            handleDescription(
                                e.code,
                                simpleDescription,
                                setSimpleDescription,
                                localTask
                            )
                        }
                        placeholder="Add novo item"
                        value={simpleDescription.text}
                        type="18px"
                        border="#8080805f"
                        autoFocus
                    />
                    <CheckOutlined
                        onClick={() =>
                            handleDescription(
                                "Enter",
                                simpleDescription,
                                setSimpleDescription,
                                localTask
                            )
                        }
                        className="check-icon"
                    />
                </ChecklistInput>
            )}
            <InputGroup>
                {localTask.checkList.map((content, id) => (
                    <ChecklistContent key={id}>
                        <>{id + 1}</>
                        {isEdit ? (
                            <>
                                <ModalInput
                                    placeholder={content.text}
                                    onChange={(e) =>
                                        editItem(
                                            e.target.value,
                                            id,
                                            localTask,
                                            change,
                                            setChange
                                        )
                                    }
                                    value={localTask.checkList[id].text}
                                />
                                <IconsModal
                                    onClick={() => {
                                        localTask.checkList.splice(id, 1);
                                        setChange(!change);
                                    }}
                                >
                                    <DeleteFilled />
                                </IconsModal>{" "}
                            </>
                        ) : (
                            <>
                                <Checkbox
                                    disabled={isFinish}
                                    type="checkbox"
                                    id={`content${id}`}
                                    checked={content.checked}
                                    onChange={(e) =>
                                        handleChangeCheck(
                                            content,
                                            e,
                                            updateDBTasks,
                                            change,
                                            setChange
                                        )
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
                    </ChecklistContent>
                ))}
            </InputGroup>
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
                                allTaskDone[id].endDate
                                    ? moment(allTaskDone[id].endDate)
                                    : moment(allTaskDone[id].date)
                            ).format("DD  MMMM YYYY, h:mm a")}
                        </div>
                    </>
                )}
            </ShowDate>
        );

    if (localTask) {
        if (status === "todo") {
            return (
                <Modal
                    visible={isModalVisible}
                    onCancel={handleCancel}
                    footer={null}
                    closable={false}
                    style={{ cursor: "default" }}
                >
                    <InfoModal>
                        <HeaderModal>
                            <ModalInput
                                disabled={!isEdit}
                                placeholder={allTask[id].title}
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
                            {isEdit ? (
                                <PriorityDropdown
                                    localTask={localTask}
                                    setLocalTask={setLocalTask}
                                />
                            ) : (
                                <ContainerPriority
                                    color={priorityColor(localTask)}
                                >
                                    <DotPriority
                                        color={priorityColor(localTask)}
                                    />
                                    {priorityText(localTask)}
                                </ContainerPriority>
                            )}
                        </HeaderModal>

                        {detailDescription()}
                        {listDescription()}
                        {dateDescription()}
                        {isEdit ? (
                            <ButtonModal
                                onClick={() =>
                                    handleEditConfirm(
                                        id,
                                        localTask,
                                        allTask,
                                        setIsEdit,
                                        updateDBTasks,
                                        change,
                                        setChange
                                    )
                                }
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
        if (status === "done") {
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
                        <HeaderModal>
                            <ModalInput
                                disabled
                                value={localTask.title}
                                type="2em"
                            />
                            <ContainerPriority color={priorityColor(localTask)}>
                                <DotPriority color={priorityColor(localTask)} />
                                {priorityText(localTask)}
                            </ContainerPriority>
                        </HeaderModal>
                        {detailDescription()}
                        {listDescription(true)}
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
