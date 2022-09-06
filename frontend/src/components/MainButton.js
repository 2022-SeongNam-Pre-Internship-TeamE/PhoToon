import React from "react";
import "./MainButton.css";
export default function MainButton({ text }) {
  return (
    <div className="buttonBox">
      <button className="mainbutton">{text}</button>
      {/* <button className="btn-2">{text}</button> */}
    </div>
  );
}
// box bg-1
// button button--aylen button--round-l button--text-thick
