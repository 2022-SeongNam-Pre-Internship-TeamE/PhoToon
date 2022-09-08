import React from "react";
import "./MainButton.css";
export default function MainButton({ text }) {
  return (
    <div className="parent">
      <button className="first">{text}</button>
      <button className="second">{text}</button>
      <button className="third">{text}</button>
      
    </div>
  );
}
