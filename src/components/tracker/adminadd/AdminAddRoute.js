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
  ],
  location = [
    {
      key: "1",
      text: "1",
      value: "/assets/gym_layout/layout-1.png"
    },
    {
      key: "2",
      text: "2",
      value: "/assets/gym_layout/layout-2.png"
    },
    {
      key: "3",
      text: "3",
      value: "/assets/gym_layout/layout-3.png"
    },
    {
      key: "4",
      text: "4",
      value: "/assets/gym_layout/layout-4.png"
    },
    {
      key: "5",
      text: "5",
      value: "/assets/gym_layout/layout-5.png"
    },
    {
      key: "6",
      text: "6",
      value: "/assets/gym_layout/layout-6.png"
    },
    {
      key: "7",
      text: "7",
      value: "/assets/gym_layout/layout-7.png"
    },
    {
      key: "8",
      text: "8",
      value: "/assets/gym_layout/layout-8.png"
    },
    {
      key: "9",
      text: "9",
      value: "/assets/gym_layout/layout-9.png"
    },
    {
      key: "10",
      text: "10",
      value: "/assets/gym_layout/layout-10.png"
    },
    {
      key: "11",
      text: "11",
      value: "/assets/gym_layout/layout-11.png"
    },
    {
      key: "12",
      text: "12",
      value: "/assets/gym_layout/layout-12.png"
    },
    {
      key: "13",
      text: "13",
      value: "/assets/gym_layout/layout-13.png"
    },
    {
      key: "14",
      text: "14",
      value: "/assets/gym_layout/layout-14.png"
    }
  ];

const validate = combineValidators({
  session: isRequired({ message: "Session is required" }),
  routeGrade: isRequired({ message: "Grade needs to be specified" }),
  routeName: isRequired({ message: "Route name is required" }),
  location: isRequired({ message: "Route Location is required" })
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
              <div className="text-center">
                <img
                  style={{
                    height: "209px",
                    width: "296px"
                  }}
                  src="/assets/gym_layout/gym-layout.png"
                  alt="gym layout"
                />
              </div>

              <br />
              <label htmlFor="location">Route Location</label>

              <Field
                name="location"
                type="number"
                component={SelectInput}
                options={location}
                multiple={false}
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
