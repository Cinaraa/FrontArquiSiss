import React from 'react';
import './LoginPopup.css';

const LoginPopup = ({ onClose }) => {
  return (
    <div className="login-popup">
      <div className="login-popup-content">
        <span className="close" onClick={onClose}>&times;</span>
        <p>Debes iniciar sesión para comprar un pasaje.</p>
      </div>
    </div>
  );
};

export default LoginPopup;
