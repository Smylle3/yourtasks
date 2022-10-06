import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import { priorityColor, priorityText } from "functions/setPriority";
import React from "react";
import {
    ButtonPriority,
    ContainerPriority,
    DotPriority,
} from "./stylesDropdown";

export default function PriorityDropdown({ localTask, setLocalTask }) {
    const changePriority = (typePriority) => {
        setLocalTask((prevState) => ({
            ...prevState,
            priority: typePriority,
        }));
    };

    const menu = (
        <Menu
            items={[
                {
                    label: (
                        <ButtonPriority
                            color="#fc6868"
                            onClick={() => changePriority(3)}
                        >
                            <DotPriority color="#fc6868" />
                            Alta
                        </ButtonPriority>
                    ),
                    key: "3",
                },
                {
                    label: (
                        <ButtonPriority
                            color="#fcab68"
                            onClick={() => changePriority(2)}
                        >
                            <DotPriority color="#fcab68" />
                            Média
                        </ButtonPriority>
                    ),
                    key: "2",
                },
                {
                    label: (
                        <ButtonPriority
                            color="#6ac26a"
                            onClick={() => changePriority(1)}
                        >
                            <DotPriority color="#6ac26a" />
                            Baixa
                        </ButtonPriority>
                    ),
                    key: "1",
                },
            ]}
        />
    );

    return (
        <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
            <ContainerPriority color={priorityColor(localTask)}>
                {priorityText(localTask)}
                <DownOutlined />
            </ContainerPriority>
        </Dropdown>
    );
}
