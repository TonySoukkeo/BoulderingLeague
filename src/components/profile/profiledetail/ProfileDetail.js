import React, { Component } from "react";

class ProfileDetail extends Component {
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
      <div className="profile__detail-sessions">
        <div className="profile__detail--content-wrapper">
          <div className="profile__detail-division mb-small">
            <span className="profile__detail--tag">
              <i className="fas fa-icicles profile__detail--icon-division"></i>
              Division:{" "}
            </span>
            {currentUser.division}
          </div>

          <span className="profile__detail--tag">
            <i className="fas fa-dice-d6 profile__detail--icon-total"></i>{" "}
            Overall Total: {currentUser.overallTotal || 0}{" "}
            {currentUser.overallTotal > 0 ? (
              <i
                onClick={this.openDropdown}
                className={
                  dropdown
                    ? "fas fa-caret-down profile__detail--icon-arrow profile__detail--icon-arrow-active"
                    : "fas fa-caret-down profile__detail--icon-arrow"
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

export default ProfileDetail;
