import React from "react";
import MoveButton from "../components/MoveButton";
import style from "./MainPage.module.css";
import UserPageButton from "../components/UserPageButton";
import Previews from "../components/Previews";
import axios from "axios";
import Crop from "../components/Crop";
import { v4 as uuidv4 } from "uuid";
export default function Start(props) {
  const uuid = uuidv4();
  console.log(uuid);
  const uploadImg = () => {
    console.log(props);
    const data = {
      email: "test@naver.com",
      condition: "origin",
      uuid: uuid,
      // image: croppedImage,
    };
    axios
      .post("http://127.0.0.1:8000/api/v1/s3", data)
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

      <Previews />

      <MoveButton
        url1=""
        url2="/choicecartoon"
        style1="hidden w-12"
        style2="w-12"
        saveFuc={uploadImg}
      />
    </div>
  );
}
