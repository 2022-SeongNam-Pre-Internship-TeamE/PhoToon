import React, { useState } from "react";
import Dropzone from "./Dropzone";
import ImageCrop from "./Crop";

export default function Previews() {
  const [image, setImage] = useState("");
  const cancelImage = () => {
    setImage("");
  };
  const onChangeImage = (uploadedImage) => {
    setImage(URL.createObjectURL(uploadedImage));
  };
  return (
    <div className="block w-4/12 h-2/12 box-content p-4 m-auto border-0 rounded-2xl bg-gray-50 text-center">
      <div className="text-center text-2xl pt-1 pb-2">사진을 선택하세요.</div>
      {image ? (
        <ImageCrop image={image} />
      ) : (
        <Dropzone onChangeImage={onChangeImage} />
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
  );
}
