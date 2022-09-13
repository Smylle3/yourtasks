import React, { useState } from "react";
import moment from "moment";
import { Empty } from "antd";
import { useAuth } from "context/authContext";
import { TimePassed } from "functions/timePassed";
import { CheckOutlined, DeleteFilled } from "@ant-design/icons";
import {
    CheckButton,
    DateTask,
    Task,
    TaskContent,
    TaskList,
    TitleTask,
} from "../stylesTodo";
import InfosTask from "../modais/infosTask";

export default function Todo() {
    const { allTask, setAllTask, setIsDone } = useAuth();
    const [isModalVisible, setModalVisible] = useState(false);
    const [taskObject, setTaskObject] = useState(null);

    const modalFunction = (id) => {
        setTaskObject(id);
        setModalVisible(true);
    };

    const handleDelete = (id) => {
        allTask.splice(id, 1);
        setAllTask((arr) => [...arr]);
    };

    if (allTask.length > 0) {
        return (
            <TaskList>
                {allTask.map((task, id) => (
                    <Task
                        border={
                            TimePassed(moment(task.date, "YYYYMMDD").fromNow())
                                ? "rgb(202, 46, 46)"
                                : "rgb(68, 204, 63)"
                        }
                        key={id}
                    >
                        <TaskContent onClick={() => modalFunction(id)}>
                            <TitleTask>{task.title}</TitleTask>
                            <DateTask>
                                {!task.date ||
                                moment(task.date).startOf("ss").fromNow() ===
                                    "Data inválida"
                                    ? null
                                    : moment(task.date).startOf("ss").fromNow()}
                            </DateTask>
                        </TaskContent>
                        <CheckButton onClick={() => setIsDone(id)}>
                            <CheckOutlined />
                        </CheckButton>
                        <CheckButton onClick={() => handleDelete(id)}>
                            <DeleteFilled />
                        </CheckButton>
                    </Task>
                ))}
                <InfosTask
                    isModalVisible={isModalVisible}
                    setModalVisible={setModalVisible}
                    taskObject={taskObject}
                    setTaskObject={setTaskObject}
                    taskIsDone={false}
                />
            </TaskList>
        );
    } else {
        return <Empty />;
    }
}
