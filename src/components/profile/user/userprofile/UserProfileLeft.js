import React from "react";

const UserProfileLeft = ({ currentUser }) => {
  return (
    <div className="col-md-5 profile-left">
      <div />
      <div className="profile-card card mt-2">
        <div className="card-body text-center">
          <img
            style={{ marginTop: "-70px" }}
            className="img-fluid rounded-circle w-50"
            src={currentUser.photoURL || "/assets/user.png"}
            alt="profile"
          />
          <h3 className="text-center mt-3">
            {currentUser.firstName} {currentUser.lastName}, {currentUser.gender}
          </h3>
          <hr className="profile-hr" />
          <p className="text-center">{currentUser.about || `NA`}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfileLeft;
