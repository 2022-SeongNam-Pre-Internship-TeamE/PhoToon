import React from "react";
import "./Slider.css";
import Slide from "./Slide";
export default function Slider() {
  return (
    <div className="slider">
      <div className="icon-cards mt-3">
        <div className="icon-cards__content">
          <div className="icon-cards__item">
            <span>
              <Slide img="images/earth.gif" />
              <div className="txt">1. 사진 업로드하기</div>
            </span>
          </div>
          <div className="icon-cards__item">
            <span>
              <Slide img="images/gif2.gif" />
              <div className="txt">2. 옵션 선택하기</div>
            </span>
          </div>
          <div className="icon-cards__item">
            <span>
              <Slide img="images/gif3.gif" />
              <div className="txt">3. 만화 변환 처리</div>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
