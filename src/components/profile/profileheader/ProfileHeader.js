import React, { Component } from "react";
import Dropzone from "react-dropzone";
import "cropperjs/dist/cropper.css";
import { connect } from "react-redux";
import { uploadProfileImage } from "../user/UserActions";
import {
  IMAGE_OPEN,
  CLOSE_MODAL
} from "../../modals/modalsaction/ModalConstants";
import { modalToggle } from "../../modals/modalsaction/ModalsAction";
import Spinner from "../../../common/helpers/Spinner";

class ProfileHeader extends Component {
  state = {
    type: "",
    files: [],
    fileName: ""
  };

  imageModal = type => {
    const { modalToggle } = this.props;

    modalToggle(IMAGE_OPEN);

    this.setState({
      type
    });
  };

  closeModal = () => {
    const { modalToggle } = this.props;

    this.setState({
      files: [],
      fileName: "",
      type: ""
    });

    modalToggle(CLOSE_MODAL);
  };

  onDrop = image => {
    this.setState({
      files: image[0],
      fileName: image[0].name
    });
  };

  uploadImage = async () => {
    const { files, fileName, type } = this.state,
      { uploadProfileImage, modalToggle } = this.props;

    try {
      await uploadProfileImage(files, fileName, type);
      // Close modal
      this.setState({ files: [], fileName: "", type: "" });
      modalToggle(CLOSE_MODAL);
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { files, type } = this.state,
      { user, modal, loading } = this.props;

    return (
      <React.Fragment>
        <div
          onClick={() => this.imageModal("banner")}
          className="profile__header-banner-edit"
        >
          <i className="fas fa-edit"></i>
        </div>

        <img
          src={user.bannerURL || "/assets/banner.jpg"}
          alt="profile banner"
          className="profile__header-banner"
        />

        <img
          className="profile__header-img"
          src={user.photoURL || "/assets/user.png"}
          alt="profile picture"
        />

        <button
          onClick={() => this.imageModal("profile")}
          className="btn profile__header-edit-btn"
        >
          Edit Image
        </button>

        {/** POPUP MODAL **/}
        <div className={modal ? "popup popup-active profile-modal" : "popup"}>
          <div className="profile-modal__header">
            {type === "profile" ? "Profile Image" : "Banner Image"}
            <i
              onClick={this.closeModal}
              className="fas fa-times popup__icon"
            ></i>
          </div>

          <div className="profile-modal__content profile-modal__content--image">
            <Dropzone style={{}} onDrop={this.onDrop} multiple={false}>
              <div className="profile-modal__upload">
                <div
                  className={
                    files.length === 0
                      ? "profile-modal__upload-icon profile-modal__icon-active"
                      : "profile-modal__upload-icon"
                  }
                >
                  <i className="fas fa-file-upload fa-3x upload-image mb-small" />
                </div>

                <div
                  className={
                    files.length === 0
                      ? "profile-modal__check-icon"
                      : "profile-modal__check-icon profile-modal__icon-active"
                  }
                >
                  <i className="fas fa-check upload-image fa-3x"></i>
                </div>

                <h4>Upload image</h4>
              </div>
            </Dropzone>

            {loading ? (
              <div>
                <Spinner />
              </div>
            ) : (
              <button
                className={
                  files.length === 0
                    ? "btn profile-modal__footer-btn"
                    : "btn profile-modal__footer-btn-active"
                }
                onClick={() => this.uploadImage(type)}
                disabled={files.length === 0 ? true : false}
              >
                Save
              </button>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const actions = {
  uploadProfileImage,
  modalToggle
};

const mapStateToProps = state => ({
  modal: state.modal.imageModal,
  loading: state.loading.loading
});

export default connect(
  mapStateToProps,
  actions
)(ProfileHeader);
