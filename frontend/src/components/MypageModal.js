import React, { useEffect, useState } from "react";
import ButtonThree from "../components/ButtonThree";
import Modal from "react-bootstrap/Modal";
import Slide from "./Slide";
import axios from "axios";

function MypageModal(props) {
  // const deleteImgList = (imgId) => {
  //   setUserImageList(userImageList.filter((userImg) => userImg.id !== imgId));
  // axios
  //   .delete(``)
  //   .then(function (response) {
  //     console.log("delete");
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  // };
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{ fontFamily: "font" }}
      >
        <Modal.Header closeButton></Modal.Header>

        <Modal.Body>
          {/* <closeButton /> */}
          {/* 임시로 사진 넣음 */}
          <div style={{ textAlign: "center" }}>
            <img
              src={props.image}
              alt="마이페이지"
              className="block rounded-xl m-auto w-6/12"
            />
          </div>
          <ButtonThree></ButtonThree>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default MypageModal;
