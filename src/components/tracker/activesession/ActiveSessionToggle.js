import React from "react";

const ActiveSessionToggle = ({
  updateSessionStatusOnline,
  updateSessionStatusOffline,
  currentSession,
  onlineStatus
}) => {
  return (
    <div style={{ float: "right" }}>
      {onlineStatus ? (
        <button
          onClick={() => updateSessionStatusOffline(currentSession)}
          className="btn btn-warning text-uppercase"
        >
          {" "}
          <i style={{ color: "green" }} className="fas fa-circle" /> Online
        </button>
      ) : (
        <button
          onClick={() => updateSessionStatusOnline(currentSession)}
          className="btn btn-warning text-uppercase"
        >
          {" "}
          <i style={{ color: "red" }} className="fas fa-circle" /> Offline
        </button>
      )}
    </div>
  );
};

export default ActiveSessionToggle;
