import React, { useEffect, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import CropperModal from "./CropperModal";
import { Button, makeStyles } from "@material-ui/core";
import getCroppedImg from "./getCroppedImg";
export const ASPECT_RATIO = 6 / 4;
export const CROP_WIDTH = 400;
const useStyles = makeStyles({
  root: {
    marginTop: 30,
    minWidth: "100%",
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    flexFlow: "column",
    "& .file-upload-container": {
      width: 500,
      marginTop: 10,
      "& .button": {
        backgroundColor: "",
        color: "white",
      },
    },
    "& .img-container": {
      marginTop: 40,
      width: `${CROP_WIDTH}px`,
      height: `${CROP_WIDTH / ASPECT_RATIO}px`,
      display: "flex",
      alinItems: "center",
      borderRadius: 5,
      border: "1px solid gray",
      overflow: "hidden",
      backgroundColor: "#EAEAEA",
      "& .img": {
        width: "100%",
        objectFit: "contain",
        backgroundColor: "#EAEAEA",
      },
      "& .no-img": {
        backgroundColor: "#EAEAEA",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#000",
      },
    },
  },
});

// const thumb = {
//   display: "inline-flex",
//   borderRadius: 2,
//   border: "1px solid #eaeaea",
//   marginBottom: 10,
//   // marginRight: 8,
//   width: 400,
//   height: 400,
//   // padding: 4,
//   boxSizing: "border-box",
// };

// const thumbInner = {
//   display: "flex",
//   minWidth: 0,
//   overflow: "hidden",
//   width: 400,
//   height: 400,
// };

// const img = {
//   display: "block",
//   width: "100%",
//   height: "100%",
//   borderRadius: 5,
//   backgroundSize: "cover",
// };

// const baseStyle = {
//   flex: 1,
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   padding: "20px",
//   borderWidth: 2,
//   borderRadius: 2,
//   borderColor: "#eeeeee",
//   borderStyle: "dashed",
//   backgroundColor: "#fafafa",
//   color: "#bdbdbd",
//   outline: "none",
//   transition: "border .24s ease-in-out",
// };

// const activeStyle = {
//   borderColor: "#2196f3",
// };

// const acceptStyle = {
//   borderColor: "#00e676",
// };

// const rejectStyle = {
//   borderColor: "#ff1744",
// };

export default function Previews(props) {
  // const [files, setFiles] = useState([]);
  const cancelImage = () => {
    setCroppedImgSrc("");
  };

  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const [zoom, setZoom] = useState(1);
  const [minZoom, setMinZoom] = useState(1);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState();

  const [croppedImgSrc, setCroppedImgSrc] = useState("");
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
      setImgSrc(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });
  const onFileChange = useCallback(async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        if (reader.result) {
          setImgSrc(reader.result.toString() || "");
          setIsOpen(true);
        }
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  }, []);

  const onMediaLoaded = useCallback((mediaSize) => {
    const { width, height } = mediaSize;
    const mediaAspectRadio = width / height;
    if (mediaAspectRadio > ASPECT_RATIO) {
      const result = CROP_WIDTH / ASPECT_RATIO / height;
      setZoom(result);
      setMinZoom(result);
      return;
    }

    const result = CROP_WIDTH / width;
    setZoom(result);
    setMinZoom(result);
  }, []);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    if (!croppedAreaPixels) return;
    try {
      const croppedImage = await getCroppedImg(imgSrc, croppedAreaPixels);
      setCroppedImgSrc(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, imgSrc]);

  // const style = React.useMemo(
  //   () => ({
  //     ...baseStyle,
  //     ...(isDragActive ? activeStyle : {}),
  //     ...(isDragAccept ? acceptStyle : {}),
  //     ...(isDragReject ? rejectStyle : {}),
  //   }),
  //   [isDragActive, isDragReject, isDragAccept]
  // );

  // const thumbs = files.map((file) => (
  //   <div style={thumb} key={file.name}>
  //     <div style={thumbInner}>
  //       <img alt="selected" src={file.preview} style={img} />
  //     </div>
  //   </div>
  // ));

  // useEffect(
  //   () => () => {
  //     // Make sure to revoke the data uris to avoid memory leaks
  //     files.forEach((file) => URL.revokeObjectURL(file.preview));
  //   },
  //   [files]
  // );
  // console.log(files.length);
  // return (
  //   <div className="block w-4/12 h-1/12 box-content p-4 m-auto border-0 rounded-2xl bg-gray-50 text-center">
  //     <div className="text-center text-2xl pt-1 pb-2">사진을 선택하세요.</div>

  //     <div>
  //       {files.length > 0 ? (
  //         <>
  //           <div className="flex justify-center flex-column items-center">
  //             {thumbs}
  //           </div>

  //           <div className="flex w-4/5 m-auto justify-end">
  //             <button
  //               className="flex float-right w-28 border-2 rounded-3xl "
  //               style={{
  //                 backgroundColor: "rgb(213,190,198)",
  //                 borderColor: "rgb(213,190,198)",
  //               }}
  //               onClick={cancelImage}
  //             >
  //               <img src="images/delete.svg" alt="delete" className="w-9" />
  //               <span className="items-center text-white text-xl font-medium leading-9">
  //                 Delete
  //               </span>
  //             </button>
  //           </div>
  //         </>
  //       ) : (
  //         <div {...getRootProps()}>
  //           <input {...getInputProps()} />
  //           {isDragActive ? (
  //             <div className="inline-block w-9/12 h-36 box-content p-4 border-3 border-dashed border-red-400 rounded-2xl bg-gray justify-center items-center my-2">
  //               <label
  //                 htmlFor="dropzone-file"
  //                 className="cursor-pointer block w-full h-36 m-auto my-4"
  //               >
  //                 <div className="flex justify-center flex-column items-center">
  //                   <img
  //                     src="images/imageupload.svg"
  //                     alt="파일 아이콘"
  //                     className="block w-14 m-auto"
  //                   />
  //                   <p className="mb-0">Drop the files here</p>
  //                 </div>
  //               </label>
  //             </div>
  //           ) : (
  //             <div className="inline-block w-9/12 h-36 box-content p-4 border-1 border-dashed border-black rounded-2xl bg-white justify-center items-center my-2">
  //               <label
  //                 htmlFor="dropzone-file"
  //                 className="cursor-pointer block w-full h-36 m-auto my-4"
  //               >
  //                 <div className="flex justify-center flex-column items-center">
  //                   <img
  //                     src="images/imageupload.svg"
  //                     alt="파일 아이콘"
  //                     className="block w-14 m-auto"
  //                   />
  //                   <p className="mb-0">
  //                     Drag-drop some files here, or click to select files
  //                   </p>
  //                 </div>
  //               </label>
  //             </div>
  //           )}
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // );
  return (
    <div className="block w-4/12 h-1/12 box-content p-4 m-auto border-0 rounded-2xl bg-gray-50 text-center">
      <div className="text-center text-2xl pt-1 pb-2">사진을 선택하세요.</div>
      {croppedImgSrc ? (
        <div className="flex w-4/5 m-auto justify-end mb-2">
          <img
            src={croppedImgSrc}
            alt="Cropped"
            className="block w-full h-full rounded-2xl"
          />
        </div>
      ) : (
        <Button
          variant="contained"
          component="label"
          className="inline-block w-9/12 h-36 box-content p-4 border-1 border-dashed border-black rounded-2xl bg-white justify-center items-center my-2"
        >
          <input type="file" hidden="true" onChange={onFileChange} />
          <div className="flex justify-center flex-column items-center">
            <img
              src="images/imageupload.svg"
              alt="파일 아이콘"
              className="block w-14 m-auto"
            />
            <p className="mb-0">click to select files</p>
          </div>
        </Button>
      )}
      <CropperModal
        crop={crop}
        setCrop={setCrop}
        zoom={zoom}
        setZoom={setZoom}
        onCropComplete={onCropComplete}
        open={isOpen}
        onClose={() => setIsOpen(false)}
        imgSrc={imgSrc}
        showCroppedImage={showCroppedImage}
        onMediaLoaded={onMediaLoaded}
        minZoom={minZoom}
      />
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
    </div>
  );
}
