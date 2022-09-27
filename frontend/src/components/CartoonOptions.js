import React, { useState } from "react";
import "./Options.css";
import { useSelectContentStore } from "../components/store";


export default function CartoonOptions() {
  const { style , setStyle } = useSelectContentStore(); //zustand 전역변수
  
  const cartoonsKind = [
    { name: 1, img: "images/abstract01.jpg" },
    { name: 2, img: "images/abstract02.jpg" },
    { name: 3, img: "images/abstract03.jpg" },
  ];

  const handleClickRadioButton = (e) => {
    console.log()
    console.log(e.target.value);
    setStyle(e.target.value);
  };
  
  return (
    <div style={{ marginRight: "6px" }}>
      <div
        className="text"
        style={{
          marginBottom: "30px",
          fontFamily: "font",
        }}
      >
        만화를 선택하세요.
      </div>
      <div className="parent">
        {cartoonsKind.map((kind) => (
          <label key={kind.name} className="tap">
            <input
              type="radio"
              className="input-hidden"
              value={kind.name}
              checked={style === `${kind.name}`}
              onChange={handleClickRadioButton}
              
            />
            <img src={kind.img} className="Image" alt="만화선택" />
          </label>
        ))}
        
      </div>
    </div>
  );
}
