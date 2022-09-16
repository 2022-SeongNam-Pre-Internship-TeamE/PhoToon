import { Button, makeStyles, Modal, Slider } from "@material-ui/core";
import React from "react";
import Cropper from "react-easy-crop";
import { ASPECT_RATIO, CROP_WIDTH } from "./Previews";
const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    width: 420,
    height: 500,
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    flexFlow: "column",
    borderRadius: "0px 0px 10px 10px",
    "& .crop-container": {
      height: 400,
      borderRadius: "10px 10px 0px 0px",
      backgroundColor: "#f4f7fb",
      position: "relative",
      "& .container": {},
      "& .crop-area": {
        border: "3px solid #00A0FF",
      },
      "& .media": {},
    },
    "& .controls": {
      height: 40,
      marginLeft: 50,
      marginRight: 50,
      display: "flex",
      alignItems: "center",
      marginTop: 10,
      "& .zoom-range": {
        color: "#00A0FF",
      },
    },
    "& .buttons": {
      height: 40,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginRight: 90,
      marginLeft: 90,
      marginBottom: 10,
      "& .close": {
        backgroundColor: "gray",
        color: "#fff",
      },
      "& .ok": {
        backgroundColor: "#00A0FF",
        color: "#fff",
      },
    },
  },
});
const CropperModal = ({
  crop,
  setCrop,
  onCropComplete,
  setZoom,
  zoom,
  open,
  onClose,
  imgSrc,
  showCroppedImage,
  onMediaLoaded,
  minZoom,
}) => {
  const classes = useStyles();
  return React.createElement(
    Modal,
    { open: open, onClose: onClose, className: classes.root },
    React.createElement(
      "div",
      { className: classes.modal },
      React.createElement(
        "div",
        { className: "crop-container" },
        React.createElement(
          "div",
          { className: "crop-space" },
          React.createElement(Cropper, {
            image: imgSrc,
            crop: crop,
            zoom: zoom,
            minZoom: minZoom,
            maxZoom: minZoom + 3,
            aspect: ASPECT_RATIO,
            onCropChange: setCrop,
            onCropComplete: onCropComplete,
            onZoomChange: setZoom,
            cropSize: {
              width: CROP_WIDTH,
              height: CROP_WIDTH / ASPECT_RATIO,
            },
            classes: {
              containerClassName: "container",
              cropAreaClassName: "crop-area",
              mediaClassName: "media",
            },
            onMediaLoaded: onMediaLoaded,
            showGrid: false,
          })
        )
      ),
      React.createElement(
        "div",
        { className: "controls" },
        React.createElement(Slider, {
          min: minZoom,
          value: zoom,
          max: minZoom + 5,
          step: 0.1,
          onChange: (e, value) => {
            if (typeof value === "number") {
              setZoom(value);
            }
          },
          className: "zoom-range",
        })
      ),
      React.createElement(
        "div",
        { className: "buttons" },
        React.createElement(
          Button,
          { className: "close", onClick: onClose },
          "Close"
        ),
        React.createElement(
          Button,
          {
            className: "ok",
            onClick: () => {
              onClose();
              showCroppedImage();
            },
          },
          "OK"
        )
      )
    )
  );
};
export default CropperModal;
