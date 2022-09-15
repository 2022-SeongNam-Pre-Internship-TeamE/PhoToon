import React from "react";
import MoveButton from "../components/MoveButton";
import UserPageButton from "../components/UserPageButton";
import style from "./MainPage.module.css";
import CartoonSlider from "../components/CartoonSlider";
import "../components/CartoonOptions.css";
export default function ChoiceCartoon() {
  return (
    <div className="min-h-screen">
      <div className="flex">
        <div className={`${style.box1}`}>
          <img className={`${style.logo2}`} src="images/logo.png" alt="logo" />
        </div>
        <UserPageButton className="float-left" />
      </div>
      <div className="text">만화를 선택하세요</div>
      <CartoonSlider></CartoonSlider>

      <MoveButton
        url1="/start"
        url2="/background"
        style1="w-12"
        style2="w-12"
      />
    </div>
  );
}
