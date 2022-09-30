import React from "react";
import style from "./Slide.module.css";
export default function Slide({ img }) {
  return <img  style={{
    width: '400px', }} src={img} alt="img" className={`${style.slideImg}`} />;
}
