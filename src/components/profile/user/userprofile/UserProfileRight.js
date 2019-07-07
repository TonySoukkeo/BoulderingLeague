import React, { Component } from "react";
import { objectToArray } from "../../../../common/helpers/util";
import UserProfileLevel from "../../../profile/profilelevel/UserProfileLevel";

class UserProfileRight extends Component {
  render() {
    const { currentUser } = this.props;

    if (currentUser) {
      return (
        <div className="col-md-7 profile-right">
          <UserProfileLevel currentUser={currentUser} />
          <div className="card">
            <div
              style={{
                marginBottom: ".7px"
              }}
              className="card-header"
            >
              <h5>
                Division:{" "}
                <span style={{ color: "green" }}>{currentUser.division}</span>
              </h5>
            </div>
            <ul className="list-group">
              <li className="list-group-item profile-list">
                <b>Overall Points:</b>{" "}
                <span
                  style={{
                    color: "black",
                    fontWeight: "bold"
                  }}
                >
                  {currentUser.overallTotal || "NA"}{" "}
                  {currentUser.overallTotal > 1 ? "Points" : "Point"}
                </span>
              </li>
            </ul>
            {currentUser.session &&
              objectToArray(currentUser.session).map(session => (
                <li key={session} className="list-group-item profile-list">
                  <b>{session}:</b>{" "}
                  <span
                    style={{
                      color: "black",
                      fontWeight: "bold"
                    }}
                  >
                    {session.total} {session.total > 1 ? "Points" : "Point"}
                  </span>
                </li>
              ))}
          </div>
        </div>
      );
    } else {
      return <div>Loading</div>;
    }
  }
}

export default UserProfileRight;
