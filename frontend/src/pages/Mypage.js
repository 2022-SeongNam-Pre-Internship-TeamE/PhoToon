import MypageModal from "../components/MypageModal";
import React from "react";
import style from "./MainPage.module.css";
import axios from "axios";

export default function Mypage() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <div className="min-h-screen">
      <div className={`${style.box1}`}>
        <img className={`${style.logo1}`} src="images/logo.png" alt="logo" />
      </div>
      {/* <div onClick={() => setModalShow(true)}> */}
      {/* 임시로 모달창 넘어가는 이미지 삽입하였음. */}
      {/* <h2 style={{ textAlign: "center", marginTop: "90px" }}>
          아래 로고 클릭해서 모달 창 열기, 추후 이미지 받아오면 onClick 설정
        </h2>
        <img className={`${style.logo}`} src="images/logo.png" alt="logo" /> */}
      <div className={`${style.imageListComponent}`}>
        <div className="g grid grid-cols-3 gap-16">
          <img
            className="block m-auto w-full"
            src="images/ice-2.jpg"
            alt="logo"
            onClick={() => setModalShow(true)}
          />
          <img
            className="block m-auto w-full"
            src="images/ice-2.jpg"
            alt="logo"
            onClick={() => setModalShow(true)}
          />
          <img
            className="block m-auto w-full"
            src="images/ice-2.jpg"
            alt="logo"
            onClick={() => setModalShow(true)}
          />
          <img
            className="block m-auto w-full"
            src="images/ice-2.jpg"
            alt="logo"
            onClick={() => setModalShow(true)}
          />
        </div>
      </div>
      {/* </div> */}

      <MypageModal show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
}
