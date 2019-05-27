import React, { Component } from "react";
import { objectToArray } from "../../../../common/helpers/util";

class UserProfileRight extends Component {
  render() {
    const { currentUser } = this.props;

    if (currentUser) {
      return (
        <div className="col-md-7 profile-right">
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
            {currentUser.season &&
              objectToArray(currentUser.season).map(season => (
                <li key={season} className="list-group-item profile-list">
                  <b>{season}:</b>{" "}
                  <span
                    style={{
                      color: "black",
                      fontWeight: "bold"
                    }}
                  >
                    {season.total} {season.total > 1 ? "Points" : "Point"}
                  </span>
                </li>
              ))}
          </div>
          <table className="table table-borded table-dark mt-4">
            <thead>
              <tr>
                <th>V0</th>
                <th>V1</th>
                <th>V2</th>
                <th>V3</th>
                <th>V4</th>
                <th>V5</th>
                <th>V6</th>
                <th>V7</th>
                <th>V8</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{currentUser.v0 || 0}</td>
                <td>{currentUser.v1 || 0}</td>
                <td>{currentUser.v2 || 0}</td>
                <td>{currentUser.v3 || 0}</td>
                <td>{currentUser.v4 || 0}</td>
                <td>{currentUser.v5 || 0}</td>
                <td>{currentUser.v6 || 0}</td>
                <td>{currentUser.v7 || 0}</td>
                <td>{currentUser.v8 || 0}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    } else {
      return <div>Loading</div>;
    }
  }
}

export default UserProfileRight;
