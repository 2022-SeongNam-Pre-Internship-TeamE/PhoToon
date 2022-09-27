import MypageModal from "../components/MypageModal";
import React, { useEffect, useState } from "react";
import style from "./MainPage.module.css";
import axios from "axios";

export default function Mypage() {
  const [modalShow, setModalShow] = React.useState(false);
  const [userAiImage, setuserAiImage] = useState(["images/ice-2.jpg"]);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   axios
  //     .get("http://127.0.0.1:8000/api/v1/results")
  //     .then(function (response) {
  //       setuserAiImage(response.data.results);
  //       console.log(response.data);
  //       console.log(response.data.results);
  //       setIsLoading(false);
  //       console.log(setuserAiImage);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }, []);
  return (
    <div className="min-h-screen">
      <div className={`${style.box1}`}>
        <img className={`${style.logo1}`} src="images/logo.png" alt="logo" />
      </div>
      {userAiImage &&
        userAiImage.map((img) => (
          <>
            <div className={`${style.imageListComponent}`}>
              <div className="g grid grid-cols-3 gap-16">
                <div key={img.user_id}>
                  <img
                    className="block m-auto w-full rounded-xl render"
                    src={img}
                    alt="AiImage"
                    onClick={() => setModalShow(true)}
                  />
                </div>
              </div>
            </div>

            <MypageModal show={modalShow} onHide={() => setModalShow(false)} />
          </>
        ))}
    </div>
  );
}
