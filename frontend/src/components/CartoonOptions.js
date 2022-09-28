import React, { useState } from "react";
import "./Options.css";

// cartoon setCartoon
export default function CartoonOptions() {
  const [style, setStyle] = useState([]);
  const cartoonsKind = [
    // { name: "first", img: "images/abstract01.jpg" },
    // { name: "second", img: "images/abstract02.jpg" },
    // { name: "third", img: "images/abstract03.jpg" },
    { name: "1", img: "https://blog.kakaocdn.net/dn/oceId/btqGTmnLwEC/tWzFt9JlkoewioLfaBYNgk/img.gif" },
    { name: "2", img: "https://w.namu.la/s/327d9ac76a332599efb7b70990c8df329d37813b04a068fc29fa2b98f5d7797725d51ba8432d061fa91bde6a2271577e8b6b0ec0111f911dd44ab92c9c643e201a722fca83b07cf82f053372d4de6638e85de9ae1c6df71f7e2699576f1969d4" },
    { name: "3", img: "https://media0.giphy.com/media/m9WuRdIwtf9QnT8pL8/giphy.gif" },
  ];

  const handleClickRadioButton = (e) => {
    console.log(e.target.value);
    setStyle(e.target.value);
    localStorage.setItem('style',e.target.value);
  };

  console.log("드래곤");
  if(localStorage.getItem('uuid')){
    console.log(localStorage.getItem('email'));
    console.log(localStorage.getItem('uuid'));
    console.log(localStorage.getItem('text'));
    console.log(localStorage.getItem('style'));
    console.log(localStorage.getItem('background'));
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

        {/* 원래 빠져 있는 것
        <div className="first">
          <img className="Image" src="images/abstract01.jpg" alt="" />
        </div>
        <div className="second">
          <img className="Image" src="images/abstract02.jpg" alt="" />
        </div>
        <div className="third">
          <img className="Image" src="images/abstract03.jpg" alt="" />
        </div>
        ############## */}
      </div>
      
      
      {/* <div className="parent">
        <div class="container">
          
          <div class="row">
          {cartoonsKind.map((kind) => (
            <div class="col-sm-6 col-md-4 col-lg-4">

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
            
            </div>
          ))}
          </div>
        </div>

      </div> */}
    </div>
    
  );
}
