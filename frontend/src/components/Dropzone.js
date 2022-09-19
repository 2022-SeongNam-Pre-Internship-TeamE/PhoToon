import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function Dropzone({ onChangeImage }) {
  const onDrop = useCallback(
    (files) => {
      onChangeImage(files[0]);
    },
    [onChangeImage]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <div className="inline-block w-9/12 h-36 box-content p-4 border-3 border-dashed border-red-400 rounded-2xl bg-gray justify-center items-center my-2">
          <label
            htmlFor="dropzone-file"
            className="cursor-pointer block w-full h-36 m-auto my-4"
          >
            <div className="flex justify-center flex-column items-center">
              <img
                src="images/imageupload.svg"
                alt="파일 아이콘"
                className="block w-14 m-auto"
              />
              <p className="mb-0">Drop the files here</p>
            </div>
          </label>
        </div>
      ) : (
        <div className="inline-block w-9/12 h-36 box-content p-4 border-1 border-dashed border-black rounded-2xl bg-white justify-center items-center my-2">
          <label
            htmlFor="dropzone-file"
            className="cursor-pointer block w-full h-36 m-auto my-4"
          >
            <div className="flex justify-center flex-column items-center">
              <img
                src="images/imageupload.svg"
                alt="파일 아이콘"
                className="block w-14 m-auto"
              />
              <p className="mb-0">
                Drag-drop some files here, or click to select files
              </p>
            </div>
          </label>
        </div>
      )}
    </div>
  );
}

export default Dropzone;
