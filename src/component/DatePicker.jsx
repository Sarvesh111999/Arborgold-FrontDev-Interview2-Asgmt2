import React from 'react';
import '../DateInput/style.css';

function DateInput({ label, value, onChange }) {
  return (
    <div className="date-input">
      <label>{label}</label>
      <input
        type="date"
        value={value}
        onChange={onChange}
        className="date-input-field"
      />
    </div>
  );
}

export default DateInput;

