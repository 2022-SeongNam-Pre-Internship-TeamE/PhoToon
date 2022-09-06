import React from "react";
import "./MainButton.css";
export default function MainButton({ text }) {
  return (
    <div className="buttonBox">
      <button className="mainbutton">{text}</button>
    </div>
  );
}
