import React from "react";
import { JoinWrapper, JoinInput } from "../components/Auth";
import MainButton from "../components/MainButton";
import style from "./MainPage.module.css";
import { Link } from "react-router-dom";

export default function Join() {
  return (
    <div className="min-h-screen">
      <div className={`${style.box1}`}>
        <img className={`${style.logo1}`} src="images/logo.png" alt="logo" />
      </div>
      <JoinWrapper>
        <JoinInput label="E-MAIL" name="email" />
        <JoinInput label="PASSWORD" name="password" type="password" />
        <JoinInput
          label="PASSWORD CHECK"
          name="password check"
          type="password"
        />
        <div style={{ marginTop: "35px" }}>
          {/* 임시로 로그인 페이지 라우팅 */}
          <MainButton url="/Login" text="SIGN UP"></MainButton>
        </div>
      </JoinWrapper>
    </div>
  );
}
