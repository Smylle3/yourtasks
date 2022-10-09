import React, { useEffect, useState } from "react";
import TodoForm from "../todoComponents/todoForm";

export default function CollapseTask({ task, id, isCollapsed, status }) {
    const [isEdit, setIsEdit] = useState(false);
    const [localTask, setLocalTask] = useState();

    useEffect(() => {
        setLocalTask(task);
        if (isCollapsed.length === 0) setIsEdit(false);
    }, [task, isCollapsed]);

    if (localTask !== undefined) {
        return (
            <TodoForm
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                id={id}
                status={status}
                localTask={localTask}
                setLocalTask={setLocalTask}
            />
        );
    }
}
