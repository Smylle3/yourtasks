import React, { useState } from "react";
import { useAuth } from "context/authContext";
import { TimePassed } from "functions/timePassed";
import moment from "moment";
import { Collapse, Empty } from "antd";
import CollapsePanel from "antd/lib/collapse/CollapsePanel";
import { CaretRightOutlined } from "@ant-design/icons";
import { TaskGroup, TaskList, TasksUnit } from "../stylesTodo";
import CollapseTask from "../modais/collapseTask";
import CollapseHeader from "components/collapseHeader/collapseHeader";
import "../styles.css";
import ModalTask from "../modais/modalTask";

export default function Todo() {
    const { allTask } = useAuth();
    const [isCollapsed, setIsCollapsed] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [id, setId] = useState();
    const status = "todo";

    const borderColor = (task) => {
        if (TimePassed(moment(task.date, "YYYYMMDD").fromNow()))
            return "rgb(202, 46, 46)";
        else return "rgb(68, 204, 63)";
    };

    const openModal = (id) => {
        setId(id);
        setModalVisible(true);
    };

    if (allTask.length > 0) {
        return (
            <TaskList>
                <TaskGroup>
                    {allTask.map((task, id) => (
                        <TasksUnit
                            key={id}
                            onClick={(e) => {
                                e.stopPropagation();
                                openModal(id);
                            }}
                            border={borderColor(task)}
                        >
                            <CollapseHeader id={id} status={status} />
                        </TasksUnit>
                    ))}
                </TaskGroup>
                <Collapse
                    className="my-collapse"
                    expandIcon={({ isActive }) => (
                        <CaretRightOutlined rotate={isActive ? 90 : 0} />
                    )}
                    onChange={(e) => setIsCollapsed(e)}
                >
                    {allTask.map((task, id) => (
                        <CollapsePanel
                            header={<CollapseHeader id={id} status={status} />}
                            style={{
                                marginTop: "1em",
                                border: `1px solid ${borderColor(task)}`,
                                borderRadius: "5px",
                            }}
                            key={id}
                        >
                            <CollapseTask
                                task={task}
                                id={id}
                                isCollapsed={isCollapsed}
                                status={status}
                            />
                        </CollapsePanel>
                    ))}
                </Collapse>
                <ModalTask
                    isModalVisible={isModalVisible}
                    setModalVisible={setModalVisible}
                    id={id}
                    setId={setId}
                    status={status}
                />
            </TaskList>
        );
    } else {
        return <Empty />;
    }
}
