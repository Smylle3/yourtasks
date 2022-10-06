import React from "react";
import { CheckOutlined, DeleteFilled } from "@ant-design/icons";
import {
    ButtonGroupCollapse,
    CheckButton,
    DateTask,
    DotPriority,
    Extra,
    Priority,
    TextPriority,
    TitleCollapse,
} from "./stylesCollapseHeader";
import moment from "moment";
import { useAuth } from "context/authContext";

export default function CollapseHeader({ id, status }) {
    const { allTask, setAllTask, allTaskDone, setAllTaskDone, setIsDone } =
        useAuth();

    const handleDelete = (id) => {
        if (status === "todo") {
            allTask.splice(id, 1);
            setAllTask((arr) => [...arr]);
        }
        if (status === "done") {
            allTaskDone.splice(id, 1);
            setAllTaskDone((arr) => [...arr]);
        }
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
                    {moment(
                        allTaskDone[id]?.endDate && allTaskDone[id]?.endDate
                    )
                        .startOf("ss")
                        .fromNow()}
                </DateTask>
            )}
            <ButtonGroupCollapse>
                <Priority>
                    <TextPriority color="rgb(252, 104, 104)">Alta</TextPriority>
                    <DotPriority color="rgb(252, 104, 104)" />
                </Priority>
                {status === "todo" && (
                    <CheckButton
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsDone(id);
                        }}
                    >
                        <CheckOutlined />
                    </CheckButton>
                )}
                <CheckButton
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(id);
                    }}
                >
                    <DeleteFilled />
                </CheckButton>
            </ButtonGroupCollapse>
        </Extra>
    );
}
