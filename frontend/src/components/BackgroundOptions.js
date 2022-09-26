import React, { useState } from "react";
import "./Options.css";
import MoveButton from "../components/MoveButton";
export default function CartoonOptions() {
  const [x, setX] = useState([]);
  const backgroundsKind = [
    { name: "1", img: "images/ice-2.jpg" },
    { name: "2", img: "images/ice-2.jpg" },
    { name: "3", img: "images/ice-2.jpg" },
  ];

  const handleClickRadioButton = (e) => {
    sessionStorage.setItem('background', JSON.stringify({"background": e.target.value}));
    JSON.parse(localStorage.getItem('json'));
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
        배경을 선택하세요.
      </div>
      <div className="parent">
        {backgroundsKind.map((kind) => (
          <label key={kind.name} className="tap">
            <input
              type="radio"
              className="input-hidden"
              value={kind.name}
              checked={x === `${kind.name}`}
              onChange={handleClickRadioButton}
            />
            <img src={kind.img} className="Image" alt="배경분리" />
          </label>
        ))}
      </div>
      <MoveButton

        url1="/choicecartoon"
        url2="/result"
        style1="w-12"
        style2="w-12"
      />
    </div>
  );
}