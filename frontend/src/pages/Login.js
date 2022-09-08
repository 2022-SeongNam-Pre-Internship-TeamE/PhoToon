import React, { Component } from "react";
import { LoginWrapper, LoginInput, RightAlignedLink } from "../components/Auth";
import MainButton from "../components/MainButton";
import style from "./MainPage.module.css";

class Login extends Component {
  render() {
    return (
      <div>
        <div className={`${style.box1}`}>
          <img className={`${style.logo}`} src="images/logo.png" alt="logo" />
        </div>
        <LoginWrapper>
          <LoginInput name="email" placeholder="E-MAIL" />
          <LoginInput name="password" placeholder="PASSWORD" type="password" />
          <div style={{ marginTop: "35px" }}>
            <MainButton text="LOGIN"></MainButton>
          </div>
          <RightAlignedLink to="/Join">SIGN UP →</RightAlignedLink>
        </LoginWrapper>
      </div>
    );
  }
}

export default Login;
