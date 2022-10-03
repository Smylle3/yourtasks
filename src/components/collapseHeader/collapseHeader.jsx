import React from "react";
import { CheckOutlined, DeleteFilled } from "@ant-design/icons";
import {
    ButtonGroupCollapse,
    CheckButton,
    DateTask,
    Extra,
    TitleCollapse,
} from "./stylesCollapseHeader";
import moment from "moment";
import { useAuth } from "context/authContext";

export default function CollapseHeader({ id, status }) {
    const { allTask, setAllTask, allTaskDone, setIsDone } = useAuth();

    const handleDelete = (id) => {
        allTask.splice(id, 1);
        setAllTask((arr) => [...arr]);
    };

    return (
        <Extra>
            <TitleCollapse>
                {status === "todo"
                    ? allTask[id]?.title
                    : allTaskDone[id]?.title}
            </TitleCollapse>
            {status === "todo" ? (
                <DateTask>
                    {!allTask[id]?.date ||
                    moment(allTask[id].date).startOf("ss").fromNow() ===
                        "Data inválida"
                        ? null
                        : moment(allTask[id]?.date).startOf("ss").fromNow()}
                </DateTask>
            ) : (
                <DateTask>
                    {moment(allTaskDone[id]?.endDate && allTaskDone[id]?.endDate)
                        .startOf("ss")
                        .fromNow()}
                </DateTask>
            )}
            <ButtonGroupCollapse>
                {status === "todo" && (
                    <CheckButton onClick={() => setIsDone(id)}>
                        <CheckOutlined />
                    </CheckButton>
                )}
                <CheckButton onClick={() => handleDelete(id)}>
                    <DeleteFilled />
                </CheckButton>
            </ButtonGroupCollapse>
        </Extra>
    );
}
