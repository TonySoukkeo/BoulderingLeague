import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { isRequired, combineValidators } from "revalidate";
import { addRoute } from "../../routes/RoutesAction";
import TextArea from "../../../common/form/TextArea";
import TextInput from "../../../common/form/TextInput";
import SelectInput from "../../../common/form/SelectInput";

const season = [
    { key: "season1", text: "Season 1", value: "season1" },
    { key: "season2", text: "Season 2", value: "season2" },
    { key: "season3", text: "Season 3", value: "season3" },
    { key: "season4", text: "Season 4", value: "season4" }
  ],
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
      key: "v8",
      text: "V8",
      value: "v8"
    },
    {
      key: "v9",
      text: "V9",
      value: "v9"
    }
  ];

const validate = combineValidators({
  season: isRequired({ message: "Season is required" }),
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
              <label htmlFor="season">Season:</label>
              <Field
                name="season"
                component={SelectInput}
                type="text"
                options={season}
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
