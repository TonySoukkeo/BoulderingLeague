import React from "react";

const Banner = ({ registerFormModal }) => {
  return (
    <div className="banner">
      <div className="banner__header-block">
        <h1 className="banner__header-block-lead">Hi Line Climbing Center</h1>
        <h1 className="header-1 banner__header-block-main">
          Bouldering League
        </h1>
      </div>

      <h1 className="header-1 banner__heading-1">join in</h1>
      <h2 className="header-2 banner__heading-2 mb-med">
        On the <span className="banner--emphasize">action</span>
      </h2>

      <button onClick={registerFormModal} className="btn banner__button">
        Register
      </button>
    </div>
  );
};

export default Banner;
