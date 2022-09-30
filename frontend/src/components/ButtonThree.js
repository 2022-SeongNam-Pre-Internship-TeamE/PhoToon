import React, { useEffect, useRef } from "react";
import "./MainButton.css";
import {
  AiOutlineDownload,
  AiOutlineShareAlt,
  AiOutlineDelete,
} from "react-icons/ai";

function ButtonThree({ text, deleteFun }) {
  const isShare = useRef(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.min.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  function shareButton() {
    if (window.Kakao) {
      const kakao = window.Kakao;
      if (!isShare.current) {
        kakao.init(process.env.REACT_APP_KAKAO_KEY);
        isShare.current = true;
      }
      kakao.Link.sendCustom({
        templateId: 83338,
        templateArgs: {
          THU: "images/ice-1.jpg",
        },
      });
    }
  }
  const onRemove = (imgId) => {
    deleteFun(imgId);
  };
  return (
    <div className="parent">
      {" "}
      <a
        href="images/ice-1.jpg"
        className="Modalfirst modal-button button button--saqui button--round-l button--text-thick"
        download
      >
        <button className="block m-auto">
          <p className="flex flex-row text-xl justify-center items-center">
            <AiOutlineDownload size="30" style={{ marginRight: "0.5rem" }} />
            Download
          </p>
        </button>
      </a>
      <button
        className="Modalsecond modal-button button button--saqui button--round-l button--text-thick"
        onClick={shareButton}
      >
        <p className="flex flex-row text-xl justify-center items-center">
          <AiOutlineShareAlt size="30" style={{ marginRight: "0.5rem" }} />
          Share
        </p>
      </button>
      <button
        className="Modalthird modal-button button button--saqui button--round-l button--text-thick"
        onClick={() => onRemove()}
      >
        <p className="flex flex-row text-xl justify-center items-center">
          <AiOutlineDelete size="30" style={{ marginRight: "0.5rem" }} />
          Delete
        </p>
      </button>
    </div>
  );
}

export default ButtonThree;
