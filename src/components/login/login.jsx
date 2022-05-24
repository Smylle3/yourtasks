import { GithubFilled, GoogleOutlined } from "@ant-design/icons";
import React from "react";
import logo from "../../assets/logo192.png";

export default function Login() {
  return (
    <div id="login-page">
      <div id="login-card">
        <div id="login-title">
          <img alt="logo" src={logo} />
          <h2>Bem vindo ao ConverSa</h2>
          <img alt="logo" src={logo} />
        </div>
        <div className="login-button google">
          <GoogleOutlined /> Login com Google
        </div>
        <div className="login-button github">
          <GithubFilled /> Login com GitHub
        </div>
      </div>
    </div>
  );
}
