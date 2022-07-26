import { PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import CreateTask from "../todoList/modais/createTask";
import "./styles.css";

export default function MenuPlus() {
    const [type, setType] = useState("");
    const [isModalVisible, setModalVisible] = useState(false);

    const modalFunction = (type) => {
        setType(type);
        setModalVisible(true);
    };

    return (
        <>
            <div
                onClick={() => modalFunction("detail")}
                className="todo-input-plus"
            >
                <PlusOutlined />
            </div>

            <CreateTask
                isModalVisible={isModalVisible}
                setModalVisible={setModalVisible}
                type={type}
            />
        </>
    );
}
