import React, { useEffect, useState } from "react";
import style from "./MainPage.module.css";
import axios from "axios";
import MypageModal from "../components/MypageModal";
import { render } from "react-dom";
import Modal from "react-bootstrap/Modal";
export default function Mypage() {
  const [modalShow, setModalShow] = React.useState(false);
  const [userAiImage, setuserAiImage] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/v1/results")
      .then(function (response) {
        setuserAiImage(response.data.results);
        console.log(response.data);
        console.log(response.data.results[0]);
        setIsLoading(false);
        console.log(setuserAiImage);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleShow = () => {
    setModalShow(true);
  };
  const handleClose = () => {
    setModalShow(false);
  };

  const handelClick = (e) => {
    setModalShow(true);
    console.log(e.target.src);
    setSelected(e.target.src);
    console.log(selected);
  };

  return (
    <div className="min-h-screen">
      <div className={`${style.box1}`}>
        <img className={`${style.logo1}`} src="images/logo.png" alt="logo" />
      </div>
      <div className={`${style.imageListComponent}`}>
        <div className="g grid grid-cols-3 gap-16">
          {userAiImage &&
            userAiImage.map((img) => (
              <div key={img.result_id}>
                <img
                  className="block m-auto w-8/12 rounded-xl render"
                  src={img.image_url}
                  alt="AiImage"
                  onClick={(e) => handelClick(e)}
                />

                <MypageModal
                  show={modalShow}
                  image={selected}
                  onHide={() => setModalShow(false)}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
