import React, { useState } from "react";
import CreateTask from "components/todoList/modais/createTask";
import { PlusOutlined } from "@ant-design/icons";
import { ContainerMenuPlus, PlusButton } from "./stylePlus";

export default function MenuPlus() {
    const [isModalVisible, setModalVisible] = useState(false);

    return (
        <ContainerMenuPlus>
            <PlusButton onClick={() => setModalVisible(true)}>
                <PlusOutlined />
            </PlusButton>

            <CreateTask
                isModalVisible={isModalVisible}
                setModalVisible={setModalVisible}
            />
        </ContainerMenuPlus>
    );
}
