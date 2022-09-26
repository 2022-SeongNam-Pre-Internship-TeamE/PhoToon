import React, { useState } from "react";
import "./Options.css";
import MoveButton from "../components/MoveButton";
import { useSelectContentStore } from "../components/store";
import axios from 'axios';


export default function CartoonOptions() {

  const { style , background , setBackground} = useSelectContentStore(); //zustand 전역변수

  const backgroundsKind = [
    { name: 1, img: "images/ice-2.jpg" },
    { name: 2, img: "images/ice-2.jpg" },
    { name: 3, img: "images/ice-2.jpg" },
  ];
  
  const handleClickRadioButton = (e) => {
    console.log()
    console.log(e.target.value);
    setBackground(e.target.value);
  };
  
  const formData = new FormData()
  formData.append('style', style)
  formData.append('background', 'background')
  

  const options = () => {
    
    axios.post('http://127.0.0.1:8000/api/v1/results/', formData, 
    )
    

  .then(response => {
    // Handle success.
    console.log('만화 선택 옵션', response.data.style);
    console.log('배경 선택 옵션', response.data.background);
  })
  .catch(error => {
    // Handle error.
    console.log('An error occurred:', error.response);
  });
    }

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
              checked={background === `${kind.name}`}
              onChange={handleClickRadioButton}
            />
            <img src={kind.img} className="Image" alt="배경분리" />
          </label>
        ))}
      </div>
      <button onClick={() => {
        options();
        }}>asdfasdfafs</button>
        
        

    </div>
  );
}