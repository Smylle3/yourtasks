import { message } from "antd";

export const handleEditConfirm = (id, localTask, allTask, setIsEdit, updateDBTasks, change, setChange) => {
    if (localTask.title.length <= 0) {
        message.error("Adicione ao menos um titulo à tarefa!");
        return;
    }
    allTask[id] = localTask;
    setIsEdit(false);
    updateDBTasks();
    setChange(!change);
};

export const handleDescription = (key, simpleDescription, setSimpleDescription, localTask) => {
    if (
        simpleDescription.text.length > 0 &&
        (key === "Enter" || key === "NumpadEnter")
    ) {
        localTask.checkList.push(simpleDescription);
        setSimpleDescription({ text: "", checked: false });
    }
};

export const editItem = (value, id, localTask, change, setChange) => {
    localTask.checkList[id].text = value;
    setChange(!change);
};

export const handleChangeCheck = (content, e, updateDBTasks, change, setChange) => {
    content.checked = e.target.checked;
    updateDBTasks();
    setChange(!change);
};