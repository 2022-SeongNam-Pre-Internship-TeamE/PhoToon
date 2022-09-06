import React from "react";
import "./Slider.css";
// import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";

// export default function Slider() {
//   return (
//     <div className="slideBox">
//       <MDBCarousel showControls showIndicators dark fade>
//         <MDBCarouselItem
//           className="w-100"
//           itemId={1}
//           src="https://mdbootstrap.com/img/Photos/Slides/img%20(19).jpg"
//           alt="Slide1"
//         >
//           <h5>First slide label</h5>
//           <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
//         </MDBCarouselItem>
//         <MDBCarouselItem
//           className="w-100"
//           itemId={2}
//           src="https://mdbootstrap.com/img/Photos/Slides/img%20(35).jpg"
//           alt="Slide2"
//         >
//           <h5>Second slide label</h5>
//           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//         </MDBCarouselItem>

//         <MDBCarouselItem
//           className="w-100 d-block"
//           itemId={3}
//           src="https://mdbootstrap.com/img/Photos/Slides/img%20(40).jpg"
//           alt="Slide3"
//         >
//           <h5>Third slide label</h5>
//           <p>
//             Praesent commodo cursus magna, vel scelerisque nisl consectetur.
//           </p>
//         </MDBCarouselItem>
//       </MDBCarousel>
//     </div>
//   );
// }

export default function Slider() {
  return (
    <div className="slider">
      <div className="icon-cards mt-3">
        <div className="icon-cards__content">
          <div className="icon-cards__item">
            <span>🙂</span>
          </div>
          <div className="icon-cards__item">
            <span>😊</span>
          </div>
          <div className="icon-cards__item">
            <span>😀</span>
          </div>
        </div>
      </div>
    </div>
  );
}
