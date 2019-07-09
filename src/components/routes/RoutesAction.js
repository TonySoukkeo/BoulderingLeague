import { toastr } from "react-redux-toastr";
import uuid from "uuid";
import moment from "moment";

// Add new route
export const addRoute = route => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  // EXPERIENCE POINTS FOR EACH ROUTE
  const xpPoints = {
    v0: 10,
    v1: 20,
    v2: 45,
    v3: 90,
    v4: 180,
    v5: 350,
    v6: 625,
    v7: 800,
    special: 900
  };

  const firestore = getFirestore(),
    user = getState().firebase.profile;

  if (!route.description) {
    route.description = null;
  }

  try {
    const routeName = route.routeName,
      routeUid = uuid(),
      session = route.session,
      datePosted = Date.now();

    await firestore.set(`${session}/${routeName}`, {
      uid: routeUid,
      experiencePoints: xpPoints[route.routeGrade],
      routeName: route.routeName,
      routeGrade: route.routeGrade,
      description: route.description,
      location: route.location,
      postedBy: `${user.firstName} ${user.lastName}`,
      session: session,
      datePosted: moment(datePosted).toDate()
    });

    // Add and set session active status to new collection, for viewing purposes

    await firestore.set(
      `ActiveSession/${session}`,
      {
        onlineStatus: false
      },
      {
        merge: true
      }
    );

    toastr.success("Success!", "Successfully added!");
    //reload page
    window.location.reload();
  } catch (error) {
    console.log(error);
    toastr.error("Oops", "Error posting route");
  }
};

// Delete Route
export const deleteRoute = route => async (
  getState,
  dispatch,
  { getFirestore }
) => {
  const firestore = getFirestore(),
    routeSession = route.session,
    routeName = route.routeName;

  try {
    await firestore.delete({
      collection: `${routeSession}`,
      doc: `${routeName}`
    });

    // RELOAD PAGE
    window.location.reload();
  } catch (error) {
    console.log(error);
    toastr.error("Oops", "Error in deleting route");
  }
};

// Update Route
export const updateRoute = (route, name, user, profile) => async (
  getState,
  dispatch,
  { getFirestore }
) => {
  const firestore = getFirestore(),
    posted = Date.now(),
    updatedRoute = {
      uid: route.uid,
      routeName: route.routeName,
      location: route.location,
      routeGrade: route.routeGrade,
      description: route.description,
      postedBy: `${user.firstName} ${user.lastName}`,
      session: route.session,
      datePosted: posted
    };

  console.log(updatedRoute);

  try {
    // Update Route
    await firestore.update(`${route.session}/${route.routeName}`, route);

    toastr.success("Success", "Route updated");
  } catch (error) {
    console.log(error);
    toastr.error("Oops", "Could not update route");
  }
};

// Route marked complete
export const completedRoute = (auth, route, user) => async (
  getState,
  dispatch,
  { getFirestore }
) => {
  const firestore = getFirestore(),
    session = `${route.session}Total`,
    completedOn = moment(Date.now()).toDate();

  let sessionTotal = 0,
    overallTotal = 0,
    total = 0,
    routeGradeTotal = 0,
    attempts = user.attempts[route.session][route.uid].attempts;

  // Check to see how many attempts it took to complete the route

  if (attempts === 1) {
    // Add route grade total to user profile
    if (!user[route.routeGrade]) {
      user[route.routeGrade] = routeGradeTotal += 1;
      firestore.set(
        `users/${auth.uid}`,
        {
          [route.routeGrade]: routeGradeTotal
        },
        {
          merge: true
        }
      );
    } else {
      routeGradeTotal = user[route.routeGrade] += 1;
      firestore.set(
        `users/${auth.uid}`,
        {
          [route.routeGrade]: routeGradeTotal
        },
        {
          merge: true
        }
      );
    }

    if (!route.total) {
      route.total = total += 1;
      firestore.set(
        `${route.session}/${route.routeName}`,
        {
          total
        },
        {
          merge: true
        }
      );
    } else {
      total = route.total += 1;
      firestore.set(
        `${route.session}/${route.routeName}`,
        {
          total
        },
        {
          merge: true
        }
      );
    }

    //Add XP points to user
    if (
      user.hasOwnProperty("experiencePoints") &&
      user.experiencePoints !== 0
    ) {
      let xpPoints = user.experiencePoints;
      console.log(route);
      firestore.set(
        `users/${auth.uid}`,
        {
          experiencePoints: (xpPoints += route.experiencePoints)
        },
        {
          merge: true
        }
      );
    } else {
      firestore.set(
        `users/${auth.uid}`,
        {
          experiencePoints: route.experiencePoints
        },
        { merge: true }
      );
    }

    if (user.session && user.session[session]) {
      sessionTotal = user.session[session] += 2;

      firestore.set(
        `users/${auth.uid}`,
        {
          session: {
            [session]: sessionTotal
          }
        },
        { merge: true }
      );
    } else {
      // Add one point to session total
      sessionTotal += 2;

      // Add point to session total
      firestore.set(
        `users/${auth.uid}`,
        {
          session: {
            [session]: sessionTotal
          }
        },
        { merge: true }
      );
    }

    if (user.overallTotal) {
      overallTotal = user.overallTotal;
      // Set overall total
      firestore.set(
        `users/${auth.uid}`,
        {
          overallTotal: (overallTotal += 2)
        },
        { merge: true }
      );
    } else {
      firestore.set(
        `users/${auth.uid}`,
        {
          overallTotal: (overallTotal += 2)
        },
        { merge: true }
      );
    }

    try {
      // Add user to route completed list
      const routeSubCollection = {
        collection: `${route.session}`,
        doc: route.routeName,
        subcollections: [{ collection: "completed", doc: `${auth.uid}` }]
      };

      firestore.set(routeSubCollection, {
        completedOn,
        firstName: user.firstName,
        lastName: user.lastName,
        id: auth.uid,
        division: user.division,
        photoUrl: user.photoURL || "assets/user.png"
      });

      // Create subcollection of current session and route in user profile
      const subCollection = {
        collection: "users",
        doc: auth.uid,
        subcollections: [
          { collection: `${route.session}`, doc: `${route.uid}` }
        ]
      };
      // Add data to subcollection
      firestore.set(subCollection, {
        completedOn,
        uid: route.uid,
        routeName: route.routeName,
        grade: route.routeGrade
      });

      // Add route to main profile
      firestore.set(
        `users/${auth.uid}`,
        {
          completed: {
            [route.uid]: true
          }
        },
        {
          merge: true
        }
      );
    } catch (error) {
      console.log(error);
      toastr.error("Oops", "Something went wrong");
    }
  } else {
    // Add route grade total to user profile
    if (!user[route.routeGrade]) {
      user[route.routeGrade] = routeGradeTotal += 1;
      firestore.set(
        `users/${auth.uid}`,
        {
          [route.routeGrade]: routeGradeTotal
        },
        {
          merge: true
        }
      );
    } else {
      routeGradeTotal = user[route.routeGrade] += 1;
      firestore.set(
        `users/${auth.uid}`,
        {
          [route.routeGrade]: routeGradeTotal
        },
        {
          merge: true
        }
      );
    }

    //Add XP points to user
    if (
      user.hasOwnProperty("experiencePoints") &&
      user.experiencePoints !== 0
    ) {
      let xpPoints = user.experiencePoints;
      firestore.set(
        `users/${auth.uid}`,
        {
          experiencePoints: (xpPoints += route.experiencePoints)
        },
        {
          merge: true
        }
      );
    } else {
      firestore.set(
        `users/${auth.uid}`,
        {
          experiencePoints: route.experiencePoints
        },
        { merge: true }
      );
    }

    if (!route.total) {
      route.total = total += 1;
      firestore.set(
        `${route.session}/${route.routeName}`,
        {
          total
        },
        {
          merge: true
        }
      );
    } else {
      total = route.total += 1;
      firestore.set(
        `${route.session}/${route.routeName}`,
        {
          total
        },
        {
          merge: true
        }
      );
    }

    if (user.session && user.session[session]) {
      sessionTotal = user.session[session] += 1;

      firestore.set(
        `users/${auth.uid}`,
        {
          session: {
            [session]: sessionTotal
          }
        },
        { merge: true }
      );
    } else {
      // Add one point to session total
      sessionTotal += 1;

      // Add point to session total
      firestore.set(
        `users/${auth.uid}`,
        {
          session: {
            [session]: sessionTotal
          }
        },
        { merge: true }
      );
    }

    if (user.overallTotal) {
      overallTotal = user.overallTotal;
      // Set overall total
      firestore.set(
        `users/${auth.uid}`,
        {
          overallTotal: (overallTotal += 1)
        },
        { merge: true }
      );
    } else {
      firestore.set(
        `users/${auth.uid}`,
        {
          overallTotal: (overallTotal += 1)
        },
        { merge: true }
      );
    }

    try {
      // Add user to route completed list
      const routeSubCollection = {
        collection: `${route.session}`,
        doc: route.routeName,
        subcollections: [{ collection: "completed", doc: `${auth.uid}` }]
      };

      firestore.set(routeSubCollection, {
        completedOn,
        firstName: user.firstName,
        lastName: user.lastName,
        id: auth.uid,
        division: user.division,
        photoUrl: user.photoURL || "assets/user.png"
      });

      // Create subcollection of current session and route in user profile
      const subCollection = {
        collection: "users",
        doc: auth.uid,
        subcollections: [
          { collection: `${route.session}`, doc: `${route.uid}` }
        ]
      };
      // Add data to subcollection
      firestore.set(subCollection, {
        completedOn,
        uid: route.uid,
        routeName: route.routeName,
        grade: route.routeGrade
      });

      // Add route to main profile
      firestore.set(
        `users/${auth.uid}`,
        {
          completed: {
            [route.uid]: true
          }
        },
        {
          merge: true
        }
      );

      toastr.success("Sent!", "Completed Route");
    } catch (error) {
      console.log(error);
      toastr.error("Oops", "Something went wrong");
    }
  }
};

// Route marked not completed
export const notComplete = (auth, route, user) => async (
  getState,
  dispatch,
  { getFirestore, getFirebase }
) => {
  const firestore = getFirestore(),
    firebase = getFirebase(),
    session = `${route.session}Total`,
    attempts = user.attempts[route.session][route.uid].attempts;

  let sessionTotal = user.session[session],
    overallTotal = user.overallTotal;
  if (attempts === 1) {
    try {
      // Remove user from route compelete list
      const routeSubCollection = {
        collection: `${route.session}`,
        doc: route.routeName,
        subcollections: [{ collection: "completed", doc: `${auth.uid}` }]
      };
      firestore.delete(routeSubCollection);

      const subCollection = {
        collection: "users",
        doc: auth.uid,
        subcollections: [
          { collection: `${route.session}`, doc: `${route.uid}` }
        ]
      };
      // Remove Route from subcollections
      firestore.delete(subCollection);

      // Remove point from route grade total
      firestore.set(
        `users/${auth.uid}`,
        {
          [route.routeGrade]: (user[route.routeGrade] -= 1)
        },
        {
          merge: true
        }
      );

      // Remove xp points from profile
      if (
        user.hasOwnProperty("experiencePoints") &&
        user.experiencePoints !== 0
      ) {
        let xpPoints = user.experiencePoints;

        firestore.set(
          `users/${auth.uid}`,
          {
            experiencePoints: (xpPoints -= route.experiencePoints)
          },
          {
            merge: true
          }
        );
      }

      // Remove route from user profile
      firestore.set(
        `users/${auth.uid}`,
        {
          completed: {
            [route.uid]: false
          }
        },
        {
          merge: true
        }
      );
      // Remove points
      firestore.set(
        `users/${auth.uid}`,
        {
          session: {
            [session]: (sessionTotal -= 2)
          },
          overallTotal: (overallTotal -= 2)
        },
        { merge: true }
      );

      firestore.update(`${route.session}/${route.routeName}`, {
        total: (route.total -= 1)
      });
      toastr.success("Success", "Route unmarked");
    } catch (error) {
      console.log(error);
      toastr.error("Oops", "Something went wrong");
    }
  } else {
    try {
      // Remove user from route compelete list
      const routeSubCollection = {
        collection: `${route.session}`,
        doc: route.routeName,
        subcollections: [{ collection: "completed", doc: `${auth.uid}` }]
      };
      console.log(session);
      firestore.delete(routeSubCollection);

      const subCollection = {
        collection: "users",
        doc: auth.uid,
        subcollections: [
          { collection: `${route.session}`, doc: `${route.uid}` }
        ]
      };
      // Remove Route from subcollections
      firestore.delete(subCollection);

      // Remove point from route grade total
      firestore.set(
        `users/${auth.uid}`,
        {
          [route.routeGrade]: (user[route.routeGrade] -= 1)
        },
        {
          merge: true
        }
      );

      // Remove xp points from profile
      if (
        user.hasOwnProperty("experiencePoints") &&
        user.experiencePoints !== 0
      ) {
        let xpPoints = user.experiencePoints;

        firestore.set(
          `users/${auth.uid}`,
          {
            experiencePoints: (xpPoints -= route.experiencePoints)
          },
          {
            merge: true
          }
        );
      }

      // Remove route from user profile
      firestore.set(
        `users/${auth.uid}`,
        {
          completed: {
            [route.uid]: false
          }
        },
        {
          merge: true
        }
      );
      // Remove points
      firestore.set(
        `users/${auth.uid}`,
        {
          session: {
            [session]: (sessionTotal -= 1)
          },
          overallTotal: (overallTotal -= 1)
        },
        { merge: true }
      );

      firestore.update(`${route.session}/${route.routeName}`, {
        total: (route.total -= 1)
      });
      toastr.success("Success", "Route unmarked");
    } catch (error) {
      console.log(error);
      toastr.error("Oops", "Something went wrong");
    }
  }
};

/* ATTEMPTS COUNTER ADD */
export const attemptCounterAdd = (auth, route, user) => async (
  getState,
  dispatch,
  { getFirestore, getFirebase }
) => {
  const firestore = getFirestore(),
    firebase = getFirebase(),
    db = firebase.firestore(),
    collection = db
      .collection(`${route.session}`)
      .doc(`${route.routeName}`)
      .collection("attempts")
      .doc(`${auth.uid}`);

  // Add user attemps count to route subcollection
  const routeSubCollection = {
    collection: `${route.session}`,
    doc: route.routeName,
    subcollections: [{ collection: "attempts", doc: `${auth.uid}` }]
  };

  collection.get().then(doc => {
    if (
      doc.exists &&
      user.hasOwnProperty("attempts") &&
      user.attempts[route.session] &&
      user.attempts[route.session][route.uid]
    ) {
      collection
        .get()
        .then(res => {
          let totalAttempts, profileAttempts;

          profileAttempts = res.data().attempts;
          totalAttempts = res.data().attempts;
          firestore.update(routeSubCollection, {
            attempts: (totalAttempts += 1)
          });

          // Add attempts to user profile
          firestore.set(
            `users/${auth.uid}`,
            {
              attempts: {
                [route.session]: {
                  [route.uid]: {
                    routeName: route.routeName,
                    attempts: (profileAttempts += 1)
                  }
                }
              }
            },
            {
              merge: true
            }
          );
        })
        .catch(err => console.log(err));
    } else {
      // Set subcollection
      firestore.set(routeSubCollection, {
        firstName: user.firstName,
        lastName: user.lastName,
        id: auth.uid,
        division: user.division,
        attempts: 1
      });

      // Add attempts to user profile
      firestore.set(
        `users/${auth.uid}`,
        {
          attempts: {
            [route.session]: {
              [route.uid]: { routeName: route.routeName, attempts: 1 }
            }
          }
        },
        {
          merge: true
        }
      );
    }
  });
};

/* ATTEMPTS COUNTER MINUS */

export const attemptCounterMinus = (auth, route, user) => async (
  getState,
  dispatch,
  { getFirestore, getFirebase }
) => {
  const firestore = getFirestore(),
    firebase = getFirebase(),
    db = firebase.firestore(),
    collection = db
      .collection(`${route.session}`)
      .doc(`${route.routeName}`)
      .collection("attempts")
      .doc(`${auth.uid}`);

  // Subtract user attempts count to route subcollection
  const routeSubCollection = {
    collection: `${route.session}`,
    doc: route.routeName,
    subcollections: [{ collection: "attempts", doc: `${auth.uid}` }]
  };

  collection
    .get()
    .then(res => {
      let totalAttempts, profileAttempts;
      profileAttempts = res.data().attempts;
      totalAttempts = res.data().attempts;
      if (!totalAttempts <= 0) {
        // Update firestore by subtracting from attempts
        firestore.update(routeSubCollection, {
          attempts: (totalAttempts -= 1)
        });

        // Subtract attempts from user profile
        firestore.set(
          `users/${auth.uid}`,
          {
            attempts: {
              [route.session]: {
                [route.uid]: { attempts: (profileAttempts -= 1) }
              }
            }
          },
          {
            merge: true
          }
        );
      } else {
        totalAttempts = 0;
      }
    })
    .catch(err => console.log(err));
};
