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
import { priorityColor, priorityText } from "functions/setPriority";

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
                    <TextPriority
                        color={priorityColor(
                            status === "todo" ? allTask[id] : allTaskDone[id]
                        )}
                    >
                        {priorityText(
                            status === "todo" ? allTask[id] : allTaskDone[id]
                        )}
                    </TextPriority>
                    <DotPriority
                        color={priorityColor(
                            status === "todo" ? allTask[id] : allTaskDone[id]
                        )}
                    />
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
