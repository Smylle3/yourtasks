import React, { useState } from "react";
import CreateTask from "components/todoList/modais/createTask";
import { PlusOutlined } from "@ant-design/icons";
import { PlusButton } from "./stylePlus";

export default function MenuPlus() {
    const [type, setType] = useState("");
    const [isModalVisible, setModalVisible] = useState(false);

    const modalFunction = (type) => {
        setType(type);
        setModalVisible(true);
    };

    return (
        <>
            <PlusButton onClick={() => modalFunction("detail")}>
                <PlusOutlined />
            </PlusButton>

            <CreateTask
                isModalVisible={isModalVisible}
                setModalVisible={setModalVisible}
                type={type}
            />
        </>
    );
}
