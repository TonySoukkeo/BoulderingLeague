import React from "react";

const CommentInput = ({
  input,
  width,
  type,
  placeholder,
  meta: { touched, error }
}) => {
  return (
    <textarea
      rows="5"
      max-rows="10"
      cols="10"
      wrap="hard"
      {...input}
      type={type}
      placeholder={placeholder}
      className="form__comment"
    />
  );
};

export default CommentInput;
