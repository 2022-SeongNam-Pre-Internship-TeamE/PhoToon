import React from "react";
import MoveButton from "../components/MoveButton";
import UserPageButton from "../components/UserPageButton";
import style from "./MainPage.module.css";
import CartoonSlider from "../components/CartoonSlider";

export default function Start() {
  return (
    <>
      <UserPageButton />
      <div className={`${style.box1}`} style={{ height: "10rem" }}>
        <img className={`${style.logo}`} src="images/logo.png" alt="logo" />
      </div>
      <CartoonSlider></CartoonSlider>
      <MoveButton url1="/start" url2="" style1="w-12" style2="w-12" />
    </>
  );
}
