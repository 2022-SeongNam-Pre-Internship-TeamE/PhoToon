import React, { useRef, useState } from "react";
import MoveButton from "../components/MoveButton";
import style from "./MainPage.module.css";
import UserPageButton from "../components/UserPageButton";

export default function Start() {
  const fileInput = useRef();
  const [fileImage, setFileImage] = useState();
  return (
    <>
      <UserPageButton />
      <div className={`${style.box1}`} style={{ height: "10rem" }}>
        <img className={`${style.logo}`} src="images/logo.png" alt="logo" />
      </div>
      <div className="block w-6/12 h-72 box-content p-4 border-0 m-auto rounded-2xl bg-gray-50 text-center">
        <div className="text-center text-2xl py-2">사진을 선택하세요.</div>
        <div className="inline-block w-9/12 h-36 box-content p-4 border-1 border-dashed border-black rounded-2xl bg-white justify-center items-center my-2">
          {fileImage ? (
            <div className="w-1/2">
              <img
                className="w-full h-full"
                id="image"
                src={window.URL.createObjectURL(fileImage)}
                controls
              ></img>
            </div>
          ) : (
            <label
              htmlFor="dropzone-file"
              className="block w-9/12 h-36 m-auto my-4"
            >
              <div className="flex justify-center flex-column items-center">
                <img
                  src="images/imageupload.svg"
                  alt="파일 아이콘"
                  className="block w-14 m-auto"
                />
                <p className="mb-0">Drag files to upload</p>

                <input
                  id="dropzone-file"
                  className="cursor-pointer absolute w-2/4 h-48 block z-50 opacity-0 "
                  name="imageUpload"
                  type="file"
                  accept="image/*"
                />
              </div>
            </label>
          )}
        </div>
        <input
          ref={fileInput}
          className="hidden"
          name="imageUpload"
          type="file"
          accept="image/*"
        />
        <div>
          <button
            className="flex float-right w-28 border-2 rounded-3xl "
            style={{
              backgroundColor: "rgb(213,190,198)",
              borderColor: "rgb(213,190,198)",
            }}
          >
            <img src="images/delete.svg" alt="delete" className="w-9" />
            <span className="items-center text-white text-xl font-medium leading-9">
              Delete
            </span>
          </button>
        </div>
      </div>

      <MoveButton
        url1=""
        url2="/choicecartoon"
        style1="hidden w-12"
        style2="w-12"
      />
    </>
  );
}
