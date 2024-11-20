import React from 'react';
import "react-datepicker/dist/react-datepicker.css";


function Button({ onClick, children, className }) {
  return (
    <button onClick={onClick}  className={`custom-button ${className || ''}`}>
      {children}
    </button>
  );
}

export default Button;

