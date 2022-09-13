import React, { useState } from "react";
import moment from "moment";
import { Empty } from "antd";
import { useAuth } from "context/authContext";
import InfosTask from "../modais/infosTask";
import { DeleteFilled } from "@ant-design/icons";
import {
    CheckButton,
    DateTask,
    Task,
    TaskContent,
    TaskList,
    TitleTask,
} from "../stylesTodo";

export default function Done() {
    const { allTaskDone, setAllTaskDone } = useAuth();
    const [isModalVisible, setModalVisible] = useState(false);
    const [taskObject, setTaskObject] = useState(null);

    const modalFunction = (id) => {
        setTaskObject(id);
        setModalVisible(true);
    };

    const handleDelete = (id) => {
        allTaskDone.splice(id, 1);
        setAllTaskDone((arr) => [...arr]);
    };

    if (allTaskDone.length > 0) {
        return (
            <TaskList>
                {allTaskDone.map((task, id) => (
                    <Task key={id}>
                        <TaskContent onClick={() => modalFunction(id)}>
                            <TitleTask>{task.title}</TitleTask>
                            <DateTask>
                                {moment(task.date).startOf("ss").fromNow()}
                            </DateTask>
                        </TaskContent>
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
                    taskIsDone={true}
                />
            </TaskList>
        );
    } else {
        return <Empty />;
    }
}
