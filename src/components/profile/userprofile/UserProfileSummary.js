import React, { Component } from "react";

class UserProfileSummary extends Component {
  state = {
    dropdown: false
  };

  openDropdown = () => {
    this.setState({
      dropdown: !this.state.dropdown
    });
  };

  render() {
    const { currentUser } = this.props,
      { dropdown } = this.state;

    return (
      <div className="user-profile-summary__content">
        <div className="user-profile-summary__wrapper">
          <div className="user-profile-summary__division mb-small">
            <span className="user-profile-summary--tag">
              <i className="fas fa-icicles profile__detail--icon-division"></i>
              Division: {currentUser.division}
            </span>
          </div>

          <span className="user-profile-summary--tag">
            <i className="fas fa-dice-d6 profile__detail--icon-total"></i>{" "}
            Overall Total: {currentUser.overallTotal || 0}{" "}
            {currentUser.overallTotal > 0 ? (
              <i
                onClick={this.openDropdown}
                className={
                  dropdown
                    ? "fas fa-caret-down user-profile-summary--icon-arrow user-profile-summary--icon-arrow-active"
                    : "fas fa-caret-down user-profile-summary--icon-arrow"
                }
              ></i>
            ) : null}
          </span>
        </div>

        <ul
          className={
            dropdown
              ? "profile__detail-sessions-list profile__detail-sessions-list--active"
              : "profile__detail-sessions-list"
          }
        >
          {Object.entries(currentUser.session).map(session => (
            <li key={session[0]} className="profile__detail-sessions-item">
              <span className="profile__detail--tag profile__detail--tag-lg">
                {session[0].split("Total")[0]}:{" "}
              </span>
              {session[1]}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default UserProfileSummary;
