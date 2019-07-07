import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllDivision } from "./AllDivisionActions";
import { NavLink } from "react-router-dom";

class AllDivision extends Component {
  async componentDidMount() {
    const { getAllDivision, sessionTotalValue } = this.props;

    await getAllDivision(sessionTotalValue);
  }

  render() {
    const { sessionTotalValue, overall } = this.props;
    if (overall.length !== 0) {
      return (
        <div className="card mb-3">
          <div
            style={{
              marginBottom: ".7px"
            }}
            className="card-header text-center"
          >
            <h3>Overall</h3>
          </div>
          <ul className="list-group">
            {overall &&
              overall
                .map(x => (
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
                        {x.session}
                      </span>
                    </h5>
                  </li>
                ))
                .slice(0, 3)}
            <NavLink to={`/leaderboard/overall/${sessionTotalValue}`}>
              <button className="btn btn-block btn-large leaderboard-btn">
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
            <h3>Overall </h3>
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

const mapState = state => {
  return {
    overall: state.overall.overallUsers
  };
};

const actions = {
  getAllDivision
};

export default connect(
  mapState,
  actions
)(AllDivision);
