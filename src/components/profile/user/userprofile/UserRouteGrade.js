import React from "react";

const UserRouteGrade = ({ user }) => {
  return (
    <table className="table table-dark">
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
          <td>{user.v0 || 0}</td>
          <td>{user.v1 || 0}</td>
          <td>{user.v2 || 0}</td>
          <td>{user.v3 || 0}</td>
          <td>{user.v4 || 0}</td>
          <td>{user.v5 || 0}</td>
          <td>{user.v6 || 0}</td>
          <td>{user.v7 || 0}</td>
          <td>{user.v8 || 0}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default UserRouteGrade;
