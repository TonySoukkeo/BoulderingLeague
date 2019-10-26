import React from "react";

const ActiveSessionToggle = ({
  updateSessionStatusOnline,
  updateSessionStatusOffline,
  currentSession,
  onlineStatus
}) => {
  return (
    <React.Fragment>
      {onlineStatus ? (
        <button
          onClick={() => updateSessionStatusOffline(currentSession)}
          className="btn add-routes__btn add-routes__btn--online"
        >
          {" "}
          <i className="fas fa-circle" /> Online
        </button>
      ) : (
        <button
          onClick={() => updateSessionStatusOnline(currentSession)}
          className="btn add-routes__btn add-routes__btn--offline"
        >
          {" "}
          <i className="fas fa-circle" /> Offline
        </button>
      )}
    </React.Fragment>
  );
};

export default ActiveSessionToggle;
