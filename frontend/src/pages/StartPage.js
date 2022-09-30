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
import "../components/SpeechBubbleModal.css";

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
  const [checkButton, setCheckButton] = useState([]);
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

  //console.log(uuid);

  const uploadImg = () => {
    const tensor = tf.browser.fromPixels(croppedImage).asType("float32");
    const values = tensor.dataSync();
    const arr = Array.from(values);

    // 다음 페이지로 값 전달
    // let style = 3;
    // let background = 3;
    let email = sessionStorage.getItem("email");
    //localStorage.setItem('email',email)
    sessionStorage.setItem("uuid", uuid);
    sessionStorage.setItem("text", text);
    // localStorage.setItem('style',style);
    // localStorage.setItem('background',background);
    //#######################

    const s3data = {
      email: email,
      condition: "origin",
      uuid: uuid,
      image: arr,
      shape: tensor.shape,
      text: text,
    };

    const originsdata = {
      user_id: sessionStorage.getItem("user_id"),
      image_url:
        process.env.REACT_APP_IMAGE_URL + email + "/origin/" + uuid + ".jpg",
      uuid: uuid,
    };

    console.log("유저 id:", sessionStorage.getItem("user_id"));

    axios
      .post("http://127.0.0.1:8000/api/v1/s3", s3data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .post("http://127.0.0.1:8000/api/v1/origins/", originsdata)
      .then(function (response) {
        console.log(response);
        sessionStorage.setItem("origin_id", response.data.origin_id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const changeHandler = (checked, id) => {
    if (checked) {
      setCheckButton([...checkButton, id]);
      console.log("체크");
    } else {
      setCheckButton(checkButton.filter((button) => button !== id));
      console.log("체크박스 해제");
    }
  };
  const isChecked = checkButton.length === 1;
  const disabled = !isChecked;
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
              {image_url && croppedImage && (
                <img className="cropped-image" src={image_url} alt="cropped" />
              )}
              {image_url && croppedImage && (
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
          <div className="Main pr-3">
            <input
              type="button"
              value="말풍선 추가"
              className="block m-auto w-32 h-12 border-4 rounded-3xl text-white font-semibold"
              onClick={() => setSpeechBubble(!speechBubble)}
              style={{
                backgroundColor: "rgb(213,190,198)",
                borderColor: "rgb(213,190,198)",
                fontFamily: "font",
              }}
            />
            {speechBubble && (
              <SpeechBubbleModal
                closeModal={() => setSpeechBubble(!speechBubble)}
              >
                <form>
                  <div className="modalFormDiv">
                    <label htmlFor="choice" className="chk_box">
                      <input
                        type="checkbox"
                        id="choice"
                        name="choice"
                        onChange={(e) => {
                          changeHandler(e.currentTarget.checked, "check");
                        }}
                        checked={checkButton.includes("check") ? true : false}
                      />
                      <span className="on"></span>
                      말풍선 추가
                    </label>
                    <br />
                    <label htmlFor="speech" className="text-xl pb-2">
                      말풍선에 넣을 텍스트를 입력하세요
                    </label>
                    <br />
                    <input
                      type="text"
                      id="speech"
                      name="speech"
                      value={text}
                      onChange={onChange}
                      required
                      disabled={disabled}
                      style={
                        disabled
                          ? { backgroundColor: "rgb(146, 142, 142, 0.698)" }
                          : { backgroundColor: "rgb(253, 221, 200)" }
                      }
                      className="w-10/12 h-44 text-black text-center"
                    />
                    <br />
                    <button onClick={onReset}>초기화</button>
                    {/* <div className="block m-auto">{text}</div> */}
                  </div>
                </form>
              </SpeechBubbleModal>
            )}
          </div>

          <div>
            <input
              type="button"
              value="DELETE"
              className="block m-auto w-32 h-12 border-4 rounded-3xl text-white font-semibold"
              onClick={cancelImage}
              style={{
                backgroundColor: "rgb(213,190,198)",
                borderColor: "rgb(213,190,198)",
                fontFamily: "font",
              }}
            />
          </div>
        </div>
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
