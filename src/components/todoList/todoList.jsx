import React from "react";
import "./styles.css";
import { useAuth } from "../../context/authContext";
import { Spin } from "antd";
import "moment/locale/pt-br";
import MenuPlus from "../menuPlus/menuPlus";
import Todo from "./todo/todo";
import Done from "./done/done";
import useMobile from "../../functions/useMobile";

export default function TodoList() {
    const { user } = useAuth();
    const isMobile = useMobile();

    if (user) {
        return (
            <div className="todo-page">
                <form className="todo-form">
                    <MenuPlus />
                </form>
                    <div className="todo-lists">
                        <Todo />
                        <Done />
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
