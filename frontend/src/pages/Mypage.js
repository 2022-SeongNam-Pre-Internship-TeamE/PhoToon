import MypageModal from '../components/MypageModal';
import React from "react";
import style from "./MainPage.module.css";

export default function  Mypage() {
      const [modalShow, setModalShow] = React.useState(false);
    
      return (
        <>
        <div className={`${style.box1}`}>
        <img className={`${style.logo}`} src="images/logo.png" alt="logo" />
      </div>
          <div  onClick={() => setModalShow(true)}>
                {/* 임시로 모달창 넘어가는 이미지 삽입하였음. */}
          <h2 style= {{textAlign : 'center' , marginTop : '90px'}}>아래 로고 클릭해서 모달 창 열기, 추후 이미지 받아오면 onClick 설정</h2>
          <img className={`${style.logo}`} src="images/logo.png" alt="logo" />
          </div>
    
          <MypageModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </>
      );
    }