import React from "react";

const SelectInput = ({
  input,
  type,
  placeholder,
  multiple,
  options,
  meta: { touched, error }
}) => {
  return (
    <div className="form__group">
      <select
        multiple={multiple}
        {...input}
        name="custom-select"
        className="form__input"
      >
        <option>{placeholder}</option>
        {options.map(option => (
          <option key={option.key} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
