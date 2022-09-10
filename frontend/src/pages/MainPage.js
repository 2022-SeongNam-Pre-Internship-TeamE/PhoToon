import React from "react";
import style from "./MainPage.module.css";
import MainButton from "../components/MainButton";
import Slider from "../components/Slider";
import { Link } from "react-router-dom";
export default function MainPage() {
  return (
    <>
      <div className={`${style.box1}`}>
        <img className={`${style.logo}`} src="images/logo.png" alt="logo" />
      </div>
      <div className={`${style.box2}`}>
        <Slider />
      </div>
      <div className={`${style.box3}`}>
        <Link
          to="/Login"
          className="block m-auto"
          style={{ textDecoration: "none" }}
        >
          <MainButton text="LOGIN" />
        </Link>
      </div>
    </>
  );
}
