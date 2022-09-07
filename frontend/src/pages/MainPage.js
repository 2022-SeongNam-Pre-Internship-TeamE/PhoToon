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
// [
//   {
//     id: 1,
//     src: "images/ice-1.jpg",
//     text: "첫 번쩨 슬라이드 버튼",
//     alt: "첫 번째 슬라이드",
//   },
//   {
//     id: 2,
//     src: "images/ice-2.jpg",
//     text: "두번째 슬라이드 버튼",
//     alt: "두번째 슬라이드",
//   },
//   {
//     id: 3,
//     src: "images/background.jpg",
//     text: "세번째 슬라이드 버튼",
//     alt: "세번째 슬라이드",
//   },
// ];
