import React from "react";

function Modal({ onClose, message }) {
  return (
    <div className="modal">
      <ion-icon name="close-outline" onClick={onClose}></ion-icon>
      <div className="modal-content">
        <p className="message-text">{message}</p>
      </div>
    </div>
  );
}

export default Modal;
