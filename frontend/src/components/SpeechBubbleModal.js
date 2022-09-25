import React from "react";
import "./SpeechBubbleModal.css";
function SpeechBubbleModal(props) {
  function closeModal() {
    props.closeModal();
  }
  return (
    <div className="SpeechBubbleModal " onClick={closeModal}>
      <div className="modalBody" onClick={(e) => e.stopPropagation()}>
        <button id="modalCloseBtn" onClick={closeModal}>
          x
        </button>
        {props.children}
        <button id="modalSelectBtn" onClick={closeModal}>
          확인
        </button>
      </div>
    </div>
  );
}
export default SpeechBubbleModal;
