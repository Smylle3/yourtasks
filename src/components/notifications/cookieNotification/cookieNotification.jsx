import { SettingOutlined } from "@ant-design/icons";
import { notification } from "antd";
import Cookies from "js-cookie";

export default function CookieNotification() {
    const key = `open${Date.now()}`;
    const btn = (
        <button
            className="my-button confirm-button-modal"
            onClick={() => {
                Cookies.set("acceptCookies", true, { expires: 7 });
                notification.close(key);
            }}
        >
            Concordar e continuar
        </button>
    );
    const args = {
        description: (
            <span style={{ display: "flex", textAlign: "justify" }}>
                A gente utiliza armazenamento em nuvem e cookies para garantir
                uma melhor experiência no site, ao continuar navegando você
                concorda com a utilização desses recursos.
            </span>
        ),
        icon: <SettingOutlined />,
        duration: 0,
        placement: "bottom",
        btn,
        key,
        closeIcon: <></>,
        style: {
            width: 1000,
            backgroundColor: "rgb(240, 240, 240)",
        },
    };
    notification.info(args);
}
