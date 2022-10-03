import React, { useState } from "react";
import { useAuth } from "context/authContext";
import { TimePassed } from "functions/timePassed";
import moment from "moment";
import { Collapse, Empty } from "antd";
import CollapsePanel from "antd/lib/collapse/CollapsePanel";
import {
    CaretRightOutlined,
    CheckOutlined,
    DeleteFilled,
} from "@ant-design/icons";
import {
    ButtonGroupCollapse,
    CheckButton,
    DateTask,
    Extra,
    TaskList,
    TitleCollapse,
} from "../stylesTodo";
import CollapseTask from "../modais/collapseTask";

export default function Todo() {
    const { allTask, setAllTask, setIsDone } = useAuth();
    const [isCollapsed, setIsCollapsed] = useState([]);

    const handleDelete = (id) => {
        allTask.splice(id, 1);
        setAllTask((arr) => [...arr]);
    };

    const CollapseHeader = (id) => (
        <Extra>
            <TitleCollapse>{allTask[id].title}</TitleCollapse>
            <DateTask>
                {!allTask[id].date ||
                moment(allTask[id].date).startOf("ss").fromNow() ===
                    "Data inválida"
                    ? null
                    : moment(allTask[id].date).startOf("ss").fromNow()}
            </DateTask>
            <ButtonGroupCollapse>
                <CheckButton onClick={() => setIsDone(id)}>
                    <CheckOutlined />
                </CheckButton>
                <CheckButton onClick={() => handleDelete(id)}>
                    <DeleteFilled />
                </CheckButton>
            </ButtonGroupCollapse>
        </Extra>
    );

    if (allTask.length > 0) {
        return (
            <TaskList>
                <Collapse
                    className="my-collapse"
                    expandIcon={({ isActive }) => (
                        <CaretRightOutlined rotate={isActive ? 90 : 0} />
                    )}
                    onChange={(e) => setIsCollapsed(e)}
                >
                    {allTask.map((task, id) => (
                        <CollapsePanel
                            header={CollapseHeader(id, task)}
                            key={id}
                            style={{
                                marginTop: "1em",
                                border: `1px solid ${
                                    TimePassed(
                                        moment(task.date, "YYYYMMDD").fromNow()
                                    )
                                        ? "rgb(202, 46, 46)"
                                        : "rgb(68, 204, 63)"
                                }`,
                                borderRadius: "5px",
                            }}
                        >
                            <CollapseTask task={task} id={id} isCollapsed={isCollapsed} />
                        </CollapsePanel>
                    ))}
                </Collapse>
            </TaskList>
        );
    } else {
        return <Empty />;
    }
}
