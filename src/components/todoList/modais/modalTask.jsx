import React, { useEffect, useState } from "react";
import { useAuth } from "context/authContext";
import { Modal } from "antd";
import TodoForm from "../todoComponents/todoForm";

export default function ModalTask({
    isModalVisible,
    setModalVisible,
    id,
    setId,
    status,
}) {
    const { allTask, allTaskDone } = useAuth();
    const [localTask, setLocalTask] = useState();
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        status === "done"
            ? setLocalTask(allTaskDone[id])
            : setLocalTask(allTask[id]);
    }, [id, allTask, allTaskDone, status]);

    if (localTask) {
        return (
            <Modal
                visible={isModalVisible}
                onCancel={() => setModalVisible(false)}
                footer={null}
                closable={false}
                style={{ cursor: "default" }}
            >
                <TodoForm
                    isEdit={isEdit}
                    setIsEdit={setIsEdit}
                    id={id}
                    setId={setId}
                    status={status}
                    localTask={localTask}
                    setLocalTask={setLocalTask}
                    isModal={true}
                    setModalVisible={setModalVisible}
                />
            </Modal>
        );
    }
}
