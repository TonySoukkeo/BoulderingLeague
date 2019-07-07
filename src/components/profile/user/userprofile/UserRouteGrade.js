import React from "react";

const UserRouteGrade = ({ user }) => {
  return (
    <React.Fragment>
      {/* DESKTOP VIEW */}
      <div className="d-none d-lg-block">
        <ul className="list-group mb-3">
          <div className="container">
            <div className="row">
              <div className="col-4 p-0">
                <li className="list-group-item route-tracker-styling">
                  <span className="route-tracker-grade">v0: </span>{" "}
                  <span className="route-tracker-amount"> {user.v0 || 0}</span>
                </li>
                <li className="list-group-item route-tracker-styling">
                  <span className="route-tracker-grade">v3: </span>{" "}
                  <span className="route-tracker-amount"> {user.v3 || 0}</span>
                </li>
                <li className="list-group-item route-tracker-styling">
                  <span className="route-tracker-grade">v6: </span>{" "}
                  <span className="route-tracker-amount"> {user.v6 || 0}</span>
                </li>
              </div>
              <div className="col-4 p-0">
                <li className="list-group-item route-tracker-styling">
                  <span className="route-tracker-grade">v1: </span>{" "}
                  <span className="route-tracker-amount"> {user.v1 || 0}</span>
                </li>
                <li className="list-group-item route-tracker-styling">
                  <span className="route-tracker-grade">v4: </span>{" "}
                  <span className="route-tracker-amount"> {user.v4 || 0}</span>
                </li>
                <li className="list-group-item route-tracker-styling">
                  <span className="route-tracker-grade">v7: </span>{" "}
                  <span className="route-tracker-amount"> {user.v7 || 0}</span>
                </li>
              </div>
              <div className="col-4 p-0">
                <li className="list-group-item route-tracker-styling">
                  <span className="route-tracker-grade">v2: </span>{" "}
                  <span className="route-tracker-amount"> {user.v2 || 0}</span>
                </li>

                <li className="list-group-item route-tracker-styling">
                  <span className="route-tracker-grade">v5: </span>{" "}
                  <span className="route-tracker-amount"> {user.v5 || 0}</span>
                </li>
                <li className="list-group-item route-tracker-styling">
                  <span className="route-tracker-grade">SP: </span>{" "}
                  <span className="route-tracker-amount">
                    {" "}
                    {user.special || 0}
                  </span>
                </li>
              </div>
            </div>
          </div>
        </ul>
      </div>
      {/* MOBILE VIEW */}
      <div className="d-block d-lg-none mb-5">
        <ul className="list-group">
          <div className="container">
            <div className="row">
              <div className="col-6 p-0">
                <li className="list-group-item route-tracker-styling text-center">
                  <span className="route-tracker-grade">v0: </span>{" "}
                  <span className="route-tracker-amount"> {user.v0 || 0}</span>
                </li>
                <li className="list-group-item route-tracker-styling text-center">
                  <span className="route-tracker-grade">v2: </span>{" "}
                  <span className="route-tracker-amount"> {user.v2 || 0}</span>
                </li>
                <li className="list-group-item route-tracker-styling text-center">
                  <span className="route-tracker-grade">v4: </span>{" "}
                  <span className="route-tracker-amount"> {user.v4 || 0}</span>
                </li>
                <li className="list-group-item route-tracker-styling text-center">
                  <span className="route-tracker-grade">v6: </span>{" "}
                  <span className="route-tracker-amount"> {user.v6 || 0}</span>
                </li>
              </div>
              <div className="col-6 p-0">
                <li className="list-group-item route-tracker-styling text-center">
                  <span className="route-tracker-grade">v1: </span>{" "}
                  <span className="route-tracker-amount"> {user.v1 || 0}</span>
                </li>
                <li className="list-group-item route-tracker-styling text-center">
                  <span className="route-tracker-grade">v3: </span>{" "}
                  <span className="route-tracker-amount"> {user.v3 || 0}</span>
                </li>
                <li className="list-group-item route-tracker-styling text-center">
                  <span className="route-tracker-grade">v5: </span>{" "}
                  <span className="route-tracker-amount"> {user.v5 || 0}</span>
                </li>
                <li className="list-group-item route-tracker-styling text-center">
                  <span className="route-tracker-grade">v7: </span>{" "}
                  <span className="route-tracker-amount"> {user.v7 || 0}</span>
                </li>
              </div>
              <div className="col-6 p-0">
                <li className="list-group-item route-tracker-styling text-center">
                  <span className="route-tracker-grade">SP: </span>{" "}
                  <span className="route-tracker-amount">
                    {" "}
                    {user.special || 0}
                  </span>
                </li>
              </div>
            </div>
          </div>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default UserRouteGrade;
