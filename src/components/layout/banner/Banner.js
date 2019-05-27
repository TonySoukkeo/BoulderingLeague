import React from "react";
import BannerForm from "./BannerForm";

const Banner = () => {
  return (
    <div className="banner">
      <div className="overlay">
        <div className="container banner-form-margin text-light">
          <div className="row">
            <div className="col-lg-7 banner-text-margin p-5">
              <h1 style={{ textTransform: "uppercase" }}>Bouldering League!</h1>
              <p>
                Welcome, Hi-Line climbers! This app will track and score up all
                the routes you've climbed for our bouldering league. To get
                started, just sign up for a free account!
              </p>
            </div>
            <div className="col-lg-5">
              <BannerForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
