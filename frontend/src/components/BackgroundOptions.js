import React, { useState } from "react";
import "./Options.css";

export default function CartoonOptions() {
  const [x, setX] = useState([]);
  const backgroundsKind = [
    { name: "first", img: "images/ice-2.jpg" },
    { name: "second", img: "images/ice-2.jpg" },
    { name: "third", img: "images/ice-2.jpg" },
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
      {/* <div className="parent">
      <div className="first">
      <img className= "Image" src="images/ice-2.jpg" alt="" />
      </div>
      <div className="second">
      <img className= "Image" src="images/ice-1.jpg" alt="" />
      </div>
      <div className="third">
      <img className= "Image" src="images/ice-2.jpg" alt="" />
      </div>
    </div> */}
    </div>
  );
}
