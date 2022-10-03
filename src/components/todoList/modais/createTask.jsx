import { CheckOutlined, DeleteFilled } from "@ant-design/icons";
import { DatePicker, message, Modal } from "antd";
import { useAuth } from "context/authContext";
import React, { useState } from "react";
import TextareaAutosize from "react-autosize-textarea/lib";
import {
    ButtonFooterGroup,
    ButtonGroup,
    ButtonModal,
    ChecklistContent,
    ChecklistInput,
    InfoModal,
    InputGroup,
    ModalInput,
    SimpleButton,
} from "./stylesModal";

export default function CreateTask({ isModalVisible, setModalVisible }) {
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

    function handleSend(event) {
        event.preventDefault();
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
        setModalVisible(false);
    }

    function editItem(value, index) {
        task.checkList[index].text = value;
        setChange(!change);
    };

    return (
        <Modal
            visible={isModalVisible}
            onCancel={handleCancel}
            footer={null}
            closable={false}
            style={{ cursor: "default" }}
        >
            <InfoModal>
                <ModalInput
                    autoFocus
                    placeholder="Título..."
                    onChange={(e) =>
                        setTask((prevState) => ({
                            ...prevState,
                            title: e.target.value,
                        }))
                    }
                    value={task.title}
                    type="2em"
                    border={"#8080805f"}
                />
                <TextareaAutosize
                    onChange={(e) =>
                        setTask((prevState) => ({
                            ...prevState,
                            description: e.target.value,
                        }))
                    }
                    value={task.description}
                    className="desc-task"
                    placeholder="Descrição..."
                    rows={3}
                />
                <ButtonGroup>
                    <SimpleButton
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
                    </SimpleButton>
                    {hasCheckList && (
                        <ChecklistInput onSubmit={(e) => e.preventDefault()}>
                            <ModalInput
                                onChange={(e) => {
                                    setSimpleDescription({
                                        text: e.target.value,
                                        checked: false,
                                    });
                                }}
                                onKeyDown={(e) => handleDescription(e.code)}
                                placeholder="Ex.: Item 1"
                                value={simpleDescription.text}
                                border="#8080805f"
                            />
                            <CheckOutlined
                                onClick={() => handleDescription("Enter")}
                                className="check-icon"
                            />
                        </ChecklistInput>
                    )}
                    {task.checkList.length > 0 && (
                        <InputGroup>
                            {task.checkList.map((content, id) => (
                                <ChecklistContent key={id}>
                                    <>{id + 1}</>
                                    <ModalInput
                                        onChange={(e) => editItem(e.target.value, id)}
                                        placeholder={task.checkList[id].text}
                                        value={task.checkList[id].text}
                                    />
                                    <DeleteFilled
                                        onClick={() => {
                                            task.checkList.splice(id, 1);
                                            setChange(!change);
                                        }}
                                    />
                                </ChecklistContent>
                            ))}
                        </InputGroup>
                    )}

                    <SimpleButton onClick={() => setHasDate(!hasDate)}>
                        {hasDate
                            ? `Não definir data para conclusão`
                            : `Clique para definir uma data para a conclusão`}
                    </SimpleButton>
                    {hasDate && (
                        <DatePicker
                            showTime={{ format: "HH:mm" }}
                            className="date-pickeC"
                            format="YYYY-MM-DD HH:mm"
                            onChange={(ev, e) =>
                                setTask((prevState) => ({
                                    ...prevState,
                                    date: e,
                                }))
                            }
                        />
                    )}
                </ButtonGroup>
                <ButtonFooterGroup>
                    <ButtonModal type="cancel" onClick={(e) => handleCancel()}>
                        FECHAR
                    </ButtonModal>
                    <ButtonModal type="confirm" onClick={(e) => handleSend(e)}>
                        ADICIONAR
                    </ButtonModal>
                </ButtonFooterGroup>
            </InfoModal>
        </Modal>
    );
}
