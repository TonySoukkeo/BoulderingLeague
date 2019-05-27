import React from "react";
import spinner from "./spinner.gif";

const Spinner = () => {
  return (
    <div>
      <img
        style={{ width: "200px", marginTop: "180px", display: "block" }}
        className="mx-auto"
        src={spinner}
        alt="loading"
      />
    </div>
  );
};

export default Spinner;
