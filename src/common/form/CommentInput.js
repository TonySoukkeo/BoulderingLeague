import React from "react";

const CommentInput = ({
  input,
  width,
  type,
  placeholder,
  meta: { touched, error }
}) => {
  return (
    <input
      {...input}
      type={type}
      placeholder={placeholder}
      className="form-control"
    />
  );
};

export default CommentInput;
