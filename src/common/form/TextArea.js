import React from "react";

const TextArea = ({
  input,
  rows,
  type,
  placeholder,
  meta: { touched, error }
}) => {
  return (
    <div className="form-group">
      <textarea
        {...input}
        placeholder={placeholder}
        rows={rows}
        className="form-control form-control-lg"
      />
      {touched && error && <div className="text-danger mt-2">{error}</div>}
    </div>
  );
};

export default TextArea;
