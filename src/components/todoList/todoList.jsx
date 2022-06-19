import React, { useEffect, useState } from "react";
import "./styles.css";
import { useAuth } from "../../context/authContext";
import { Spin } from "antd";
import "moment/locale/pt-br";
import MenuPlus from "../menuPlus/menuPlus";
import Todo from "./todo/todo";
import Done from "./done/done";
import { BorderOutlined, CheckSquareOutlined } from "@ant-design/icons";

export default function TodoList() {
    const { user } = useAuth();
    const [doneTab, setDoneTab] = useState("to do");
    const [gesture, setGesture] = useState({ XInicial: null, XFinal: null });

    useEffect(() => {
        if (gesture.XInicial - gesture.XFinal > 100) {
            console.log("vai para feitos", gesture);
            setDoneTab("done");
        }

        if (gesture.XFinal - gesture.XInicial > 100) {
            console.log("vai para a fazer", gesture);
            setDoneTab("to do");
        }
    }, [gesture]);

    if (user) {
        return (
            <div className="todo-page">
                <form className="todo-form">
                    <div
                        className={`default-done-tab ${
                            doneTab === "to do" ? `done-tab` : null
                        }`}
                        onClick={() => setDoneTab("to do")}
                    >
                        <BorderOutlined /> A fazer
                    </div>
                    <MenuPlus />
                    <div
                        className={`default-done-tab ${
                            doneTab === "done" ? `done-tab` : null
                        }`}
                        onClick={() => setDoneTab("done")}
                    >
                        <CheckSquareOutlined /> Feitos
                    </div>
                </form>
                <div
                    className="todo-lists"
                    onTouchStart={({ changedTouches }) =>
                        setGesture((prevState) => ({
                            ...prevState,
                            XInicial: changedTouches[0].clientX,
                            XFinal: changedTouches[0].clientX,
                        }))
                    }
                    onTouchEnd={({ changedTouches }) =>
                        setGesture((prevState) => ({
                            ...prevState,
                            XFinal: changedTouches[0].clientX,
                        }))
                    }
                >
                    {doneTab === "to do" ? <Todo /> : <Done />}
                </div>
            </div>
        );
    } else {
        return (
            <div className="spin">
                <Spin />
            </div>
        );
    }
}
