import {
    BorderOutlined,
    CheckOutlined,
    CheckSquareOutlined,
    DeleteFilled,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import MyModal from "./myModal";
import EmptyImage from "../../assets/EmptyImage.jpg";
import DoneImage from "../../assets/DoneImage.jpg";
import "./styles.css";
import { useAuth } from "../../context/authContext";
import { Spin } from "antd";
import moment from "moment";
import "moment/locale/pt-br";
import MenuPlus from "../menuPlus/menuPlus";

export default function TodoList() {
    const { user } = useAuth();
    const [change, setChange] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [typeModal, setTypeModal] = useState(false);
    const [doneTab, setDoneTab] = useState("to do");
    const [deleteId, setDeleteId] = useState(false);
    const [allTask, setAllTask] = useState([]);
    const [allTaskDone, setAllTaskDone] = useState([]);
    const [task, setTask] = useState({
        title: "",
        description: "",
        date: "",
    });
    const [simpleList, setSimpleList] = useState({
        title: "",
        description: [],
        simple: true
    });

    useEffect(() => {
        let localTask = localStorage.getItem("todo");
        let localTaskDone = localStorage.getItem("done");

        if (JSON.parse(localTask)) {
            if (JSON.parse(localTask).length > 0)
                setAllTask(JSON.parse(localTask));
        }

        if (JSON.parse(localTaskDone)) {
            if (JSON.parse(localTaskDone).length > 0)
                setAllTaskDone(JSON.parse(localTaskDone));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("todo", JSON.stringify(allTask));
    }, [allTask.length]);

    useEffect(() => {
        localStorage.setItem("done", JSON.stringify(allTaskDone));
    }, [allTaskDone.length]);

    const showModal = (type, id) => {
        setIsModalVisible(true);
        setTypeModal(type);
        setDeleteId(id);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const setIsDone = (id) => {
        allTask[id].date = moment();
        const doneTask = allTask[id];
        setAllTaskDone((arr) => [...arr, doneTask]);
        allTask.splice(id, 1);
    };

    const handleDelete = (id, isDone) => {
        isDone ? allTaskDone.splice(id, 1) : allTask.splice(id, 1);
        setChange(!change);
    };

    if (user) {
        return (
            <div className="todo-page">
                <form className="todo-form">
                    {/* <div
                        className="todo-input"
                        onClick={() => showModal("create")}
                    >
                        <p>Insira aqui uma nova tarefa...</p>
                        <EnterOutlined style={{ cursor: "pointer" }} />
                    </div> */}
                    <MenuPlus showModal={showModal} />
                </form>

                {doneTab === "to do" ? (
                    <>
                        {allTask.length > 0 ? (
                            <nav className="todo-tasks">
                                {allTask.map((task, id) => (
                                    <section className="todo-task" key={id}>
                                        <div
                                            onClick={() =>
                                                showModal("info", id)
                                            }
                                            className="todo-content-info"
                                        >
                                            <h3>{task.title}</h3>
                                            <p>
                                                {!task.date || moment(task.date)
                                                    .startOf("ss")
                                                    .fromNow() ===
                                                "Data inválida"
                                                    ? null
                                                    : moment(task.date)
                                                          .startOf("ss")
                                                          .fromNow()}
                                            </p>
                                        </div>
                                        <button onClick={() => setIsDone(id)}>
                                            <CheckOutlined />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(id)}
                                        >
                                            <DeleteFilled />
                                        </button>
                                        <div className="end-barr" />
                                    </section>
                                ))}
                            </nav>
                        ) : (
                            <img
                                className="emprty-image"
                                alt="backImg"
                                src={EmptyImage}
                            />
                        )}
                    </>
                ) : (
                    <>
                        {allTaskDone.length > 0 ? (
                            <nav className="todo-tasks">
                                {allTaskDone.map((task, id) => (
                                    <section className="todo-task" key={id}>
                                        <div
                                            onClick={() =>
                                                showModal("infoDone", id)
                                            }
                                            className="todo-content-info"
                                        >
                                            <h3>{task.title}</h3>
                                            <p>
                                                {moment(task.date)
                                                    .startOf("ss")
                                                    .fromNow()}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() =>
                                                handleDelete(id, true)
                                            }
                                        >
                                            <DeleteFilled />
                                        </button>
                                        <div className="end-barr" />
                                    </section>
                                ))}
                            </nav>
                        ) : (
                            <img
                                className="emprty-image"
                                alt="backImg"
                                src={DoneImage}
                            />
                        )}
                    </>
                )}

                <nav className="nav-select-type">
                    <section
                        onClick={() => setDoneTab("to do")}
                        className={`nav-select-button ${
                            doneTab === "to do" ? "tab-select" : null
                        }`}
                    >
                        <BorderOutlined /> A fazer
                    </section>
                    <section
                        onClick={() => setDoneTab("done")}
                        className={`nav-select-button ${
                            doneTab === "done" ? "tab-select" : null
                        }`}
                    >
                        <CheckSquareOutlined /> Feito
                    </section>
                </nav>

                <MyModal
                    isModalVisible={isModalVisible}
                    handleOk={handleOk}
                    handleCancel={handleCancel}
                    setIsModalVisible={setIsModalVisible}
                    task={task}
                    setTask={setTask}
                    simpleList={simpleList}
                    setSimpleList={setSimpleList}
                    allTask={allTask}
                    setAllTask={setAllTask}
                    allTaskDone={allTaskDone}
                    typeModal={typeModal}
                    deleteId={deleteId}
                />
            </div>
        );
    } else {
        return (
            <div className="spin">
                <Spin />
            </div>
        );
    }
}
