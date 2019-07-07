import React from "react";
import ClimbingLoading from "./climbing-loading.gif";

const RoutesIntermission = () => {
  return (
    <div>
      <img
        style={{ width: "100%", marginTop: "25px", display: "block" }}
        className="mx-auto"
        src={ClimbingLoading}
        alt="loading"
      />
    </div>
  );
};

export default RoutesIntermission;
