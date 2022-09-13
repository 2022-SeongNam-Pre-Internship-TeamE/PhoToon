import React from "react";
import "./CartoonOptions.css";

export default function CartoonOptions()  {
  return (
    <div style={{marginRight: "6px"}}>
    <div className="text">만화를 선택하세요.</div>
    <div className="parent">
      <div className="first">
      <img className= "Image" src="images/ice-2.jpg" alt="" />
      </div>
      <div className="second">
      <img className= "Image" src="images/ice-1.jpg" alt="" />
      </div>
      <div className="third">
      <img className= "Image" src="images/ice-2.jpg" alt="" />
      </div>
    </div>
    </div>
  );
}