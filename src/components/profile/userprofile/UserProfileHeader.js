import React from "react";

const UserProfileHeader = ({ user }) => {
  return (
    <React.Fragment>
      <img
        src={user.bannerURL || "/assets/banner.jpg"}
        alt="profile banner"
        className="profile__header-banner"
      />

      <img
        className="profile__header-img"
        src={user.photoURL || "/assets/user.png"}
        alt="profile picture"
      />
    </React.Fragment>
  );
};

export default UserProfileHeader;
