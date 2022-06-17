import { Progress } from "antd";
import React from "react";
import "./styles.css";

export default function Pomodoro() {
    return (
        <div className="pomo-page">
            <p>01:05:25</p>
            <Progress
                strokeColor={{
                    "0%": "#108ee9",
                    "100%": "#87d068",
                }}
            />
            <button>Start</button>
        </div>
    );
}
