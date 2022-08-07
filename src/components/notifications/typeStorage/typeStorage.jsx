import { SettingOutlined } from "@ant-design/icons";
import { notification } from "antd";
import Cookies from "js-cookie";
import "./styles.css";

export default function TypeStorage() {
    const key = `open${Date.now()}`;
    const btn = (
        <form
            className="container-storage-select"
            onSubmit={(e) => {
                e.preventDefault();
                console.log(e.target[0].checked);
                Cookies.set(
                    "typeStorage",
                    `${e.target[0].checked ? "local" : "cloud"}`,
                    { expires: 7 }
                );
                notification.close(key);
            }}
        >
            <div>
                <label htmlFor="localStorage">
                    <input
                        type="radio"
                        id="localStorage"
                        name="storageSelect"
                        value="localStorage"
                        required
                    />
                    Armazenar dados localmente.
                </label>
                <label htmlFor="cloudStorage">
                    <input
                        type="radio"
                        id="cloudStorage"
                        name="storageSelect"
                        value="cloudStorage"
                        required
                    />
                    Armzenar dados na nuvem.
                </label>
            </div>
            <input
                className="my-button confirm-button-modal"
                value="SALVAR"
                type="submit"
            />
        </form>
    );
    const args = {
        description: (
            <span style={{ display: "flex", textAlign: "justify" }}>
                Nós utilizamos dois tipos de armazenamento, o local do navegador
                e a famosa nuvem, aqui você escolhe qual utilizar, lembrando que
                o armazenamento local é restrito apenas à este dispositivo
                equanto na nuvem é sinconizado de acordo com sua conta Google ou
                GitHub.
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
