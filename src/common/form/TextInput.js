import React from "react";
import moment from "moment";

const TextInput = ({
  input,
  width,
  type,
  disabled,
  placeholder,
  meta: { touched, error }
}) => {
  return (
    <React.Fragment>
      <input
        {...input}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className="form__input"
      />
      {touched && error && <div className="form__validation">{error}</div>}
    </React.Fragment>
  );
};

export default TextInput;
