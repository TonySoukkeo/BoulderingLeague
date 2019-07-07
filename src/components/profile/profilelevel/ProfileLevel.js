import React, { Component } from "react";
import { profileRankQuery } from "./ProfileQuery";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

// Levels
const levels = [
  {
    rank: 1,
    neededXp: 10,
    requiredAmount: 0,
    img: "/assets/rankings/rank-1.png"
  },
  {
    rank: 2,
    requiredAmount: 10,
    neededXp: 20,
    img: "/assets/rankings/rank-2.png"
  },
  {
    rank: 3,
    requiredAmount: 20,
    neededXp: 40,
    img: "/assets/rankings/rank-3.png"
  },
  {
    rank: 4,
    requiredAmount: 40,
    neededXp: 80,
    img: "/assets/rankings/rank-4.png"
  },
  {
    rank: 5,
    requiredAmount: 80,
    neededXp: 160,
    img: "/assets/rankings/rank-5.png"
  },
  {
    rank: 6,
    requiredAmount: 160,
    neededXp: 320,
    img: "/assets/rankings/rank-6.png"
  },
  {
    rank: 7,
    requiredAmount: 320,
    neededXp: 640,
    img: "/assets/rankings/rank-7.png"
  },
  {
    rank: 8,
    requiredAmount: 640,
    neededXp: 1280,
    img: "/assets/rankings/rank-8.png"
  },
  {
    rank: 9,
    requiredAmount: 1280,
    neededXp: 1650,
    img: "/assets/rankings/rank-9.png"
  },
  {
    rank: 10,
    requiredAmount: 1650,
    neededXp: 1980,
    img: "/assets/rankings/rank-10.png"
  },
  {
    rank: 11,
    requiredAmount: 1980,
    neededXp: 2450,
    img: "/assets/rankings/rank-11.png"
  },
  {
    rank: 12,
    requiredAmount: 2450,
    neededXp: 2970,
    img: "/assets/rankings/rank-12.png"
  },
  {
    rank: 13,
    requiredAmount: 2970,
    neededXp: 3725,
    img: "/assets/rankings/rank-13.png"
  },
  {
    rank: 14,
    requiredAmount: 3725,
    neededXp: 4625,
    img: "/assets/rankings/rank-14.png"
  },
  {
    rank: 15,
    requiredAmount: 4625,
    neededXp: 5700,
    img: "/assets/rankings/rank-15.png"
  },
  {
    rank: 16,
    requiredAmount: 5700,
    neededXp: 6920,
    img: "/assets/rankings/rank-16.png"
  },
  {
    rank: 17,
    requiredAmount: 6920,
    neededXp: 8100,
    img: "/assets/rankings/rank-17.png"
  },
  {
    rank: 18,
    requiredAmount: 8100,
    neededXp: 10000,
    img: "/assets/rankings/rank-18.png"
  },
  {
    rank: 19,
    requiredAmount: 10000,
    neededXp: 13250,
    img: "/assets/rankings/rank-19.png"
  },
  {
    rank: 20,
    requiredAmount: 13250,
    neededXp: 17000,
    img: "/assets/rankings/rank-20.png"
  },
  {
    rank: 21,
    requiredAmount: 17000,
    neededXp: 21125,
    img: "/assets/rankings/rank-21.png"
  },
  {
    rank: 22,
    requiredAmount: 21125,
    neededXp: 26000,
    img: "/assets/rankings/rank-22.png"
  },
  {
    rank: 23,
    requiredAmount: 26000,
    neededXp: 30110,
    img: "/assets/rankings/rank-23.png"
  },
  {
    rank: 24,
    requiredAmount: 30110,
    neededXp: 35100,
    img: "/assets/rankings/rank-24.png"
  },
  {
    rank: 25,
    requiredAmount: 35100,
    neededXp: 40015,
    img: "/assets/rankings/rank-25.png"
  },
  {
    rank: 26,
    requiredAmount: 40015,
    neededXp: 46080,
    img: "/assets/rankings/rank-26.png"
  },
  {
    rank: 27,
    requiredAmount: 46080,
    neededXp: 53015,
    img: "/assets/rankings/rank-27.png"
  },
  {
    rank: 28,
    requiredAmount: 53015,
    neededXp: 60895,
    img: "/assets/rankings/rank-28.png"
  },
  {
    rank: 29,
    requiredAmount: 60895,
    neededXp: 67222,
    img: "/assets/rankings/rank-29.png"
  },
  {
    rank: 30,
    requiredAmount: 67222,
    neededXp: 74615,
    img: "/assets/rankings/rank-30.png"
  },
  {
    rank: 31,
    requiredAmount: 74615,
    neededXp: 82120,
    img: "/assets/rankings/rank-31.png"
  },
  {
    rank: 32,
    requiredAmount: 82120,
    neededXp: 92010,
    img: "/assets/rankings/rank-32.png"
  },
  {
    rank: 33,
    requiredAmount: 92010,
    neededXp: 100110,
    img: "/assets/rankings/rank-33.png"
  },
  {
    rank: 34,
    requiredAmount: 100110,
    neededXp: 110520,
    img: "/assets/rankings/rank-34.png"
  },
  {
    rank: 35,
    requiredAmount: 110520,
    neededXp: 122100,
    img: "/assets/rankings/rank-35.png"
  },
  {
    rank: 36,
    requiredAmount: 122100,
    neededXp: 134560,
    img: "/assets/rankings/rank-36.png"
  },
  {
    rank: 37,
    requiredAmount: 134560,
    neededXp: 147070,
    img: "/assets/rankings/rank-37.png"
  },
  {
    rank: 38,
    requiredAmount: 147070,
    neededXp: 161270,
    img: "/assets/rankings/rank-38.png"
  },
  {
    rank: 39,
    requiredAmount: 161270,
    neededXp: 176270,
    img: "/assets/rankings/rank-39.png"
  },
  {
    rank: 40,
    requiredAmount: 176270,
    neededXp: 194270,
    img: "/assets/rankings/rank-40.png"
  },
  {
    rank: 41,
    requiredAmount: 194270,
    neededXp: 211390,
    img: "/assets/rankings/rank-41.png"
  },
  {
    rank: 42,
    requiredAmount: 211390,
    neededXp: 228990,
    img: "/assets/rankings/rank-42.png"
  },
  {
    rank: 43,
    requiredAmount: 228990,
    neededXp: 246590,
    img: "/assets/rankings/rank-43.png"
  },
  {
    rank: 44,
    requiredAmount: 246590,
    neededXp: 264590,
    img: "/assets/rankings/rank-44.png"
  },
  {
    rank: 45,
    requiredAmount: 264590,
    neededXp: 282300,
    img: "/assets/rankings/rank-45.png"
  },
  {
    rank: 46,
    requiredAmount: 282300,
    neededXp: 305105,
    img: "/assets/rankings/rank-46.png"
  },
  {
    rank: 47,
    requiredAmount: 305105,
    neededXp: 321005,
    img: "/assets/rankings/rank-47.png"
  },
  {
    rank: 48,
    requiredAmount: 321005,
    neededXp: 351200,
    img: "/assets/rankings/rank-48.png"
  },
  {
    rank: 49,
    requiredAmount: 351200,
    neededXp: 390025,
    img: "/assets/rankings/rank-49.png"
  },
  {
    rank: 50,
    requiredAmount: 390025,
    neededXp: 0,
    img: "/assets/rankings/rank-50.png"
  }
];

class ProfileLevel extends Component {
  render() {
    const { auth, currentUser } = this.props;

    let level, test;

    if (currentUser && currentUser.uid === auth.uid) {
      // Check current user xp and rank
      if (!currentUser.experiencePoints || currentUser.experiencePoints === 0) {
        console.log("Does not have xp points");
        level = {
          rank: 1,
          neededXp: 10,
          requiredAmount: 0,
          img: "/assets/rankings/rank-1.png"
        };
      } else {
        // Loop through levels array and compare to see what rank current user is at
        levels.filter(x => {
          if (x.requiredAmount <= currentUser.experiencePoints) {
            level = x;
          }
        });
      }
    }

    if (level && auth) {
      test = (
        <div
          style={{
            background: "#25234e"
          }}
          className="card mb-3"
        >
          <div className="row">
            <div className="col-12">
              <img
                style={{
                  width: "80.34px",
                  height: "79px",
                  marginRight: "10px"
                }}
                src={level && level.img}
                alt="rank"
              />
              <span
                style={{
                  fontSize: "1.6rem"
                }}
              >
                {" "}
                {(currentUser && currentUser.experiencePoints) || 0}{" "}
              </span>{" "}
              <span
                style={{
                  fontSize: "1.8rem"
                }}
              >
                {" "}
                /
              </span>{" "}
              <span
                style={{
                  fontSize: "1.8rem",
                  color: "#6fbf60"
                }}
              >
                {level && level.neededXp} xp
              </span>
            </div>
          </div>
        </div>
      );
    }

    return <div>{test}</div>;
  }
}

const mapState = state => {
  let id, currentUser;
  if (state.firebase.auth && state.firebase.auth.uid) {
    id = state.firebase.auth.uid;
  }
  if (state.firestore.ordered.users) {
    currentUser = state.firestore.ordered.users[0];
  }
  return {
    id,
    auth: state.firebase.auth,
    currentUser
  };
};

export default compose(
  connect(mapState),
  firestoreConnect(id => profileRankQuery(id))
)(ProfileLevel);
