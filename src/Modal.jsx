import React from "react";

function Modal({ onClose }) {
  return (
    <div className="modal">
      <ion-icon name="close-outline" onClick={onClose}></ion-icon>
      <div className="modal-content">
        <h2>Please select an answer for each question</h2>
      </div>
    </div>
  );
}

export default Modal;
