import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import MoveButton from "../components/MoveButton";
import axios from "axios";
import Loading from "./Loading";
// import axios from "../api/axios";

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 10,
  // marginRight: 8,
  width: 400,
  height: 400,
  // padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
  width: 400,
  height: 400,
};

const img = {
  display: "block",
  width: "100%",
  height: "100%",
  borderRadius: 5,
  backgroundSize: "cover",
};

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

export default function Previews(props) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const cancelImage = () => {
    setFiles([]);
  };
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      console.log("accepted", acceptedFiles);
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const style = React.useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img alt="selected" src={file.preview} style={img} />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const nextClick = () => {
    setLoading(true);
    // const formData = new FormData();
    // console.log(formData);

    // formData.append("file", files);
    console.log(files);
    axios
      .post(
        "https://11d74a00-b751-44b7-b3f8-86ffa25ecbc3.mock.pstmn.io/testapi/start",
        files
      )
      .then(function (response) {
        console.log(response);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  console.log(files);
  return (
    <>
      <div className="block w-4/12 h-1/12 box-content p-4 m-auto border-0 rounded-2xl bg-gray-50 text-center">
        <div className="text-center text-2xl pt-1 pb-2">사진을 선택하세요.</div>

        <div>
          {files.length > 0 ? (
            <>
              <div className="flex justify-center flex-column items-center">
                {thumbs}
              </div>

              <div className="flex w-4/5 m-auto justify-end">
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
            </>
          ) : (
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
          )}
        </div>
      </div>
      {/* <MoveButton
        url1=""
        url2="/choicecartoon"
        style1="hidden w-12"
        style2="w-12"
      /> */}
      {loading ? <Loading /> : null}
      <button onClick={nextClick}>send</button>
    </>
  );
}
