import React, { Component } from "react";
import UserProfileLevel from "../../profile/profilelevel/UserProfileLevel";
import { createUserProfile } from "../../profile/ProfileActions";
import { getRank } from "../../tracker/userrank/UserRankActions";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class SignedInMenu extends Component {
  state = {
    rank: "-"
  };

  async componentDidUpdate(prevProps) {
    const {
      profile,
      getRank,
      currentSession,
      createUserProfile,
      users
    } = this.props;

    const windowWidth = window.innerWidth;

    if (this.props.profile !== prevProps.profile && windowWidth >= 700) {
      const id = profile.uid;
      const rank = await getRank(currentSession, profile);
      const currentUser = createUserProfile(id, users);

      currentUser.getUserLevel("mainLevel", profile);
      this.setState({ rank });
    }
  }

  unCheck = () => {
    this.refs["navbar"].checked = false;
  };

  render() {
    const { signOut, profile, mainLevel } = this.props;
    const { rank } = this.state;

    return (
      <React.Fragment>
        <div className="navbar__main">
          <div className="navbar__level">
            <UserProfileLevel currentUser={profile} level={mainLevel} />
          </div>

          <input
            ref="navbar"
            type="checkbox"
            id="navbar__toggle"
            className="navbar__checkbox"
          />

          <label htmlFor="navbar__toggle" className="navbar__button">
            <span className="navbar__profile">
              <img
                src={profile.photoURL || "assets/user.png"}
                alt="profile picture"
                className="navbar__image"
              />
            </span>
            <div className="navbar__background"></div>
          </label>

          <div className="navbar__name">
            {profile.firstName} {profile.lastName}
          </div>

          <div className="navbar__rank">
            <div className="navbar__rank-content">
              <div className="navbar__rank-title">Rank</div>
              {rank}
            </div>
          </div>

          {/* NAV LINKS */}
          <div className="navbar__main-nav">
            <ul className="navbar__main-list">
              <li onClick={() => this.unCheck()} className="navbar__main-item">
                <Link to={"/tracker"} className="navbar__main-link">
                  Tracker
                </Link>
              </li>

              <li onClick={() => this.unCheck()} className="navbar__main-item">
                <Link to={"/profile"} className="navbar__main-link">
                  Profile
                </Link>
              </li>

              <li onClick={() => this.unCheck()} className="navbar__main-item">
                <Link to={"/rules"} className="navbar__main-link">
                  Rules
                </Link>
              </li>

              <li onClick={() => this.unCheck()} className="navbar__main-item">
                <Link to={"/admin"} className="navbar__main-link">
                  Admin
                </Link>
              </li>

              <li onClick={() => this.unCheck()} className="navbar__main-item">
                <a onClick={signOut} href="#" className="navbar__main-link">
                  logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const actions = {
  createUserProfile,
  getRank
};

const mapState = state => ({
  profile: state.firebase.profile,
  mainLevel: state.profile.mainLevel,
  users: state.firestore.ordered.users,
  currentSession: state.currentSession.currentSession
});

export default connect(
  mapState,
  actions
)(SignedInMenu);
