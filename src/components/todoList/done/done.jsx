import { DeleteFilled } from "@ant-design/icons";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/authContext";
import InfosTask from "../modais/infosTask";
import emptyImage from '../../../assets/EmptyImage.jpg'

export default function Done() {
    const [change, setChange] = useState(false);
    const { allTaskDone } = useAuth();
    const [isModalVisible, setModalVisible] = useState(false);
    const [taskObject, setTaskObject] = useState(null);

    useEffect(() => {
        localStorage.setItem("done", JSON.stringify(allTaskDone));
    }, [allTaskDone.length]);

    const modalFunction = (id) => {
        setTaskObject(id);
        setModalVisible(true);
    };

    const handleDelete = (id) => {
        allTaskDone.splice(id, 1);
        setChange(!change);
    };

    if (allTaskDone.length > 0) {
        return (
            <nav className="todo-tasks">
                <div className="column-reverse">
                    {allTaskDone.map((task, id) => (
                        <section className="todo-task" key={id}>
                            <div
                                onClick={() => modalFunction(id)}
                                className="todo-content-info"
                            >
                                <h3>{task.title}</h3>
                                <p>
                                    {moment(task.date)
                                        .startOf("ss")
                                        .fromNow()}
                                </p>
                            </div>
                            <button onClick={() => handleDelete(id)}>
                                <DeleteFilled />
                            </button>
                        </section>
                    ))}
                </div>
                <InfosTask
                    isModalVisible={isModalVisible}
                    setModalVisible={setModalVisible}
                    taskObject={taskObject}
                    setTaskObject={setTaskObject}
                    taskIsDone={true}
                />
            </nav>
        );
    } else {
        return (
            <img alt="emptyImage" src={emptyImage} className="empty-image" />
        );
    }
}
