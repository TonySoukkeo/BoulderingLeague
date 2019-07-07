import React, { Component } from "react";
import { changeUserPermissions } from "./AdminActions";
import { Field, reduxForm } from "redux-form";
import { isRequired, combineValidators } from "revalidate";
import SelectInput from "../../common/form/SelectInput";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

const permissions = [
  { key: "member", text: "member", value: "member" },
  { key: "route setter", text: "route setter", value: "route setter" },
  { key: "admin", text: "admin", value: "admin" }
];

const validate = combineValidators({
  userPermission: isRequired({ message: "Please select a user permission" })
});

class AdminMembers extends Component {
  changePermission = permission => {
    const { changeUserPermissions } = this.props;
    let users = [];
    // Get key value pairs of uid and permission and push them into an array
    for (let x in permission) {
      users.push({ uid: x, permission: permission[x] });
    }

    changeUserPermissions(users);
  };

  render() {
    const { display, users, handleSubmit, pristine, submitting } = this.props;
    return (
      <div className={display ? null : "hide"}>
        <div className="container">
          <div
            style={{ height: "450px", overflowY: "scroll" }}
            className="card"
          >
            <div className="card-header sticky-top">
              <h3 className="text-center">Members</h3>
            </div>

            <ul style={{ height: "50px" }} className="list-group">
              {users &&
                users.length >= 1 &&
                users.map(x => (
                  <li
                    key={x.uid}
                    style={{
                      color: "black"
                    }}
                    className="list-group-item"
                  >
                    <form onSubmit={handleSubmit(this.changePermission)}>
                      <Link to={`/${x.uid}`}>
                        {" "}
                        {x.firstName} {x.lastName}{" "}
                      </Link>
                      <span style={{ float: "right", marginLeft: "10px" }}>
                        {" "}
                        <button
                          type="submit"
                          disabled={pristine || submitting}
                          className="btn btn-primary"
                        >
                          Change
                        </button>
                      </span>
                      <span style={{ float: "right" }}>
                        <Field
                          placeholder={x.permission}
                          name={x.uid}
                          component={SelectInput}
                          type="text"
                          options={permissions}
                          multiple={false}
                        />
                      </span>
                    </form>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    users: state.firestore.ordered.users
  };
};

const actions = {
  changeUserPermissions
};

export default compose(
  firestoreConnect([{ collection: "users" }]),
  connect(
    mapState,
    actions
  ),
  reduxForm({ form: "changePermission", validate, enableReinitialize: true })
)(AdminMembers);
