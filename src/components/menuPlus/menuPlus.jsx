import React, { useState } from "react";
import CreateTask from "components/todoList/modais/createTask";
import { PlusOutlined } from "@ant-design/icons";
import { PlusButton } from "./stylePlus";

export default function MenuPlus() {
    const [isModalVisible, setModalVisible] = useState(false);

    return (
        <>
            <PlusButton onClick={() => setModalVisible(true)}>
                <PlusOutlined />
            </PlusButton>

            <CreateTask
                isModalVisible={isModalVisible}
                setModalVisible={setModalVisible}
            />
        </>
    );
}
