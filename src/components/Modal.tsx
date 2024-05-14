import React from 'react';
import '../styles/modal.css'
const Modal = ({ isOpen, onClose, children }: any) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
      <span  className="close" onClick={onClose}>&times;</span>
        {children}
      </div>
    </div>
  );
};

export default Modal;