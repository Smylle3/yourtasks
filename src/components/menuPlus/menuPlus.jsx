import { PlusOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import React, { useState } from "react";
import "./styles.css";

export default function MenuPlus({ showModal }) {
    const [visible, setVisible] = useState(false);

    const modalFunction = (isCreate, type) => {
        showModal(isCreate, type);
        setVisible(false);
    };

    const content = (
        <div className="task-menu-plus">
            <button
                className="logout-button"
                onClick={() => modalFunction("create", "detail")}
            >
                Tarefa com detalhes
            </button>
            <button
                className="logout-button"
                onClick={() => modalFunction("create", "simple")}
            >
                Lista simples
            </button>
            <button
                className="logout-button"
                onClick={() => modalFunction("create", "note")}
            >
                Anotação
            </button>
        </div>
    );

    const handleVisibleChange = (newVisible) => {
        setVisible(newVisible);
    };

    return (
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
    );
}
