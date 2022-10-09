import { DatePicker } from "antd";
import moment from "moment";
import React from "react";
import { ShowDate } from "../modais/stylesModal";

export default function DateComp({ isEdit, status, localTask, setLocalTask }) {
    return (
        <>
            {isEdit ? (
                <DatePicker
                    className="date-picker"
                    showTime={{ format: "HH:mm" }}
                    format="YYYY-MM-DD HH:mm"
                    onChange={(ev, e) =>
                        setLocalTask((prevState) => ({
                            ...prevState,
                            date: e,
                        }))
                    }
                />
            ) : (
                <ShowDate>
                    {localTask.date.length > 0 && (
                        <>
                            <div>Data para conclusão:</div>
                            <div>
                                {moment(localTask?.date).format(
                                    "DD  MMMM YYYY, h:mm a"
                                )}
                            </div>
                        </>
                    )}
                    {status === "done" && (
                        <>
                            <div>Concluído dia:</div>
                            <div>
                                {moment(
                                    localTask.endDate
                                        ? moment(localTask.endDate)
                                        : moment(localTask.date)
                                ).format("DD  MMMM YYYY, h:mm a")}
                            </div>
                        </>
                    )}
                </ShowDate>
            )}
        </>
    );
}
