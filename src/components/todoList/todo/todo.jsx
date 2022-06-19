import { CheckOutlined, DeleteFilled } from "@ant-design/icons";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/authContext";
import { TimePassed } from "../../../functions/timePassed";
import InfosTask from "../modais/infosTask";
import emptyImage from "../../../assets/EmptyImage.jpg";

export default function Todo() {
    const [change, setChange] = useState(false);
    const { allTask, setAllTaskDone } = useAuth();
    const [isModalVisible, setModalVisible] = useState(false);
    const [taskObject, setTaskObject] = useState(null);

    useEffect(() => {
        localStorage.setItem("todo", JSON.stringify(allTask));
    }, [allTask.length]);

    const modalFunction = (id) => {
        setTaskObject(id);
        setModalVisible(true);
    };

    const setIsDone = (id) => {
        const doneTask = allTask[id];
        allTask[id].date = moment();
        setAllTaskDone((arr) => [...arr, doneTask]);
        allTask.splice(id, 1);
    };

    const handleDelete = (id) => {
        allTask.splice(id, 1);
        setChange(!change);
    };

    if (allTask.length <= 0) {
        return (
            <img alt="emptyImage" src={emptyImage} className="empty-image" />
        );
    } else {
        return (
            <nav className="todo-tasks">
                <div className="column-reverse">
                    {allTask.map((task, id) => (
                        <section
                            className="todo-task"
                            style={{
                                border: `1px solid ${
                                    TimePassed(
                                        moment(task.date, "YYYYMMDD").fromNow()
                                    )
                                        ? "rgb(202, 46, 46)"
                                        : "rgb(68, 204, 63)"
                                }`,
                            }}
                            key={id}
                        >
                            <div
                                onClick={() => modalFunction(id)}
                                className="todo-content-info"
                            >
                                <h3>{task.title}</h3>
                                <p>
                                    {!task.date ||
                                    moment(task.date)
                                        .startOf("ss")
                                        .fromNow() === "Data inválida"
                                        ? null
                                        : moment(task.date)
                                              .startOf("ss")
                                              .fromNow()}
                                </p>
                            </div>
                            <button onClick={() => setIsDone(id)}>
                                <CheckOutlined />
                            </button>
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
                    taskIsDone={false}
                />
            </nav>
        );
    }
}
