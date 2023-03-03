import React from "react";

function Modal({ onClose, message }) {
  return (
    <div className="modal">
      <ion-icon name="close-outline" onClick={onClose}></ion-icon>
      <div className="modal-content">
        <div className="message-text">{message}</div>
      </div>
    </div>
  );
}

export default Modal;
