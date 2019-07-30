import { toastr } from "react-redux-toastr";
import uuid from "uuid";
import moment from "moment";

// Check for achievements and add XP points

export const getAchievements = user => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  // Get total number of attempts
  let overallAttempts = 1;
  if (user.attempts) {
    // Loop through attempts objects in user
    const attempts = user.attempts;

    for (let x in attempts) {
      // Loop through second object for attempts
      for (let y in attempts[x]) {
        overallAttempts += attempts[x][y].attempts;
      }
    }
  }

  // Achievement constants
  const achievements = [
    {
      name: "The first of many",
      details: "First v0 climbed",
      value: user.hasOwnProperty("v0") && user.v0 !== 0,
      xp: 20,
      img: "/assets/achievements/v0-badge.png"
    },
    {
      name: "Moving on up",
      details: "First v1 climbed",
      value: user.hasOwnProperty("v1") && user.v1 >= 1,
      xp: 50,
      img: "/assets/achievements/v1-badge.png"
    },
    {
      name: "The first hurdle",
      details: "First v2 climbed",
      value: user.hasOwnProperty("v2") && user.v2 >= 1,
      xp: 150,
      img: "/assets/achievements/v2-badge.png"
    },
    {
      name: "Level up!",
      details: "First v3 climbed",
      value: user.hasOwnProperty("v3") && user.v3 >= 1,
      xp: 300,
      img: "/assets/achievements/v3-badge.png"
    },
    {
      name: "Gets harder from here",
      details: "First v4 climbed",
      value: user.hasOwnProperty("v4") && user.v4 >= 1,
      xp: 600,
      img: "/assets/achievements/v4-badge.png"
    },
    {
      name: "Overcoming the odds",
      details: "First v5 climbed",
      value: user.hasOwnProperty("v5") && user.v5 >= 1,
      xp: 1200,
      img: "/assets/achievements/v5-badge.png"
    },
    {
      name: "Is that Erik?",
      details: "First v6 climbed",
      value: user.hasOwnProperty("v6") && user.v6 >= 1,
      xp: 1600,
      img: "/assets/achievements/v6-badge.png"
    },
    {
      name: "Erik Sandaker",
      details: "First v7 climbed",
      value: user.hasOwnProperty("v7") && user.v7 >= 1,
      xp: 2000,
      img: "/assets/achievements/v7-badge.png"
    },
    {
      name: "v?",
      details: "First special route climbed",
      value: user.hasOwnProperty("special") && user.special >= 1,
      xp: 2000,
      img: "/assets/achievements/special-badge.png"
    },
    {
      name: "Pioneer",
      details: "Participated in session 1",
      value:
        user.hasOwnProperty("attempts") &&
        user.attempts.hasOwnProperty("session1"),
      xp: 50,
      img: "/assets/achievements/pioneer.jpg"
    },
    {
      name: "Onwards",
      details: "Participated in session 2",
      value:
        user.hasOwnProperty("attempts") &&
        user.attempts.hasOwnProperty("session2"),
      xp: 50,
      img: "/assets/achievements/session2.png"
    },
    {
      name: "Just warming up",
      details: "Have over 10 attempts in total",
      value: overallAttempts > 10,
      xp: 75,
      img: "/assets/achievements/just-warming-up.png"
    },
    {
      name: "No sweat..",
      details: "Have over 25 attempts in total",
      value: overallAttempts > 25,
      xp: 100,
      img: "/assets/achievements/no-sweat.png"
    },
    {
      name: "The engine that could",
      details: "Have over 60 attempts in total",
      value: overallAttempts > 60,
      xp: 130,
      img: "/assets/achievements/the-engine-that-could.png"
    }
  ];

  const firestore = getFirestore(),
    firebase = getFirebase(),
    db = firebase.firestore(),
    collection = db.collection("Achievements"),
    completedOn = moment(Date.now()).toDate(),
    uid = uuid();

  achievements.map(achievement => {
    // Check to see if user profile meets required value of achievement
    if (achievement.value) {
      const currentCollection = collection.doc(`${achievement.name}`);
      // Check to see if achievement has been posted already
      currentCollection.get().then(doc => {
        if (doc.exists) {
          const completedBy = doc.data().completedBy;
          // Check to see if user has achievement unlocked already
          if (!completedBy.hasOwnProperty(user.uid)) {
            // Set achievement for user
            firestore.set(
              `Achievements/${achievement.name}`,
              {
                completedBy: {
                  [user.uid]: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    completedOn,
                    uid: user.uid
                  }
                }
              },
              { merge: true }
            );

            setTimeout(function() {
              // Add xp points from profile
              return db
                .collection("users")
                .doc(`${user.uid}`)
                .get()
                .then(res => {
                  let xpPoints = res.data().experiencePoints;

                  firestore.set(
                    `users/${user.uid}`,
                    {
                      experiencePoints: (xpPoints += achievement.xp)
                    },
                    {
                      merge: true
                    }
                  );
                });
            }, 1000);

            // Achievement alert
            toastr.success(`Achievement Unlocked`, `${achievement.name}`);
          }
        } else {
          // Post new achivement onto firestore with user
          firestore.set(
            `Achievements/${achievement.name}`,
            {
              completedBy: {
                [user.uid]: {
                  firstName: user.firstName,
                  lastName: user.lastName,
                  completedOn,
                  uid: user.uid
                }
              },
              img: achievement.img || null,
              name: achievement.name,
              details: achievement.details,
              xp: achievement.xp,
              uid
            },
            { merge: true }
          );

          setTimeout(function() {
            // Add xp points from profile
            return db
              .collection("users")
              .doc(`${user.uid}`)
              .get()
              .then(res => {
                let xpPoints = res.data().experiencePoints;

                firestore.set(
                  `users/${user.uid}`,
                  {
                    experiencePoints: (xpPoints += achievement.xp)
                  },
                  {
                    merge: true
                  }
                );
              });
          }, 2000);

          // Achievement alert
          toastr.success(`Achievement Unlocked`, `${achievement.name}`);
        }
      });
    }
  });
};

// Remove xp points
export const removeAchievementXp = user => async (
  getState,
  dispatch,
  { getFirestore, getFirebase }
) => {
  // Get total number of attempts
  let initialAttempts = 1,
    overallAttempts;
  if (user.attempts) {
    // Loop through attempts objects in user
    const attempts = user.attempts;

    for (let x in attempts) {
      // Loop through second object for attempts
      for (let y in attempts[x]) {
        initialAttempts += attempts[x][y].attempts;
      }
      overallAttempts = initialAttempts - 2;
    }
  }

  // Achievement constants
  const achievements = [
    {
      name: "The first of many",
      details: "First v0 climbed",
      value: user.hasOwnProperty("v0") && user.v0 !== 0,
      xp: 20,
      img: "/assets/achievements/v0-badge.png"
    },
    {
      name: "Moving on up",
      details: "First v1 climbed",
      value: user.hasOwnProperty("v1") && user.v1 >= 1,
      xp: 50,
      img: "/assets/achievements/v1-badge.png"
    },
    {
      name: "The first hurdle",
      details: "First v2 climbed",
      value: user.hasOwnProperty("v2") && user.v2 >= 1,
      xp: 150,
      img: "/assets/achievements/v2-badge.png"
    },
    {
      name: "Level up!",
      details: "First v3 climbed",
      value: user.hasOwnProperty("v3") && user.v3 >= 1,
      xp: 300,
      img: "/assets/achievements/v3-badge.png"
    },
    {
      name: "Gets harder from here",
      details: "First v4 climbed",
      value: user.hasOwnProperty("v4") && user.v4 >= 1,
      xp: 600,
      img: "/assets/achievements/v4-badge.png"
    },
    {
      name: "Overcoming the odds",
      details: "First v5 climbed",
      value: user.hasOwnProperty("v5") && user.v5 >= 1,
      xp: 1200,
      img: "/assets/achievements/v5-badge.png"
    },
    {
      name: "Is that Erik?",
      details: "First v6 climbed",
      value: user.hasOwnProperty("v6") && user.v6 >= 1,
      xp: 1600,
      img: "/assets/achievements/v6-badge.png"
    },
    {
      name: "Erik Sandaker",
      details: "First v7 climbed",
      value: user.hasOwnProperty("v7") && user.v7 >= 1,
      xp: 2000,
      img: "/assets/achievements/v7-badge.png"
    },
    {
      name: "v?",
      details: "First special route climbed",
      value: user.hasOwnProperty("special") && user.special >= 1,
      xp: 2000,
      img: "/assets/achievements/special-badge.png"
    },
    {
      name: "Pioneer",
      details: "Participated in session 1",
      value:
        user.hasOwnProperty("attempts") &&
        user.attempts.hasOwnProperty("session1"),
      xp: 50,
      img: "/assets/achievements/pioneer.jpg"
    },
    {
      name: "Onwards",
      details: "Participated in session 2",
      value:
        user.hasOwnProperty("attempts") &&
        user.attempts.hasOwnProperty("session2"),
      xp: 50,
      img: "/assets/achievements/session2.png"
    },
    {
      name: "Just warming up",
      details: "Have over 10 attempts in total",
      value: overallAttempts > 10,
      xp: 75,
      img: "/assets/achievements/just-warming-up.png"
    },
    {
      name: "No sweat..",
      details: "Have over 25 attempts in total",
      value: overallAttempts > 25,
      xp: 100,
      img: "/assets/achievements/no-sweat.png"
    },
    {
      name: "The engine that could",
      details: "Have over 60 attempts in total",
      value: overallAttempts > 60,
      xp: 130,
      img: "/assets/achievements/the-engine-that-could.png"
    }
  ];

  const firestore = getFirestore(),
    firebase = getFirebase(),
    db = firebase.firestore(),
    collection = db.collection("Achievements");

  achievements.map(achievement => {
    if (!achievement.value) {
      collection.get().then(res => {
        res.docs.map(x => {
          if (
            x.id === achievement.name &&
            x.data().completedBy.hasOwnProperty(user.uid)
          ) {
            const achievementName = x.id,
              achievementCollection = db
                .collection("Achievements")
                .doc(`${achievementName}`);

            achievementCollection.update({
              [`completedBy.${
                user.uid
              }`]: firebase.firestore.FieldValue.delete()
            });

            db.collection("users")
              .doc(`${user.uid}`)
              .get()
              .then(res => {
                let xpPoints = res.data().experiencePoints;
                {
                  console.log({
                    achievementName: achievement.name,
                    achievementXp: achievement.xp,
                    xp: xpPoints
                  });
                }
                firestore.set(
                  `users/${user.uid}`,
                  {
                    experiencePoints: (xpPoints -= achievement.xp)
                  },
                  {
                    merge: true
                  }
                );
              });

            // setTimeout(function() {
            //   // Remove xp points
            //   return db
            //     .collection("users")
            //     .doc(`${user.uid}`)
            //     .get()
            //     .then(res => {
            //       let xpPoints = res.data().experiencePoints;
            //       {
            //         console.log({
            //           achievementName: achievement.name,
            //           achievementXp: achievement.xp,
            //           xp: xpPoints
            //         });
            //       }
            //       firestore.set(
            //         `users/${user.uid}`,
            //         {
            //           experiencePoints: (xpPoints -= achievement.xp)
            //         },
            //         {
            //           merge: true
            //         }
            //       );
            //     });
            // }, 1000);
          }
        });
      });
    }
  });
};
