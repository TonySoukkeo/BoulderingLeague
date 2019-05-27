import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class YouthDivision extends Component {
  render() {
    const { seasonTotalValue, users } = this.props;

    if (users) {
      return (
        <div className="card">
          <div
            style={{
              marginBottom: ".7px"
            }}
            className="card-header text-center"
          >
            <h3>Youth Division</h3>
          </div>
          <ul className="list-group">
            {users.map(x => (
              <li key={x.uid} className="list-group-item leaderboard">
                <h5>
                  <NavLink className="leaderboard-names" to={`/${x.uid}`}>
                    <img
                      style={{
                        height: "50px",
                        borderRadius: "50%",
                        marginRight: "10px"
                      }}
                      src={x.photoURL || "/assets/user.png"}
                      alt="profile"
                    />
                    {x.firstName} {x.lastName}{" "}
                  </NavLink>
                  <span className="badge badge-pill leaderboard-badge">
                    {x.season[seasonTotalValue]}
                  </span>
                </h5>
              </li>
            ))}
            <NavLink to={`/leaderboard/youth/${seasonTotalValue}`}>
              <button className="btn btn-block btn-large leaderboard-btn">
                View All
              </button>
            </NavLink>
          </ul>
        </div>
      );
    } else {
      return <div>Why...</div>;
    }
  }
}

export default YouthDivision;
