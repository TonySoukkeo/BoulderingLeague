import React, { Component } from "react";
import format from "date-fns/format";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

class UserAchievements extends Component {
  render() {
    const { achievements, user } = this.props;
    let hasAchievements = [];
    if (achievements) {
      achievements.map(achievement => {
        if (achievement.completedBy.hasOwnProperty(user.uid)) {
          let completedOn = achievement.completedBy[user.uid].completedOn;

          hasAchievements.push({
            name: achievement.name,
            uid: achievement.uid,
            completedOn,
            img: achievement.img,
            details: achievement.details,
            xp: achievement.xp
          });
        }
      });
    }
    return (
      <div
        style={{
          height: "300px",
          paddingTop: "20px"
        }}
        className="container-fluid"
      >
        <h1 className="text-center">Achievements</h1>
        {hasAchievements.length === 0 ? (
          <div>
            <p>No achievements</p>
          </div>
        ) : (
          <div className="row">
            {hasAchievements.map(x => (
              <div
                key={x.uid}
                style={{
                  width: "100%",
                  marginTop: "20px",
                  marginBottom: "20px"
                }}
                className="col-lg-6"
              >
                <div
                  style={{
                    background: "#ededed",
                    width: "100%",
                    position: "relative"
                  }}
                  className="d-flex flex-row"
                >
                  <div key={x.uid}>
                    <img className="achievement-icon" src={x.img} />
                  </div>
                  <div className="achievement-text-container">
                    <span className="achievement-name">{x.name}</span>
                    <p className="achievement-details">{x.details}</p>
                  </div>
                  <div className="achievement-xp">{x.xp} XP</div>
                  <div className="achievement-date">
                    {format(x.completedOn, "MMMM D YYYY")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

const mapState = state => {
  return {
    achievements: state.firestore.ordered.Achievements
  };
};

export default compose(
  connect(mapState),
  firestoreConnect([{ collection: "Achievements" }])
)(UserAchievements);
