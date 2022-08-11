import { DeleteFilled } from "@ant-design/icons";
import moment from "moment";
import React, { useState } from "react";
import { useAuth } from "../../../context/authContext";
import InfosTask from "../modais/infosTask";
import { Empty } from "antd";

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

    return (
        <nav className="todo-tasks">
            {allTaskDone.length > 0 ? (
                <div className="column-reverse">
                    {allTaskDone.map((task, id) => (
                        <section className="todo-task" key={id}>
                            <div
                                onClick={() => modalFunction(id)}
                                className="todo-content-info"
                            >
                                <h3>{task.title}</h3>
                                <p>
                                    {moment(task.date).startOf("ss").fromNow()}
                                </p>
                            </div>
                            <button onClick={() => handleDelete(id)}>
                                <DeleteFilled />
                            </button>
                        </section>
                    ))}
                </div>
            ) : (
                <Empty />
            )}
            <InfosTask
                isModalVisible={isModalVisible}
                setModalVisible={setModalVisible}
                taskObject={taskObject}
                setTaskObject={setTaskObject}
                taskIsDone={true}
            />
        </nav>
    );
}
