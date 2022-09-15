import React from "react";
import style from "./Slide.module.css";
export default function Slide({ img }) {
  return <img src={img} alt="img" className={`${style.slideImg}`} />;
}
