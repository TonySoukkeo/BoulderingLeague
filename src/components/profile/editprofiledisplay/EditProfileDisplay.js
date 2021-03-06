import React from "react";
import { Link } from "react-router-dom";
import format from "date-fns/format";
import differenceInYears from "date-fns/difference_in_years";
import { objectToArray } from "../../../common/helpers/util";

const EditProfileDisplay = ({ user }) => {
  // Created at
  let createdAt;
  if (user.createdAt) {
    createdAt = format(user.createdAt, "MMM, D YYYY");
  }

  // Calculate age
  let age;
  if (user.dateOfBirth) {
    age = differenceInYears(Date.now(), user.dateOfBirth);
  }

  if (user) {
    return (
      
      <React.Fragment>
        <img
          className="profile__main-img"
          src={user.photoURL || "/assets/user.png"}
          alt="profile picture"
        />
        <p className="mt-4">
          <Link to="/profile/upload">
            <span>
              <i className="fas fa-edit " /> Change Profile Picture
            </span>
          </Link>
        </p>
        <h2 className="mt-4">
          {user.firstName} {user.lastName}, {age}
        </h2>
        <p style={{ color: "#c6c6c6" }}>Member since: {createdAt}</p>

        <div>
          {user.about}
          <br />
          <p className="mt-5">
            <b>Overall Total:</b> {user.overallTotal}
          </p>
          {user.session &&
            objectToArray(user.session).map(session => (
              <p key={session}>
                <b>{session}:</b> {session.total}
              </p>
            ))}
        </div>
      </React.Fragment>
    );
  } else {
    return <div>Loading</div>;
  }
};

export default EditProfileDisplay;
