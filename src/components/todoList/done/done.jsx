import React, { useState } from "react";
import moment from "moment";
import { Collapse, Empty } from "antd";
import { useAuth } from "context/authContext";
import { CaretRightOutlined } from "@ant-design/icons";
import { TaskList } from "../stylesTodo";
import CollapsePanel from "antd/lib/collapse/CollapsePanel";
import CollapseTask from "../modais/collapseTask";
import CollapseHeader from "components/collapseHeader/collapseHeader";
import { TimePassed } from "functions/timePassed";
import "../styles.css";

export default function Done() {
    const { allTaskDone } = useAuth();
    const [isCollapsed, setIsCollapsed] = useState([]);
    const status = "done"

    if (allTaskDone.length > 0) {
        return (
            <TaskList>
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
            </TaskList>
        );
    } else {
        return <Empty />;
    }
}
