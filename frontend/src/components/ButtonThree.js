import React from "react";
import "./MainButton.css";
import { AiOutlineDownload, AiOutlineShareAlt, AiOutlineDelete } from "react-icons/ai";

export default function fristButton({ text }) {
  return (
    <div className="parent">
      
      <button className="first modal-button button button--saqui button--round-l button--text-thick"><AiOutlineDownload/> Download</button>
      <button className="second modal-button button button--saqui button--round-l button--text-thick"><AiOutlineShareAlt /> Share</button>
      <button className="third modal-button button button--saqui button--round-l button--text-thick"><AiOutlineDelete/> Delete</button>
      
    </div>
  );
}
