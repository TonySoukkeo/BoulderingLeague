import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class AdultView extends Component {
  render() {
    const { season, users } = this.props;
    let rank = 0;
    if (users) {
      return (
        <ul className="list-group">
          {users.map(x => (
            <li key={x.uid} className="list-group-item leaderboard">
              <h5>
                <span style={{ color: "black", fontWeight: "bold" }}>
                  {(rank += 1)}
                </span>
                <NavLink to={`/${x.uid}`}>
                  <img
                    style={{
                      width: "50px",
                      borderRadius: "50%",
                      marginRight: "10px",
                      marginLeft: "20px"
                    }}
                    src={x.photoURL || "/assets/user.png"}
                    alt="profile"
                  />
                  <span className="leaderboard-names">
                    {x.firstName} {x.lasName}{" "}
                  </span>
                </NavLink>
                <span className="badge badge-pill leaderboard-badge">
                  {x.season[season]}
                </span>
              </h5>
            </li>
          ))}
        </ul>
      );
    }
  }
}

export default AdultView;
