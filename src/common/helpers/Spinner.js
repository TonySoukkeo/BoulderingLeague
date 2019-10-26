import React from "react";
import loading from "./loading.gif";

const Spinner = () => {
  return (
    <div className="spinner">
      <div className="spinner__container">
        <img className="spinner__img" src={loading} alt="loading" />
      </div>
    </div>
  );
};

export default Spinner;
