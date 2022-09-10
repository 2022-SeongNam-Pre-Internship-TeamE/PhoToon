export default function ImagePreview({ image }) {
  return (
    <div className="ImagePreview" draggable>
      <img src={image} alt="preview" />
    </div>
  );
}
