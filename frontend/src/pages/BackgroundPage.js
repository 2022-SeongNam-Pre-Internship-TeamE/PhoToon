import React from "react";
import MoveButton from "../components/MoveButton";
import UserPageButton from "../components/UserPageButton";
import style from "./MainPage.module.css";
import BackgroundOptions from "../components/BackgroundOptions";
import axios from "axios";

export default function Background() {
  console.log("드래곤 볼 맨2");
  if(sessionStorage.getItem('uuid')){
    console.log(sessionStorage.getItem('uuid'));
    console.log(sessionStorage.getItem('text'));
    console.log(sessionStorage.getItem('style'));
    console.log(sessionStorage.getItem('background'));
  }
  
  const uploadImg = () => {
    let uuid = sessionStorage.getItem('uuid');
    let text = sessionStorage.getItem('text');
    let style = sessionStorage.getItem('style');
    let background = sessionStorage.getItem('background');
    let email = sessionStorage.getItem('email');
    let user_id = sessionStorage.getItem('user_id');
    let origin_id = sessionStorage.getItem('origin_id');


    let image_url = 'https://photoon-bucket.s3.ap-northeast-2.amazonaws.com/'+email+'/result/'+uuid+'.jpg';
    sessionStorage.setItem('image_url',image_url);

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

    // axios
    //   .post("http://127.0.0.1:8000/api/v1/style_transfer", data)
    //   .then(function (response) {
    //     console.log(response);
    //     formData.append('is_converted',response.data.is_converted)
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    // try{
    //   const response = await axios.post("http://127.0.0.1:8000/api/v1/style_transfer",data);
      
    //   console.log(response)
    //   formData.append('is_converted',response.data.is_converted)
    // }catch (e) {
    //   console.log(e);
    // }
    

    axios
      .post('http://127.0.0.1:8000/api/v1/results/', formData,
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

  };


  return (
    <div className="min-h-screen">
      <div className="flex">
        <div className={`${style.box1}`}>
          <img className={`${style.logo2}`} src="images/logo.png" alt="logo" />
        </div>
        <UserPageButton className="float-left" />
      </div>
      <BackgroundOptions></BackgroundOptions>
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
