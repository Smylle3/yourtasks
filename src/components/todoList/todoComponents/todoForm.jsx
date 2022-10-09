import React from "react";
import { useAuth } from "context/authContext";
import { handleEditConfirm } from "functions/tasksEdit";
import { message } from "antd";
import { priorityColor, priorityText } from "functions/setPriority";
import { DotPriority } from "components/todoList/todoComponents/collapseHeader/stylesCollapseHeader";
import PriorityDropdown from "components/dropdowns/priorityDropdown";
import { ContainerPriority } from "components/dropdowns/stylesDropdown";
import TextEditor from "components/todoList/todoComponents/textEditor/textEditor";
import {
    ButtonModal,
    HeaderModal,
    InfoModal,
    ModalInput,
    SimpleButton,
} from "./stylesModal";
import CheckList from "./checkList";
import DateComp from "./dateComp";

export default function TodoForm({
    isEdit,
    setIsEdit,
    id,
    setId,
    status,
    localTask,
    setLocalTask,
    isModal,
    setModalVisible,
    hasProps,
    setHasProps,
}) {
    const { allTask, setAllTask, change, setChange, updateDBTasks } = useAuth();

    const handleSend = (event) => {
        event.preventDefault();
        if (localTask.title.length === 0) {
            message.error("Preencha os campos corretamente!");
            return;
        }
        setAllTask((arr) => [...arr, localTask]);
        setLocalTask({
            title: "",
            description: "",
            checkList: [],
            date: "",
            endDate: "",
            priority: 1,
        });
        setModalVisible(false);
    };

    const handleCancel = () => {
        if (status === "create") {
            setLocalTask({
                title: "",
                description: "",
                checkList: [],
                date: "",
            });
            setHasProps({
                date: false,
                checkList: false,
            });
        } else {
            setIsEdit(false);
            setId(null);
            setLocalTask();
        }
        setModalVisible(false);
    };

    const footerButtons = () => {
        if (status === "todo") {
            return (
                <>
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
                </>
            );
        } else if (status === "create") {
            return (
                <ButtonModal onClick={(e) => handleSend(e)} type="confirm">
                    CRIAR TAREFA
                </ButtonModal>
            );
        }
    };

    return (
        <InfoModal>
            <HeaderModal>
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
                {isEdit && (
                    <PriorityDropdown
                        localTask={localTask}
                        setLocalTask={setLocalTask}
                    />
                )}
                {isModal && !isEdit && (
                    <ContainerPriority color={priorityColor(localTask)}>
                        <DotPriority color={priorityColor(localTask)} />
                        {priorityText(localTask)}
                    </ContainerPriority>
                )}
            </HeaderModal>
            <TextEditor
                task={localTask}
                setTask={setLocalTask}
                isEdit={isEdit}
            />
            {status === "create" && (
                <SimpleButton
                    status={status}
                    onClick={() => {
                        setLocalTask((prevState) => ({
                            ...prevState,
                            checkList: [],
                        }));
                        setHasProps((prevState) => ({
                            ...prevState,
                            checkList: !hasProps.checkList,
                        }));
                    }}
                >
                    {hasProps.checkList
                        ? `Excluir o checklist`
                        : `Clique para criar um checklist`}
                </SimpleButton>
            )}
            <CheckList
                isEdit={status === "create" ? hasProps.checkList : isEdit}
                status={status}
                localTask={localTask}
            />
            <SimpleButton
                status={status}
                onClick={() =>
                    setHasProps((prevState) => ({
                        ...prevState,
                        date: !hasProps?.date,
                    }))
                }
            >
                {hasProps?.date
                    ? `Não definir data para conclusão`
                    : `Clique para definir uma data para a conclusão`}
            </SimpleButton>

            <DateComp
                isEdit={status === "create" ? hasProps.date : isEdit}
                status={status}
                localTask={localTask}
                setLocalTask={setLocalTask}
            />
            {footerButtons()}
            {isModal && (
                <ButtonModal type="cancel" onClick={(e) => handleCancel()}>
                    FECHAR
                </ButtonModal>
            )}
        </InfoModal>
    );
}
