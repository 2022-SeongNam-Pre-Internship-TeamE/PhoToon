import React, { useEffect, useState } from "react";
import MoveButton from "../components/MoveButton";
import style from "./MainPage.module.css";
import UserPageButton from "../components/UserPageButton";
import Share from "../components/ShareKakao.js";
import axios from "axios";
import Loading from "../components/Loading";
export default function Result() {
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [image_url,setImageUrl] = useState();
  
  console.log(image_url);
  
  useEffect( () => {
    
    let uuid = sessionStorage.getItem('uuid');
    let text = sessionStorage.getItem('text');
    let style = sessionStorage.getItem('style');
    let background = sessionStorage.getItem('background');
    let email = sessionStorage.getItem('email');
    let user_id = sessionStorage.getItem('user_id');
    let origin_id = sessionStorage.getItem('origin_id');

    const formData = new FormData()
    formData.append('style', style)
    formData.append('background', background)
    formData.append('user_id', user_id)
    formData.append('origin_id', origin_id)
    formData.append('image_url', image_url)
    formData.append('uuid',uuid)

    const data = {
      email: email,
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
        setIsLoading(false);
        setImageUrl(sessionStorage.getItem("image_url"));
        // formData.append('is_converted',response.data.is_converted);

        // axios
        //   .post('http://127.0.0.1:8000/api/v1/results/', formData,
        //   )
        //   .then(response => {
        //     // Handle success.
        //     console.log('만화 선택 옵션', response.data.style);
        //     console.log('배경 선택 옵션', response.data.background);
            
        //   })
        //   .catch(error => {
        //     // Handle error.
        //     console.log('An error occurred:', error.response);
        //   });
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get("http://127.0.0.1:8000/api/v1/style_transfer")
      .then(function (response) {
        console.log("결과 이미지!!!!!!")
        console.log(response.data);
      })
      .catch(function (error) {
        console.log("이런 피자!");
      });

    axios
      .get("http://127.0.0.1:8000/api/v1/results")
      .then(function (response) {
        setResult(response.data.results);
        console.log("만세");
        console.log(response.data);
        console.log(response.data.results);
        
        console.log(setResult);
      })
      .catch(function (error) {
        console.log(error);
      });

  }, []);
  return (
    <>
      {isLoading ?(
      <> 
      <Loading /> 
      <div className="min-h-screen">
        <div className="flex">
          <div className={`${style.box1}`}>
            <img
              className={`${style.logo2}`}
              src="images/logo.png"
              alt="logo"
            />
          </div>
          <UserPageButton className="float-left" />
        </div>
        <div
          className="text"
          style={{
            marginBottom: "30px",
            fontFamily: "font",
          }}
        >
          결과 이미지
        </div>
        </div>
        </>) :( <div className="min-h-screen">
        <div className="flex">
          <div className={`${style.box1}`}>
            <img
              className={`${style.logo2}`}
              src="images/logo.png"
              alt="logo"
            />
          </div>
          <UserPageButton className="float-left" />
        </div>
        <div
          className="text"
          style={{
            marginBottom: "30px",
            fontFamily: "font",
          }}
        >
          결과 이미지
        </div>
     
        <div
          className="block w-4/12 box-content p-3 border-0 m-auto rounded-2xl text-center mt-2"
          style={{ backgroundColor: "rgb(249,248,250)" }}
        >
          <div className="inline-block h-4/6 box-content justify-center items-center mt-3 mb-1">
            <img
              src={image_url}
              alt="결과 이미지"
              className="block m-auto w-10/12 border-1 border-dashed border-black rounded-2xl"
            />
          </div>
          <div className="flex w-10/12 m-auto justify-end">
            <a href={image_url} download>
              <button
                className="flex w-36 h-full rounded-3xl mr-2 hover:"
                style={{
                  backgroundColor: "rgb(213,190,198)",
                  borderColor: "rgb(213,190,198)",
                }}
              >
                <span className="flex leading-6 m-auto">
                  <img
                    src="images/download.svg"
                    alt="download"
                    className="w-7"
                  />
                  <span className="items-center text-white text-xl font-medium leading-9">
                    Download
                  </span>
                </span>
              </button>
            </a>
            <Share resultImage={image_url}></Share>
          </div>
        </div>

        <MoveButton
          url1="/background"
          url2=""
          style1="w-12"
          style2="hidden w-12"
        />
      </div>)
      
   } </>
      
  );
}
