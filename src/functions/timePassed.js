export function TimePassed(data) {
    const dataPassou = data.split(" ")[0];
    if (dataPassou === "há") return true;
    return false;
}
export function CurrentDate() {
    const date = new Date()
    const currentDay = {
        sec: date.getSeconds(),
        min: date.getMinutes(),
        hour: date.getHours(),
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear()
    }
    return `${currentDay.year} ${currentDay.month} ${currentDay.day} ${currentDay.hour}:${currentDay.min}:${currentDay.sec}`

}