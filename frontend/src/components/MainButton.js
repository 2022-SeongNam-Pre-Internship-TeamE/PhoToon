import React from "react";
import "./MainButton.css";
export default function MainButton({ text }) {
  return (
    <div className="buttonBox">
      <button
        className="button button--saqui button--round-l button--text-thick"
        data-text={text}
      >
        {text}
      </button>{" "}
    </div>
  );
}
