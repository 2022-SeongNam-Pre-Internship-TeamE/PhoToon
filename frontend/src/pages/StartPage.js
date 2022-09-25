import React, { useCallback, useState } from "react";
import MoveButton from "../components/MoveButton";
import style from "./MainPage.module.css";
import UserPageButton from "../components/UserPageButton";
import Slider from "@material-ui/core/Slider";
import Cropper from "react-easy-crop";
import getCroppedImg from "../components/getCroppedImg";
import Dropzone from "../components/Dropzone";
import axios from "axios";
import "../components/Crop.css";
import { v4 as uuidv4 } from "uuid";
import * as tf from "@tensorflow/tfjs";
import { getThemeProps } from "@material-ui/styles";
import SpeechBubbleModal from "../components/SpeechBubbleModal";

export default function Start() {
  const [image, setImage] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [text, setText] = useState("");
  const [image_url, setURLImage] = useState(null);
  const uuid = uuidv4();
  const [speechBubble, setSpeechBubble] = useState(false);
  const [inputs, setInputs] = useState({ speech: "" });
  const { speech } = inputs;
  const onChange = (e) => {
    console.log(e.target);
    console.log(e.target.value);
    setText(e.target.value);
  };
  const onReset = () => {
    setText("");
  };

  const cancelImage = () => {
    setImage("");
    setCroppedImage(null);
  };
  const onChangeImage = (uploadedImage) => {
    setImage(URL.createObjectURL(uploadedImage));
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        image,
        croppedAreaPixels,
        rotation
      );
      console.log("donee", { croppedImage });

      let w = croppedImage.width;
      let h = croppedImage.height;
      let canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      let ctx = canvas.getContext("2d");
      ctx.putImageData(croppedImage, 0, 0);
      setURLImage(canvas.toDataURL());

      setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation, image]);

  const onClose = useCallback(() => {
    setCroppedImage(null);
  }, []);

  console.log(uuid);
  const uploadImg = () => {
    console.log(croppedImage);

    const tensor = tf.browser.fromPixels(croppedImage).asType("float32");
    const values = tensor.dataSync();
    const arr = Array.from(values);

    const data = {
      email: "test@naver.com",
      condition: "origin",
      uuid: uuid,
      image: arr,
      shape: tensor.shape,
      text: text,
    };

    axios
      .post("http://127.0.0.1:8000/api/v1/s3", data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen">
      <div className="flex">
        <div className={`${style.box1}`}>
          <img className={`${style.logo2}`} src="images/logo.png" alt="logo" />
        </div>
        <UserPageButton className="float-left" />
      </div>
      <div
        className="text"
        style={{
          marginBottom: "30px",
          fontFamily: "font",
        }}
      >
        이미지를 선택하세요.
      </div>
      <div className="block w-4/12 box-content p-4 m-auto border-0 rounded-2xl bg-gray-50 text-center">
        {/* <div className="text-center text-2xl pt-1 pb-2">사진을 선택하세요.</div> */}
        {image ? (
          <div
            style={{
              width: "100%",
              display: "block",
              margin: "auto",
            }}
          >
            <div
              className="container"
              style={{
                display:
                  image === null || croppedImage !== null ? "none" : "block",
              }}
            >
              <div className="crop-container">
                <Cropper
                  image={image}
                  crop={crop}
                  rotation={rotation}
                  zoom={zoom}
                  zoomSpeed={4}
                  maxZoom={3}
                  zoomWithScroll={true}
                  showGrid={true}
                  aspect={3 / 3}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                  onRotationChange={setRotation}
                />
              </div>
              <div className="controls">
                <label className="label">
                  Rotate
                  <Slider
                    value={rotation}
                    min={0}
                    max={360}
                    step={1}
                    aria-labelledby="rotate"
                    onChange={(e, rotation) => setRotation(rotation)}
                    className="range"
                  />
                </label>
                <label className="label">
                  Zoom
                  <Slider
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    aria-labelledby="zoom"
                    onChange={(e, zoom) => setZoom(zoom)}
                    className="range"
                  />
                </label>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                className="cropButton"
                style={{
                  display:
                    image === null || croppedImage !== null ? "none" : "block",
                }}
                onClick={showCroppedImage}
              >
                Crop
              </button>
            </div>

            <div className="cropped-image-container">
              {image_url && (
                <img className="cropped-image" src={image_url} alt="cropped" />
              )}
              {croppedImage && (
                <div className="flex justify-center">
                  <button onClick={onClose} className="cropButton">
                    <p className="block m-auto">CANCEL</p>
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="inline-block w-11/12 justify-center items-center">
            <Dropzone onChangeImage={onChangeImage} />
          </div>
        )}
        <div className="flex w-11/12 m-auto justify-end">
          <button
            className="flex float-right w-28 border-2 rounded-3xl "
            style={{
              backgroundColor: "rgb(213,190,198)",
              borderColor: "rgb(213,190,198)",
            }}
            onClick={cancelImage}
          >
            <img src="images/delete.svg" alt="delete" className="w-9" />
            <span className="items-center text-white text-xl font-medium leading-9">
              Delete
            </span>
          </button>
        </div>
      </div>

      <div className="Main">
        <input
          type="button"
          value="말풍선"
          className="blueBtn"
          onClick={() => setSpeechBubble(!speechBubble)}
        />
        {speechBubble && (
          <SpeechBubbleModal closeModal={() => setSpeechBubble(!speechBubble)}>
            {/* <div className="flex flex-column justify-center">
              <input onChange={onChange} value={text} className="w-1/3" />
              <button onClick={onReset}>초기화</button>

              <div className="block m-auto">{text}</div>
            </div> */}
            <form>
              <div className="modalFormDiv">
                <label htmlFor="choice">선택</label>
                <input type="radio" id="choice" name="choice" />
                <label htmlFor="speech">말풍선</label>
                <input
                  type="text"
                  id="speech"
                  name="speech"
                  value={text}
                  onChange={onChange}
                  required
                />
                <button onClick={onReset}>초기화</button>
                <div className="block m-auto">{text}</div>
              </div>
            </form>
          </SpeechBubbleModal>
        )}
      </div>
      <MoveButton
        url1=""
        url2="/choicecartoon"
        style1="hidden w-12"
        style2="w-12"
        saveFuc={uploadImg}
      />
    </div>
  );
}
