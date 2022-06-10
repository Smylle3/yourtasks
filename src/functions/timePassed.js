export function TimePassed(data) {
    const dataPassou = data.split(" ")[0];
    if (dataPassou === "há") return true;
    return false;
}
