import React, { useState } from "react";
import style from "./MainPage.module.css";
import axios from "axios";

// import { Link } from "react-router-dom";
function Test() {
    const [text, setText] = useState([]);
  return (
    <>
      <div className={`${style.box1}`}>
        <img className={`${style.logo1}`} src="images/logo.png" alt="logo" />
      </div>
      <h1>REST API 연습</h1>
      <div>
        <button text = "보내기"
          onClick={() => {
            const data = {
                "created_at" : "22",
                "email" : "test@naver.com",
                "style" : "1",
                // "origin_image" : origin_image, // 원본이미지 넘겨주기
                "background" : "1"
              };
            axios
              .post("http://127.0.0.1:8000/api/v1/style_transfer", data
              )
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
          }}
        >
          POST
        </button>
        <div>
        <div>
        <button text = "받기"
          onClick={() => {
            axios
              .get("http://127.0.0.1:8000/api/v1/speech-bubbles")
              .then((response) => {
                setText([...response.data]);
                console.log(response.data);
              })
              .catch(function (error) {
                console.log(error);
              });
          }}
        >
          GET
        </button>
        </div>
        </div>
      </div>
      {text.map((e) => (
        <div>
          {" "}
          <div>
            <span>
            {e.email}, {e.password}
            </span>
            {/* <button
              className="btn-delete"
              onClick={() => {
                axios.delete(`http://127.0.0.1:8000/join/${e.id}`);
                setText(text.filter((text) => text.id !== e.id));
              }}
            >
              DELETE
            </button>{" "} */}
          </div>
        </div>
      ))}
    </>
  );
}

export default Test;