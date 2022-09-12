import React from "react";
import MoveButton from "../components/MoveButton";
import style from "./MainPage.module.css";
import UserPageButton from "../components/UserPageButton";
import Previews from "../components/Previews";

export default function Start() {
  return (
    <>
      <UserPageButton />
      <div className={`${style.box1}`} style={{ height: "10rem" }}>
        <img className={`${style.logo}`} src="images/logo.png" alt="logo" />
      </div>
      <Previews />
      <MoveButton
        url1=""
        url2="/choicecartoon"
        style1="hidden w-12"
        style2="w-12"
      />
    </>
  );
}
