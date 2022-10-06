import React, { useState } from "react";
import { useAuth } from "context/authContext";
import { Spin } from "antd";
import MenuPlus from "components/menuPlus/menuPlus";
import Todo from "./todo/todo";
import Done from "./done/done";
import { BorderOutlined, CheckSquareOutlined } from "@ant-design/icons";
import {
    ContainerDesktop,
    ContainerMobile,
    SelectTabButton,
    SpinDiv,
    TodoHeader,
    TodoPage,
} from "./stylesTodo";
import "moment/locale/pt-br";
import MyCarousel from "components/myCarousel/myCarousel";
import SortIconDropdown from "components/dropdowns/sortIconDropdown";

export default function TodoList() {
    const { user } = useAuth();
    const [doneTab, setDoneTab] = useState(0);

    if (user) {
        return (
            <TodoPage>
                <ContainerMobile>
                    <SortIconDropdown />
                    <MyCarousel setDoneTab={setDoneTab}>
                        <Todo />
                        <Done />
                    </MyCarousel>
                    <MenuPlus />
                </ContainerMobile>
                <ContainerDesktop>
                    <SortIconDropdown />
                    <TodoHeader>
                        <SelectTabButton
                            borderSelect={doneTab === 0 ? "black" : "white"}
                            onClick={() => setDoneTab(0)}
                        >
                            <BorderOutlined /> A fazer
                        </SelectTabButton>
                        <MenuPlus />
                        <SelectTabButton
                            borderSelect={doneTab !== 0 ? "black" : "white"}
                            onClick={() => setDoneTab(1)}
                        >
                            <CheckSquareOutlined /> Feitos
                        </SelectTabButton>
                    </TodoHeader>
                    {doneTab === 0 ? <Todo /> : <Done />}
                </ContainerDesktop>
            </TodoPage>
        );
    } else {
        return (
            <SpinDiv>
                <Spin />
            </SpinDiv>
        );
    }
}
