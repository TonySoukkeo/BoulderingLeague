import React, { Component } from "react";
import { connect } from "react-redux";
import Dropzone from "react-dropzone";
import "cropperjs/dist/cropper.css";
import Cropper from "react-cropper";
import { uploadProfileImage } from "../user/UserActions";
import { toastr } from "react-redux-toastr";
import { Link } from "react-router-dom";

class UploadImage extends Component {
  state = {
    files: [],
    fileName: "",
    cropResult: null,
    image: {}
  };

  onDrop = files => {
    this.setState({
      files,
      fileName: files[0].name
    });
  };

  uploadImage = async () => {
    const { uploadProfileImage, history } = this.props,
      { image, fileName } = this.state;

    try {
      await uploadProfileImage(image, fileName);
      this.cancelCrop();
      history.push("/profile");
      toastr.success("Success", "Profile Picture Updated");
    } catch (error) {
      toastr.error("Oops", "Could not upload image");
    }
  };

  cropImage = () => {
    if (typeof this.refs.cropper.getCroppedCanvas() === "undefined") {
      return;
    }
    this.refs.cropper.getCroppedCanvas().toBlob(blob => {
      let imageUrl = URL.createObjectURL(blob);
      this.setState({
        cropResult: imageUrl,
        image: blob
      });
    }, "image/jpeg");
  };

  cancelCrop = () => {
    this.setState({
      files: [],
      image: {}
    });
  };

  render() {
    const { files, cropResult } = this.state;

    return (
      <div className="container mt-4 mb-3">
        <div className="row">
          <div className="col-md-6 mb-2">
            <Link to="/profile" className="btn btn-back">
              <i className="fas fa-arrow-circle-left" /> Back to Profile
            </Link>
          </div>
        </div>
        <div className="card">
          <div className="card-header text-center">
            <h3>Change Profile Image</h3>
          </div>
          <div className="card-body">
            <div className="mt-3 row">
              <div className="col-md-4">
                <p className="picture-upload-text">step 1 - add photo</p>
                <Dropzone onDrop={this.onDrop} multiple={false}>
                  <div className="text-center mt-4">
                    <i className="fas fa-file-upload fa-3x upload-image" />
                    <h4 className="mt-4">Drop image here or click to add</h4>
                  </div>
                </Dropzone>
              </div>
              <div className="col-md-4">
                <p className="picture-upload-text">step 2 - resize image</p>
                {files[0] && (
                  <Cropper
                    style={{ height: "200px", width: "100%" }}
                    ref="cropper"
                    src={files[0].preview}
                    aspectRatio={1}
                    viewMode={0}
                    dragMode="move"
                    guides={false}
                    scalable={true}
                    cropBoxMovable={true}
                    cropBoxResizable={true}
                    crop={this.cropImage}
                  />
                )}
              </div>
              <div className="col-md-4">
                <p className="picture-upload-text">
                  step 3 - review and upload
                </p>
                {files[0] && (
                  <div>
                    <img
                      style={{ height: "200px", width: "200px" }}
                      alt="pictures"
                      src={cropResult}
                    />
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <button
                          onClick={this.uploadImage}
                          style={{ width: "100px" }}
                          className="btn btn-success"
                        >
                          {" "}
                          <i className="fas fa-check" />
                        </button>
                        <button
                          // disabled={loading}
                          onClick={this.cancelCrop}
                          style={{ width: "100px" }}
                          className="btn btn-danger"
                        >
                          <i className="fas fa-times" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const actions = {
  uploadProfileImage
};

export default connect(
  null,
  actions
)(UploadImage);
