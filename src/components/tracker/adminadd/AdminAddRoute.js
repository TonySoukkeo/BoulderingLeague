import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { isRequired, combineValidators } from "revalidate";
import { addRoute } from "../../routes/RoutesAction";
import TextArea from "../../../common/form/TextArea";
import TextInput from "../../../common/form/TextInput";
import SelectInput from "../../../common/form/SelectInput";
import { toastr } from "react-redux-toastr";
import { modalToggle } from "../../modals/modalsaction/ModalsAction";
import { CLOSE_MODAL } from "../../modals/modalsaction/ModalConstants";

const session = [{ key: "session3", text: "Session 3", value: "session3" }], // change for each session change
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
    if (route.routeName.includes("#")) {
      toastr.error("Error", "Name cannot include #");
    } else {
      // Add route
      addRoute(route);
      // hide display
      hideRoute();
    }
  };

  closeModal = () => {
    const { modalToggle } = this.props;

    modalToggle(CLOSE_MODAL);
  };

  render() {
    const { handleSubmit, pristine, submitting, addRoutesModal } = this.props;

    return (
      <div className={addRoutesModal ? "popup  popup-active" : "popup "}>
        <form className="form" onSubmit={handleSubmit(this.addNewRoute)}>
          <div className="form__header">
            <i
              onClick={this.closeModal}
              className="fas fa-times popup__icon"
            ></i>
          </div>

          <div className="form__group">
            <label className="form__label" htmlFor="session">
              Session:
            </label>
            <Field
              name="session"
              component={SelectInput}
              type="text"
              options={session}
              multiple={false}
            />
          </div>

          <div className="form__group">
            <Field
              name="routeName"
              component={TextInput}
              type="text"
              placeholder="Route Name"
              className="form-control"
            />
          </div>

          <div className="form__group add-routes__location">
            <img
              className="add-routes__location-img"
              src="/assets/gym_layout/gym-layout.png"
              alt="gym layout"
            />
          </div>

          <div className="form__group">
            <label className="form__label" htmlFor="location">
              Route Location
            </label>

            <Field
              name="location"
              type="number"
              component={SelectInput}
              options={location}
              multiple={false}
            />
          </div>

          <div className="form__group">
            <label className="form__label" htmlFor="routeGrade">
              Grade:{" "}
            </label>

            <Field
              name="routeGrade"
              component={SelectInput}
              type="text"
              options={grade}
              multiple={false}
            />
          </div>

          <div className="form__group">
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
            style={{ float: "right" }}
            className="btn form__btn"
          >
            Add
          </button>
        </form>
      </div>
    );
  }
}

const actions = {
  addRoute,
  modalToggle
};

const mapState = state => ({
  addRoutesModal: state.modal.addRoutesModal
});

export default connect(
  mapState,
  actions
)(
  reduxForm({ form: "addRoutes", validate, enableReinitialize: true })(
    AdminAddRoute
  )
);
