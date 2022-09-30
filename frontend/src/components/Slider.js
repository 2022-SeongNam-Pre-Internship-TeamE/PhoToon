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
              <Slide img="images/guide1.gif" />
              <div className="txt">1. 사진 업로드하기</div>
            </span>
          </div>
          <div className="icon-cards__item">
            <span>
              <Slide img="images/guide2.gif" />
              <div className="txt">2. 말풍선 추가하기</div>
            </span>
          </div>
          <div className="icon-cards__item">
            <span>
              <Slide img="images/guide3.gif" />
              <div className="txt">3. 옵션 선택하기</div>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
