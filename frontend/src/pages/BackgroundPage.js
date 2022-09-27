import React from "react";
import UserPageButton from "../components/UserPageButton";
import style from "./MainPage.module.css";
import BackgroundOptions from "../components/BackgroundOptions";

export default function Background() {
  return (
    <div className="min-h-screen">
      <div className="flex">
        <div className={`${style.box1}`}>
          <img className={`${style.logo2}`} src="images/logo.png" alt="logo" />
        </div>
        <UserPageButton className="float-left" />
      </div>
      <BackgroundOptions></BackgroundOptions>
    </div>
  );
}
