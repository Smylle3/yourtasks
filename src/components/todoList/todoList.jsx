import React, { useState } from "react";
import { useAuth } from "context/authContext";
import useMobile from "functions/useMobile";
import { Spin } from "antd";
import MenuPlus from "components/menuPlus/menuPlus";
import Todo from "./todo/todo";
import Done from "./done/done";
import Carousel from "nuka-carousel/lib/carousel";
import { BorderOutlined, CheckSquareOutlined } from "@ant-design/icons";
import {
    LocalTitle,
    SelectTabButton,
    SpinDiv,
    TodoHeader,
    TodoPage,
} from "./stylesTodo";
import "moment/locale/pt-br";

export default function TodoList() {
    const { user } = useAuth();
    const isMobile = useMobile();
    const [doneTab, setDoneTab] = useState(0);

    const Customization = {
        carousel: {
            display: "flex",
            flexDirection: "column-reverse",
            minHeight: "70vh",
        },
        next: {
            backgroundColor: "#fff",
            color: "#000",
            borderRadius: "5px",
            border: "1px solid #000",
            position: "fixed",
            bottom: "7em",
            right: "1em",
        },
        prev: {
            backgroundColor: "#fff",
            color: "#000",
            borderRadius: "5px",
            border: "1px solid #000",
            position: "fixed",
            bottom: "7em",
            left: "1em",
        },
    };

    if (user) {
        return (
            <TodoPage>
                {isMobile ? (
                    <>
                        <LocalTitle
                            color={doneTab === 0 ? "#ff98007f" : "#4caf507f"}
                        >
                            {doneTab === 0
                                ? "TAREFAS A FAZER"
                                : "TAREFAS CONCLUÍDAS"}
                        </LocalTitle>
                        <MenuPlus />
                        <Carousel
                            adaptiveHeight={false}
                            style={Customization.carousel}
                            afterSlide={(e) => setDoneTab(e)}
                            defaultControlsConfig={{
                                nextButtonText: "Feitos",
                                nextButtonStyle: Customization.next,
                                prevButtonStyle: Customization.prev,
                                prevButtonText: "A fazer",
                                pagingDotsStyle: {
                                    fill: "transparent",
                                },
                            }}
                        >
                            <Todo />
                            <Done />
                        </Carousel>
                    </>
                ) : (
                    <>
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
                    </>
                )}
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
