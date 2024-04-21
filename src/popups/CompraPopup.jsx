import React from 'react';
import './CompraPopup.css';

export default function CompraPopup({ message, onClose }) {
  return (
    <div className="compra-popup">
      <span>{message}</span>
      <span className="close-button" onClick={onClose}>X</span>
    </div>
  );
}
