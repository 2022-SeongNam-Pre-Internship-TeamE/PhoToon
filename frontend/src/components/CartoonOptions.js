import React, { useState } from "react";
import "./Options.css";

export default function CartoonOptions() {
  const [x, setX] = useState([]);
  const cartoonsKind = [
    { name: "first", img: "images/abstract01.jpg" },
    { name: "second", img: "images/abstract02.jpg" },
    { name: "third", img: "images/abstract03.jpg" },
  ];

  const handleClickRadioButton = (e) => {
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
        {/* <div className="first">
          <img className="Image" src="images/abstract01.jpg" alt="" />
        </div>
        <div className="second">
          <img className="Image" src="images/abstract02.jpg" alt="" />
        </div>
        <div className="third">
          <img className="Image" src="images/abstract03.jpg" alt="" />
        </div>*/}
      </div>
    </div>
  );
}
