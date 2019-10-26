import React from "react";
import { connect } from "react-redux";

const DarkOverlay = ({ modalOpen }) => {
  return (
    <div
      className={
        modalOpen ? "dark-overlay dark-overlay-active" : "dark-overlay"
      }
    ></div>
  );
};

const mapState = state => ({
  modalOpen: state.modal.modalOpen
});

export default connect(mapState)(DarkOverlay);
