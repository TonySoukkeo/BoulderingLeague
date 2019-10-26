import React, { Component } from "react";

class UserProfileLevel extends Component {
  render() {
    const { currentUser, level } = this.props;

    return (
      <React.Fragment>
        <img
          className="navbar__level-img"
          src={level.img || "/assets/rankings/rank-1.png"}
          alt="rank"
        />

        <div className="navbar__level-amount">
          <span style={{ color: "#f6f7f7" }}>
            {" "}
            {(currentUser && currentUser.experiencePoints) || 0}{" "}
          </span>{" "}
          <span style={{ color: "#f6f7f7" }}> /</span>{" "}
          <span
            style={{
              color: "#6fbf60"
            }}
          >
            {level.neededXp} xp
          </span>
        </div>
      </React.Fragment>
    );
  }
}

export default UserProfileLevel;
