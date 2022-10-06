import React from "react";
import Carousel from "nuka-carousel/lib/carousel";
import { BorderOutlined, CheckSquareOutlined } from "@ant-design/icons";
import { SlideButton } from "./stylesCarousel";

export default function MyCarousel({ setDoneTab, children }) {
    const Customization = {
        carousel: {
            display: "flex",
            flexDirection: "column-reverse",
            minHeight: "70vh",
            marginBottom: "3em"
        },
    };

    const isDisabled = (current, type) => {
        if (current === 0 && type === "prev") return true;
        else if (current === 1 && type === "next") return true;
        else return false;
    };

    const Buttons = (typeSlide, currentSlide, type) => (
        <SlideButton
            onClick={typeSlide}
            disabled={isDisabled(currentSlide, type)}
            left={type === "prev" && "1em"}
            right={type === "next" && "1em"}
        >
            {type === "prev" ? (
                <>
                    <BorderOutlined /> A fazer
                </>
            ) : (
                <>
                    <CheckSquareOutlined /> Feito
                </>
            )}
        </SlideButton>
    );

    return (
        <Carousel
            adaptiveHeight={false}
            style={Customization.carousel}
            afterSlide={(e) => setDoneTab(e)}
            defaultControlsConfig={{
                pagingDotsStyle: {
                    fill: "transparent",
                },
            }}
            renderCenterLeftControls={({ previousSlide, currentSlide }) =>
                Buttons(previousSlide, currentSlide, "prev")
            }
            renderCenterRightControls={({ nextSlide, currentSlide }) =>
                Buttons(nextSlide, currentSlide, "next")
            }
        >
            {children}
        </Carousel>
    );
}
