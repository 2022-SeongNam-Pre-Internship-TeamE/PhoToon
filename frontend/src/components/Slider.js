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
              <Slide img="images/ice-1.jpg" />
              <div className="txt">1. 사진 업로드</div>
            </span>
          </div>
          <div className="icon-cards__item">
            <span>
              <Slide img="images/ice-2.jpg" />
              <div className="txt">2. 옵션 선택</div>
            </span>
          </div>
          <div className="icon-cards__item">
            <span>
              <Slide img="images/background.jpg" />
              <div className="txt">3. 만화 변환</div>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
