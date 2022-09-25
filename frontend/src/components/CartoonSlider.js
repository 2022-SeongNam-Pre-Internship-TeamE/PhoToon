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
          <div style={{marginTop:"50px",  }}>
            <img  src={`${baseUrl}/abstract0${i + 1}.jpg`} alt = "" />
          </div>
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
      
      <div style={{width:"300px", height:"300px" , margin:'0 auto', marginTop:"30px" }}>
        <Slider {...settings}>
          <div>
            <img src={baseUrl + "/abstract01.jpg"} alt = ""/>
          </div>
          <div>
            <img src={baseUrl + "/abstract02.jpg"} alt = ""/>
          </div>
          <div>
            <img src={baseUrl + "/abstract03.jpg"} alt = ""/>
          </div>
        </Slider>
      </div>
    );
  }
}