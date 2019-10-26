import React, { Component } from "react";
import { updateRoute } from "./RoutesAction";
import { connect } from "react-redux";
import { compose } from "redux";
import { Field, reduxForm } from "redux-form";
import TextInput from "../../common/form/TextInput";
import TextArea from "../../common/form/TextArea";
import SelectInput from "../../common/form/SelectInput";
import { withRouter } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import { userDetailedQuery } from "./routeQuery";

const grade = [
    {
      key: "special",
      text: "Special",
      value: "special"
    },
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

class RouteField extends Component {
  state = {
    name: ""
  };

  componentDidMount() {
    const { initialValues } = this.props;
    // Set state
    this.setState({
      name: initialValues.routeName
    });
  }

  onClickBack = () => {
    const { history } = this.props;

    history.push("/tracker");
  };

  onClickUpdate = route => {
    const { updateRoute, history, user, profile } = this.props,
      { name } = this.state;

    updateRoute(route, name, user, profile);
    // Redirect
    history.push("/tracker");
  };

  render() {
    const { handleSubmit, pristine, submitting } = this.props;

    return (
      <div className="edit-route__container">
        <button onClick={this.onClickBack} className="route-comments__btn">
          <i className="fas fa-arrow-circle-left" /> Back
        </button>

        <div className="edit-route__header">
          <h3>Edit Route</h3>
        </div>

        <form
          className="edit-route__form"
          onSubmit={handleSubmit(this.onClickUpdate)}
        >
          <div className="form__group">
            <label className="form__label" htmlFor="Route Name">
              Route Name
            </label>

            <Field
              disabled={true}
              name="routeName"
              component={TextInput}
              type="text"
              placeholder="Route Name"
            />
          </div>

          <div className="form__group">
            <label className="form__label" htmlFor="Route Location">
              Route Location
            </label>

            <img
              className="edit-route__img-layout"
              src="/assets/gym_layout/gym-layout.png"
              alt="gym layout"
            />

            <Field
              name="location"
              component={SelectInput}
              options={location}
              type="number"
              multiple={false}
            />
          </div>

          <div className="form__group">
            <label className="form__label" htmlFor="Route Grade">
              Route Grade
            </label>

            <Field
              name="routeGrade"
              component={SelectInput}
              options={grade}
              type="text"
              multiple={false}
            />
          </div>

          <div className="form__group">
            <label htmlFor="description" className="form__label">
              Description
            </label>

            <Field
              name="description"
              component={TextArea}
              type="text"
              placeholder="Description"
              rows={7}
            />
          </div>

          <button
            type="submit"
            disabled={pristine || submitting}
            className="btn edit-route--btn"
          >
            Update
          </button>
        </form>
      </div>
    );
  }
}

const actions = {
  updateRoute
};

const mapState = state => {
  let uid;

  if (state.firebase.auth.uid && state.firestore.ordered) {
    uid = state.firebase.auth.uid;
  }
  return {
    uid,
    profile: state.firestore.ordered.users
  };
};

export default withRouter(
  compose(
    connect(
      mapState,
      actions
    ),
    firestoreConnect(uid => userDetailedQuery(uid)),
    reduxForm({
      form: "editRoute",
      enableReinitialize: true
    })
  )(RouteField)
);
