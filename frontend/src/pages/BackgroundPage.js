import React from "react";
import MoveButton from "../components/MoveButton";
import UserPageButton from "../components/UserPageButton";
import style from "./MainPage.module.css";
import CartoonOptions from "../components/BackgroundOptions";
import axios from "axios";

export default function Background() {
  console.log("드래곤 볼 맨2");
  if(localStorage.getItem('uuid')){
    console.log(localStorage.getItem('uuid'));
    console.log(localStorage.getItem('text'));
    console.log(localStorage.getItem('style'));
    console.log(localStorage.getItem('background'));
  }
  
  const uploadImg = () => {
    let uuid = localStorage.getItem('uuid');
    let text = localStorage.getItem('text');
    let style = localStorage.getItem('style');
    let background = localStorage.getItem('background')

    
    const data = {
      email: "test@naver.com",
      condition: "origin",
      uuid: uuid,
      text: text,
      style: style,
      background : background,

    };

    axios
      .post("http://127.0.0.1:8000/api/v1/style_transfer", data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  return (
    <div className="min-h-screen">
      <div className="flex">
        <div className={`${style.box1}`}>
          <img className={`${style.logo2}`} src="images/logo.png" alt="logo" />
        </div>
        <UserPageButton className="float-left" />
      </div>
      <CartoonOptions></CartoonOptions>
      <MoveButton
        url1="/choicecartoon"
        url2="/result"
        style1="w-12"
        style2="w-12"
        saveFuc={uploadImg}
      />
    </div>
  );
}
