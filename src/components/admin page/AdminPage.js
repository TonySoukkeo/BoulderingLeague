import React, { Component } from "react";
import AdminAlert from "./AdminAlert";
import AdminMembers from "./AdminMembers";

class AdminPage extends Component {
  state = {
    adminAlert: true,
    adminMember: false
  };

  changeDisplay = type => {
    this.setState({
      adminAlert: type.adminAlert,
      adminMember: type.adminMember
    });
  };

  render() {
    const { adminAlert, adminMember } = this.state;
    return (
      <div className="container">
        <div style={{ marginTop: "100px" }}>
          <div className="row">
            <div className="col-md-9">
              <AdminAlert display={adminAlert} />
              <AdminMembers display={adminMember} />
            </div>
            <div className="col-md-3">
              <div className="card">
                <ul className="list-group">
                  <li
                    style={{ color: "black" }}
                    onClick={() =>
                      this.changeDisplay({
                        adminAlert: true,
                        adminMember: false
                      })
                    }
                    className={
                      adminAlert ? "list-group-item active" : "list-group-item"
                    }
                  >
                    Alerts
                  </li>
                  <li
                    style={{ color: "black" }}
                    onClick={() =>
                      this.changeDisplay({
                        adminAlert: false,
                        adminMember: true
                      })
                    }
                    className={
                      adminMember ? "list-group-item active" : "list-group-item"
                    }
                  >
                    Members
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminPage;
