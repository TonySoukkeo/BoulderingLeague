import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class AdultDivision extends Component {
  render() {
    const { sessionTotalValue, users } = this.props;
    if (users && users.length !== 0) {
      return (
        <div className="card mb-3">
          <div
            style={{
              marginBottom: ".7px"
            }}
            className="card-header text-center"
          >
            <h3>Adult Division</h3>
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
                    {x.session[sessionTotalValue]}
                  </span>
                </h5>
              </li>
            ))}
            <NavLink to={`/leaderboard/adult/${sessionTotalValue}`}>
              <button className="btn btn-block  btn-large leaderboard-btn">
                View All
              </button>
            </NavLink>
          </ul>
        </div>
      );
    } else {
      return (
        <div className="card mb-5">
          <div
            style={{
              marginBottom: ".7px"
            }}
            className="card-header text-center"
          >
            <h3>Adult Division</h3>
          </div>
          <div className="card-body">
            <p style={{ fontSize: "1.3rem" }}>
              Be the first to get on the board!
            </p>
          </div>
        </div>
      );
    }
  }
}

export default AdultDivision;
