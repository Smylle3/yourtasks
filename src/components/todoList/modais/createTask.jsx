import React, { useState } from "react";
import { Modal } from "antd";
import { useAuth } from "context/authContext";
import TodoForm from "../todoComponents/todoForm";

export default function CreateTask({ isModalVisible, setModalVisible }) {
    const { task, setTask } = useAuth();
    const [hasProps, setHasProps] = useState({
        date: false,
        checkList: false,
    });

    return (
        <Modal
            visible={isModalVisible}
            onCancel={() => setModalVisible(false)}
            footer={null}
            closable={false}
            style={{ cursor: "default" }}
        >
            <TodoForm
                isEdit={true}
                status={"create"}
                localTask={task}
                setLocalTask={setTask}
                isModal={true}
                setModalVisible={setModalVisible}
                hasProps={hasProps}
                setHasProps={setHasProps}
            />
        </Modal>
    );
}
