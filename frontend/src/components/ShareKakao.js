import React, { useEffect, useRef } from "react";

function ShareKakao({ resultImage }) {
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
  console.log(resultImage);
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
          THU: resultImage,
        },
      });
    }
  }

  return (
    <button
      className="flex w-28 border-2 rounded-3xl"
      style={{
        backgroundColor: "rgb(213,190,198)",
        borderColor: "rgb(213,190,198)",
      }}
      onClick={shareButton}
    >
      <span className="flex leading-6 m-auto">
        <img src="images/share.svg" alt="share" className="w-5 mr-2" />
        <span className="items-center text-white text-xl font-medium leading-9">
          Share
        </span>
      </span>
    </button>
  );
}
export default ShareKakao;
