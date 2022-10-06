import React from "react";
import { Dropdown, Menu } from "antd";
import { ButtonPriority, SortIcon } from "./stylesDropdown";
import { CgSortZa } from "react-icons/cg";
import {
    CalendarOutlined,
    FontColorsOutlined,
    OrderedListOutlined,
} from "@ant-design/icons";
import { useAuth } from "context/authContext";
import Cookies from "js-cookie";

export default function SortIconDropdown() {
    const { typeSort, setTypeSort } = useAuth();

    const setSort = (type) => {
        Cookies.set("sort", type, { expires: 360 });
        setTypeSort(type);
    };

    const menu = (
        <Menu
            items={[
                {
                    label: "Ordenar tarefas",
                    key: "4",
                },
                {
                    type: "divider",
                },
                {
                    label: (
                        <ButtonPriority
                            onClick={() => setSort("endDate")}
                            color={typeSort === "endDate" && "#6ac26a"}
                        >
                            <CalendarOutlined />
                            Data de conclusão
                        </ButtonPriority>
                    ),
                    key: "3",
                },
                {
                    label: (
                        <ButtonPriority
                            onClick={() => setSort("priority")}
                            color={typeSort === "priority" && "#6ac26a"}
                        >
                            <OrderedListOutlined />
                            Prioridade
                        </ButtonPriority>
                    ),
                    key: "2",
                },
                {
                    label: (
                        <ButtonPriority
                            onClick={() => setSort("name")}
                            color={typeSort === "name" && "#6ac26a"}
                        >
                            <FontColorsOutlined />
                            Nome
                        </ButtonPriority>
                    ),
                    key: "1",
                },
            ]}
        />
    );
    return (
        <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
            <SortIcon>
                <CgSortZa size={25} />
            </SortIcon>
        </Dropdown>
    );
}
