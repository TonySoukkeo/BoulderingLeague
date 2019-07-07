import React, { Component } from "react";
import { Link } from "react-router-dom";

class YouthView extends Component {
  render() {
    const { session, users } = this.props;
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
                <Link to={`/${x.uid}`}>
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
                </Link>
                <span className="badge badge-pill leaderboard-badge">
                  {x.session[session]}
                </span>
              </h5>
            </li>
          ))}
        </ul>
      );
    }
  }
}

export default YouthView;
