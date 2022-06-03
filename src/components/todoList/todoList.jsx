import { CheckOutlined, DeleteFilled, EnterOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import MyModal from "./myModal";
import "./styles.css";

export default function TodoList() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isCreate, setIsCreate] = useState(false);
    const [task, setTask] = useState({
        title: "",
        description: "",
        date: "",
        isDone: false,
    });
    const [allTask, setAllTask] = useState([
        { title: "Atvididade1", description: "Descrição1", date: "12/12/1202" },
        { title: "Atvididade2", description: "Descrição2", date: "56/42/2322" },
        { title: "Atvididade3", description: "Descrição3", date: "23/98/7889" },
    ]);

    const showModal = (create) => {
        setIsCreate(create);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleDelete = (id, action) => {
        if (action) {
        }
    };

    return (
        <div className="todo-page">
            <form className="todo-form">
                <div className="todo-input" onClick={() => showModal(true)}>
                    <p>Insira aqui uma nova tarefa...</p>
                    <EnterOutlined style={{ cursor: "pointer" }} />
                </div>
            </form>
            <nav className="todo-tasks">
                {allTask.map((task, id) => (
                    <section className="todo-task" key={id}>
                        <h3>{task.title}</h3>
                        <p>Até: {task.date}</p>
                        <button onClick={() => handleDelete(id, false)}>
                            <CheckOutlined />
                        </button>
                        <button onClick={() => showModal(false)}>
                            <DeleteFilled />
                        </button>
                    </section>
                ))}
            </nav>
            <MyModal
                isModalVisible={isModalVisible}
                handleOk={handleOk}
                handleCancel={handleCancel}
                setIsModalVisible={setIsModalVisible}
                create={isCreate}
                task={task}
                setTask={setTask}
                allTask={allTask}
                setAllTask={setAllTask}
            />
        </div>
    );
}
