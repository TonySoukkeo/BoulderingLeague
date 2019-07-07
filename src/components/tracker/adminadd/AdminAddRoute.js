import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { isRequired, combineValidators } from "revalidate";
import { addRoute } from "../../routes/RoutesAction";
import TextArea from "../../../common/form/TextArea";
import TextInput from "../../../common/form/TextInput";
import SelectInput from "../../../common/form/SelectInput";

const session = [{ key: "session1", text: "Session 1", value: "session1" }],
  grade = [
    {
      key: "v0",
      text: "V0",
      value: "v0"
    },
    {
      key: "v1",
      text: "V1",
      value: "v1"
    },
    {
      key: "v2",
      text: "V2",
      value: "v2"
    },
    {
      key: "v3",
      text: "V3",
      value: "v3"
    },
    {
      key: "v4",
      text: "V4",
      value: "v4"
    },
    {
      key: "v5",
      text: "V5",
      value: "v5"
    },
    {
      key: "v6",
      text: "V6",
      value: "v6"
    },
    {
      key: "v7",
      text: "V7",
      value: "v7"
    },
    {
      key: "special",
      text: "Special",
      value: "special"
    }
  ];

const validate = combineValidators({
  session: isRequired({ message: "Session is required" }),
  routeGrade: isRequired({ message: "Grade needs to be specified" }),
  routeName: isRequired({ message: "Route name is required" })
});

class AdminAddRoute extends Component {
  addNewRoute = route => {
    const { addRoute, hideRoute } = this.props;
    // Add route
    addRoute(route);
    // hide display
    hideRoute();
  };

  render() {
    const { handleSubmit, pristine, submitting } = this.props;

    return (
      <div className="card mt-3">
        <div className="card-header">Add new route</div>
        <div className="card-body">
          <form onSubmit={handleSubmit(this.addNewRoute)}>
            <div className="form-group">
              <label htmlFor="session">Session:</label>
              <Field
                name="session"
                component={SelectInput}
                type="text"
                options={session}
                multiple={false}
                className="form-control"
              />
              <Field
                name="routeName"
                component={TextInput}
                type="text"
                placeholder="Route Name"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="routeGrade">Grade: </label>
              <Field
                name="routeGrade"
                component={SelectInput}
                type="text"
                options={grade}
                multiple={false}
                className="form-control"
              />
            </div>
            <Field
              name="description"
              component={TextArea}
              type="text"
              placeholder="Description"
              rows={7}
              className="form-control"
            />
            <hr />
            <button
              type="submit"
              disabled={pristine || submitting}
              style={{ float: "right" }}
              className="btn btn-primary mr-2"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const actions = {
  addRoute
};

export default connect(
  null,
  actions
)(
  reduxForm({ form: "addRoutes", validate, enableReinitialize: true })(
    AdminAddRoute
  )
);
