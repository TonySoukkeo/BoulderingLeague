import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const DateInput = ({
  input: { value, onChange, onBlur, ...restInput },
  width,
  placeholder,
  meta: { touched, error },
  ...rest
}) => {
  if (value) {
    value = moment(value, "X");
  }

  return (
    <div width={width} className="form-group">
      <style>
        {`.react-datepicker__time-container           .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list {
        padding-left: 0;
        padding-right: 0;
        }`}
      </style>
      <DatePicker
        className="form-control form-control-lg"
        {...rest}
        placeholderText={placeholder}
        selected={value ? moment(value) : null}
        onChange={onChange}
        {...restInput}
        onBlur={() => onBlur()}
      />
      {touched && error && <div className="text-danger mt-2">{error}</div>}
    </div>
  );
};

export default DateInput;
