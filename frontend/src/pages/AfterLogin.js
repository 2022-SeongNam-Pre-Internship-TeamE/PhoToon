import React from "react";
import style from "./MainPage.module.css";
import MainButton from "../components/MainButton";
import Slider from "../components/Slider";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";
export default function AfterLogin() {
  return (
    <>
      <div className={`${style.box1}`}>
        <img className={`${style.logo1}`} src="images/logo.png" alt="logo" />
      </div>
      <div className={`${style.box2}`}>
        <Slider />
      </div>
      <div className="flex">
        {/* 임시로 시작 페이지 라우팅 */}
        <MainButton url="/start" text="START" />
      </div>
    </>
  );
}
