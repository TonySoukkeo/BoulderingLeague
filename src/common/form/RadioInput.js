import React from "react";

const RadioInput = ({ input, type, label }) => {
  return (
    <div className="form-check mb-3 mr-3">
      <input {...input} type={type} className="form-check-input" />
      <label className="form-check-label">{label}</label>
    </div>
  );
};

export default RadioInput;
