import React from "react";

const RadioInput = ({ input, type, label }) => {
  return (
    <div className="form__radio">
      <label className="form__radio-label">{label}</label>

      <input {...input} type={type} className="form__radio-input" />
    </div>
  );
};

export default RadioInput;
