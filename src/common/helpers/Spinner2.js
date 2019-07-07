import React from "react";
import spinner2 from "./spinner-2.gif";

const Spinner2 = () => {
  return (
    <div>
      <img
        style={{ width: "200px", marginTop: "180px", display: "block" }}
        className="mx-auto"
        src={spinner2}
        alt="loading"
      />
    </div>
  );
};

export default Spinner2;
