export const priorityText = (Task) => {
    if (!Task.priority || Task.priority === 1) return "Baixa";
    else if (Task.priority === 2) return "Média";
    else if (Task.priority === 3) return "Alta";
};

export const priorityColor = (Task) => {
    if (!Task.priority || Task.priority === 1)
        return "#6ac26a";
    else if (Task.priority === 2) return "#fcab68";
    else if (Task.priority === 3) return "#fc6868";
};