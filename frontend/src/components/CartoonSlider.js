import React, { Component } from "react";
import Slider from "react-slick";
import { baseUrl } from "./config";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default class CenterMode extends Component {
  render() {
    const settings = {
      customPaging: function(i) {
        return (
          <a>
            <img src={'${baseUrl}/abstract0${i + 1}.png'}  />
          </a>
        );
      },
      dots: true,
      dotsClass: "slick-dots slick-thumb",
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div>
        <Slider {...settings}>
          <div>
            <img src={baseUrl + "/abstract01.png"} />
          </div>
          <div>
            <img src={baseUrl + "/abstract02.png"} />
          </div>
          <div>
            <img src={baseUrl + "/abstract03.png"} />
          </div>
          <div>
            <img src={baseUrl + "/abstract04.png"} />
          </div>
        </Slider>
      </div>
    );
  }
}