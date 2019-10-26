import React, { Component } from "react";
import { Link } from "react-router-dom";

class RouteView extends Component {
  render() {
    const { routeName, closeModal, completedBy, haveClimbedModal } = this.props;

    return (
      <div
        className={
          haveClimbedModal
            ? "route-view popup popup-active"
            : "route-view popup"
        }
      >
        <div className="route-view__header">
          <h1 className="header-1">{routeName}</h1>
          <i onClick={closeModal} className="fas fa-times route-view--icon"></i>
        </div>
        <div className="route-view__content">
          <ul className="route-view__list">
            {completedBy &&
              completedBy.map(user => (
                <li key={user.id} className="route-view__item">
                  <Link className="route-view__link" to={`/profile/${user.id}`}>
                    <img
                      className="route-view__photo"
                      src={user.photoUrl}
                    ></img>
                    <div className="route-view__name">
                      {user.firstName} {user.lastName}
                    </div>

                    <div className="route-view__division">
                      Division: {user.division}
                    </div>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default RouteView;
