import React, { Component } from "react";
import { Link } from "react-router-dom";

class YouthView extends Component {
  render() {
    const { session, users } = this.props;
    let rank = 0;
    if (users) {
      return (
        <ul className="leaderboard-popup__list">
          {users.map(x => (
            <li key={x.uid} className="leaderboard-popup__item">
              <span className="leaderboard-popup__rank">{(rank += 1)}</span>

              <Link
                to={`/profile/${x.uid}`}
                className="leaderboard-popup__profile"
              >
                <img
                  className="leaderboard-popup__img"
                  src={x.photoURL || "/assets/user.png"}
                  alt="profile"
                />

                <span className="leaderboard-popup__name">
                  {x.firstName} {x.lastName}{" "}
                </span>
              </Link>

              <span className="leaderboard-popup__badge">
                {x.session[`${session}Total`]}
              </span>
            </li>
          ))}
        </ul>
      );
    }
  }
}

export default YouthView;
