import React from "react";
import "./MainButton.css";
import { Link } from "react-router-dom";

export default function MainButton({ url, text }) {
  return (
    <div className="buttonBox">
      <Link to={url} style={{ textDecoration: "none" }}>
        <button
          className="button button--saqui button--round-l button--text-thick"
          data-text={text}
        >
          {text}
        </button>
      </Link>
    </div>
  );
}
