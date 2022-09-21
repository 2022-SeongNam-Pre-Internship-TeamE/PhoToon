import { useCallback, useState } from "react";
import Slider from "@material-ui/core/Slider";
import Cropper from "react-easy-crop";
import getCroppedImg from "./getCroppedImg";
import "./Crop.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Start from "../pages/Start";
const Crop = ({ image }) => {
  const uuid = uuidv4();
  console.log(uuid);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

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
      setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation, image]);

  const onClose = useCallback(() => {
    setCroppedImage(null);
  }, []);

  // const uploadImg = () => {
  //   console.log(croppedImage);
  //   const data = {
  //     email: "test@naver.com",
  //     condition: "origin",
  //     uuid: uuid,
  //     // image: croppedImage,
  //   };
  //   axios
  //     .post("http://127.0.0.1:8000/api/v1/s3", data)
  //     .then(function (response) {
  //       console.log(response);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };
  <Start value={croppedImage} />;
  return (
    <div className="h-1/12">
      <div
        className="container"
        style={{
          display: image === null || croppedImage !== null ? "none" : "block",
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
            aspect={4 / 3}
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
            display: image === null || croppedImage !== null ? "none" : "block",
          }}
          onClick={showCroppedImage}
        >
          Crop
        </button>
      </div>

      <div className="cropped-image-container">
        {croppedImage && (
          <img className="cropped-image" src={croppedImage} alt="cropped" />
        )}
        {croppedImage && (
          <div className="flex justify-center">
            <button onClick={onClose} className="cropButton">
              <p className="block m-auto">CANCEL</p>
            </button>
          </div>
        )}
      </div>
      {/* <button onClick={uploadImg}>send</button> */}
    </div>
  );
};

export default Crop;
