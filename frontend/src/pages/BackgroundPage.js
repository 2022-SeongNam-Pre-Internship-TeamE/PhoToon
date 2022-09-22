import React from "react";
import MoveButton from "../components/MoveButton";
import UserPageButton from "../components/UserPageButton";
import style from "./MainPage.module.css";
import CartoonOptions from "../components/CartoonOptions";

export default function Background() {
  return (
    <div className="min-h-screen">
      <div className="flex">
        <div className={`${style.box1}`}>
          <img className={`${style.logo2}`} src="images/logo.png" alt="logo" />
        </div>
        <UserPageButton className="float-left" />
      </div>
      <CartoonOptions></CartoonOptions>
      <MoveButton
        url1="/choicecartoon"
        url2="/result"
        style1="w-12"
        style2="w-12"
      />
    </div>
  );
}
