import { CheckOutlined, DeleteFilled, EnterOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import MyModal from "./myModal";
import EmptyImage from "../../assets/EmptyImage.jpg";
import "./styles.css";
import { useAuth } from "../../context/authContext";
import { Spin } from "antd";
import moment from "moment";
import 'moment/locale/pt-br'

export default function TodoList() {
    const { user } = useAuth();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [typeModal, setTypeModal] = useState(false);
    const [deleteId, setDeleteId] = useState(false);
    const [allTask, setAllTask] = useState([]);
    const [task, setTask] = useState({
        title: "",
        description: "",
        date: "",
        isDone: false,
    });

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

    if (user) {
        return (
            <div className="todo-page">
                <form className="todo-form">
                    <div
                        className="todo-input"
                        onClick={() => showModal("create")}
                    >
                        <p>Insira aqui uma nova tarefa...</p>
                        <EnterOutlined style={{ cursor: "pointer" }} />
                    </div>
                </form>
                {allTask.length > 0 ? (
                    <nav className="todo-tasks">
                        {allTask.map((task, id) => (
                            <section className="todo-task" key={id}>
                                <div
                                    onClick={() => showModal("info", id)}
                                    className="todo-content-info"
                                >
                                    <h3>{task.title}</h3>
                                    <p>
                                        {moment(task.date)
                                            .startOf("ss")
                                            .fromNow()}
                                    </p>
                                </div>
                                <button>
                                    <CheckOutlined />
                                </button>
                                <button onClick={() => showModal("delete", id)}>
                                    <DeleteFilled />
                                </button>
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
                <MyModal
                    isModalVisible={isModalVisible}
                    handleOk={handleOk}
                    handleCancel={handleCancel}
                    setIsModalVisible={setIsModalVisible}
                    task={task}
                    setTask={setTask}
                    allTask={allTask}
                    setAllTask={setAllTask}
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
