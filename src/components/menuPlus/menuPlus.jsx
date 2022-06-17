import { PlusOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import React, { useState } from "react";
import CreateTask from "../todoList/modais/createTask";
import "./styles.css";

export default function MenuPlus() {
    const [type, setType] = useState("");
    const [visible, setVisible] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);

    const modalFunction = (type) => {
        setVisible(false);
        setType(type);
        setModalVisible(true);
    };
    
    const content = (
        <div className="task-menu-plus">
            <button
                className="logout-button"
                onClick={() => modalFunction("detail")}
            >
                Tarefa com detalhes
            </button>
            <button
                className="logout-button"
                onClick={() => modalFunction("simple")}
            >
                Lista simples
            </button>
        </div>
    );

    const handleVisibleChange = (newVisible) => {
        setVisible(newVisible);
    };

    return (
        <>
            <Popover
                onVisibleChange={handleVisibleChange}
                visible={visible}
                content={content}
                trigger="click"
            >
                <div className="todo-input-plus">
                    <PlusOutlined />
                </div>
            </Popover>
            <CreateTask
                isModalVisible={isModalVisible}
                setModalVisible={setModalVisible}
                type={type}
            />
        </>
    );
}
