import React from "react";

const TextInput = ({
  input,
  width,
  type,
  disabled,
  placeholder,
  meta: { touched, error }
}) => {
  return (
    <div>
      <input
        {...input}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className="form-control"
      />
      {touched && error && <div className="text-danger mt-2">{error}</div>}
    </div>
  );
};

export default TextInput;
