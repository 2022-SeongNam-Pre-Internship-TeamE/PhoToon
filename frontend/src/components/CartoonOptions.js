import React, { useState } from "react";
import "./Options.css";

export default function CartoonOptions() {
  const [x, setX] = useState([]);


  const cartoonsKind = [
    { name: 1, img: "images/abstract01.jpg" },
    { name: 2, img: "images/abstract02.jpg" },
    { name: 3, img: "images/abstract03.jpg" },
  ];

  const handleClickRadioButton = (e) => {
    sessionStorage.setItem('style', JSON.stringify({"style": e.target.value}));
    JSON.parse(localStorage.getItem('json'));
    console.log()
    console.log(e.target.value);
    setX(e.target.value);
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
              checked={x === `${kind.name}`}
              onChange={handleClickRadioButton}
            />
            <img src={kind.img} className="Image" alt="만화선택" />
          </label>
        ))}
        
      </div>
    </div>
  );
}
