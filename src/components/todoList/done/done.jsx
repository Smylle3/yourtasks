import React, { useState } from "react";
import moment from "moment";
import { Collapse, Empty } from "antd";
import { useAuth } from "context/authContext";
import { CaretRightOutlined } from "@ant-design/icons";
import { TaskGroup, TaskList, TasksUnit } from "../stylesTodo";
import CollapsePanel from "antd/lib/collapse/CollapsePanel";
import CollapseTask from "../modais/collapseTask";
import CollapseHeader from "components/collapseHeader/collapseHeader";
import { TimePassed } from "functions/timePassed";
import "../styles.css";
import ModalTask from "../modais/modalTask";

export default function Done() {
    const { allTaskDone } = useAuth();
    const [isCollapsed, setIsCollapsed] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [id, setId] = useState();
    const status = "done";

    const openModal = (id) => {
        setId(id);
        setModalVisible(true);
    };

    if (allTaskDone.length > 0) {
        return (
            <TaskList>
                <TaskGroup>
                    {allTaskDone.map((task, id) => (
                        <TasksUnit
                            key={id}
                            onClick={(e) => {
                                e.stopPropagation();
                                openModal(id);
                            }}
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
                    {allTaskDone.map((task, id) => (
                        <CollapsePanel
                            header={<CollapseHeader id={id} status={status} />}
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
        return <Empty style={{marginTop: "5em"}} />;
    }
}
