import React, { Component } from "react";
import format from "date-fns/format";
import { connect } from "react-redux";
import { compose } from "redux";
import { modalToggle } from "../../modals/modalsaction/ModalsAction";
import {
  ACHIEVEMENT_OPEN,
  CLOSE_MODAL
} from "../../modals/modalsaction/ModalConstants";
import { firestoreConnect } from "react-redux-firebase";
import { createUserProfile } from "../ProfileActions";

class ProfileAchievements extends Component {
  state = {
    achievementName: null,
    achievementDetails: null,
    achievementXp: null,
    achievementDate: null
  };

  componentDidUpdate(prevProps, prevState) {
    const { createUserProfile, uid, achievements } = this.props;

    if (this.props.achievements !== prevProps.achievements) {
      const profile = createUserProfile(uid);

      profile.getAchievements(achievements);
    }
  }

  openAchievement = (name, details, xp, completedOn) => {
    const { modalToggle } = this.props;

    this.setState({
      achievementName: name,
      achievementDetails: details,
      achievementXp: xp,
      achievementDate: completedOn
    });

    modalToggle(ACHIEVEMENT_OPEN);
  };

  closeAchievement = () => {
    const { modalToggle } = this.props;

    this.setState({
      achievementName: null,
      achievementDetails: null,
      achievementXp: null,
      achievementDate: null
    });

    modalToggle(CLOSE_MODAL);
  };

  render() {
    const { userAchievements, modal } = this.props,
      {
        achievementName,
        achievementDetails,
        achievementXp,
        achievementDate
      } = this.state;

    return (
      <React.Fragment>
        <div className="profile__achievements">
          <div className="profile__achievements-header">
            <h1 className="header-1">Achievements</h1>
          </div>
          <div className="profile__achievements-content">
            {userAchievements.map(x => (
              <div
                key={x.uid}
                onClick={() =>
                  this.openAchievement(x.name, x.details, x.xp, x.completedOn)
                }
                className="profile__achievements-box"
              >
                <img className="profile__achievements-img" src={x.img} />

                <div className="profile__achievements-description">
                  <div className="profile__achievements-description--name">
                    {x.name}
                  </div>

                  <div className="profile__achievements-description--details">
                    {x.details}
                  </div>

                  <div className="profile__achievements-description--footer">
                    <div className="profile__achievements-description--xp">
                      {x.xp} XP
                    </div>

                    <div className="profile__achievements-description--date">
                      {format(x.completedOn, "MMMM D YYYY")}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/** POPUP MODAL **/}
        <div className={modal ? "popup popup-active profile-modal" : "popup"}>
          <div className="profile-modal__header">
            {achievementName}
            <i
              onClick={this.closeAchievement}
              className="fas fa-times popup__icon"
            ></i>
          </div>

          <div className="profile-modal__content">{achievementDetails}</div>

          <div className="profile-modal__footer">
            <div className="profile-modal__footer-xp">
              <span> {achievementXp} xp</span>
            </div>

            <div className="profile-modal__footer-date">
              {format(achievementDate, "MMMM D YYYY")}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const actions = {
  modalToggle,
  createUserProfile
};

const mapState = state => {
  return {
    achievements: state.firestore.ordered.Achievements,
    userAchievements: state.profile.achievement,
    overlay: state.modal.overlay,
    modal: state.modal.achievementModal
  };
};

export default compose(
  connect(
    mapState,
    actions
  ),
  firestoreConnect([{ collection: "Achievements" }])
)(ProfileAchievements);
