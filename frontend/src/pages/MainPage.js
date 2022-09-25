import React from "react";
import style from "./MainPage.module.css";
import MainButton from "../components/MainButton";
import Slider from "../components/Slider";



export default function MainPage() {
  


  return (
    <div className="min-h-screen">
      <div className={`${style.box1}`}>
        <img className={`${style.logo1}`} src="images/logo.png" alt="logo" />
      </div>
      <div className={`${style.box2}`}>
        <Slider />
      </div>
      <div className="flex">
        <MainButton url="/login" text="LOGIN" />
      </div>
    </div>
  );
}
