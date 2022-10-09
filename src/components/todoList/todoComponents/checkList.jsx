import React, { useState } from "react";
import { useAuth } from "context/authContext";
import { CheckOutlined, DeleteFilled } from "@ant-design/icons";
import {
    Checkbox,
    ChecklistContent,
    ChecklistGroup,
    ChecklistInput,
    IconsModal,
    LabelModal,
    ModalInput,
} from "./stylesModal";

export default function CheckList({ isEdit, status, localTask }) {
    const { change, setChange, updateDBTasks } = useAuth();
    const [simpleDescription, setSimpleDescription] = useState({
        text: "",
        checked: false,
    });

    const handleDescription = (key) => {
        if (
            simpleDescription.text.length > 0 &&
            (key === "Enter" || key === "NumpadEnter")
        ) {
            localTask.checkList.push(simpleDescription);
            setSimpleDescription({ text: "", checked: false });
        }
    };

    const handleChangeCheck = (content, e) => {
        content.checked = e.target.checked;
        updateDBTasks();
        setChange(!change);
    };

    const editItem = (value, index) => {
        localTask.checkList[index].text = value;
        setChange(!change);
    };

    return (
        <>
            <ChecklistInput
                isEdit={isEdit}
                onSubmit={(e) => e.preventDefault()}
            >
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
            <ChecklistGroup hasList={localTask.checkList.length}>
                {localTask.checkList?.map((content, id) => (
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
            </ChecklistGroup>
        </>
    );
}
