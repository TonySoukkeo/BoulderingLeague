import { toastr } from "react-redux-toastr";
import uuid from "uuid";
import moment from "moment";

// Add new route
export const addRoute = route => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore(),
    user = getState().firebase.profile;

  if (!route.description) {
    route.description = null;
  }

  try {
    const routeName = route.routeName,
      routeUid = uuid(),
      season = route.season,
      datePosted = Date.now();

    await firestore.set(`${season}/${routeName}`, {
      uid: routeUid,
      routeName: route.routeName,
      routeGrade: route.routeGrade,
      description: route.description,
      postedBy: `${user.firstName} ${user.lastName}`,
      season: season,
      datePosted: moment(datePosted).toDate()
    });

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
    routeSeason = route.season,
    routeName = route.routeName;

  try {
    await firestore.delete({
      collection: `${routeSeason}`,
      doc: `${routeName}`
    });
    toastr.success("Success", "Route successfully removed");
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
      routeGrade: route.routeGrade,
      description: route.description,
      postedBy: `${user.firstName} ${user.lastName}`,
      season: route.season,
      datePosted: posted
    };

  console.log(updatedRoute);

  try {
    // Update Route
    await firestore.update(`${route.season}/${route.routeName}`, route);

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
    season = `${route.season}Total`,
    completedOn = moment(Date.now()).toDate();

  let seasonTotal = 0,
    overallTotal = 0,
    total = 0,
    routeGradeTotal = 0;

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
      `${route.season}/${route.routeName}`,
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
      `${route.season}/${route.routeName}`,
      {
        total
      },
      {
        merge: true
      }
    );
  }

  if (user.season && user.season[season]) {
    seasonTotal = user.season[season] += 1;

    firestore.set(
      `users/${auth.uid}`,
      {
        season: {
          [season]: seasonTotal
        }
      },
      { merge: true }
    );
  } else {
    // Add one point to season total
    seasonTotal += 1;

    // Add point to season total
    firestore.set(
      `users/${auth.uid}`,
      {
        season: {
          [season]: seasonTotal
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
      collection: `${route.season}`,
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

    // Create subcollection of current season and route in user profile
    const subCollection = {
      collection: "users",
      doc: auth.uid,
      subcollections: [{ collection: `${route.season}`, doc: `${route.uid}` }]
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
        [route.uid]: true
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
};

// Route marked not completed
export const notComplete = (auth, route, user) => async (
  getState,
  dispatch,
  { getFirestore, getFirebase }
) => {
  const firestore = getFirestore(),
    firebase = getFirebase(),
    season = `${route.season}Total`;

  let seasonTotal = user.season[season],
    overallTotal = user.overallTotal;

  try {
    // Remove user from route compelete list
    const routeSubCollection = {
      collection: `${route.season}`,
      doc: route.routeName,
      subcollections: [{ collection: "completed", doc: `${auth.uid}` }]
    };
    console.log(season);
    firestore.delete(routeSubCollection);

    const subCollection = {
      collection: "users",
      doc: auth.uid,
      subcollections: [{ collection: `${route.season}`, doc: `${route.uid}` }]
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

    // Remove route from user profile
    firestore.update(`users/${auth.uid}`, {
      [route.uid]: firebase.firestore.FieldValue.delete()
    });
    // Remove points
    firestore.set(
      `users/${auth.uid}`,
      {
        season: {
          [season]: (seasonTotal -= 1)
        },
        overallTotal: (overallTotal -= 1)
      },
      { merge: true }
    );

    firestore.update(`${route.season}/${route.routeName}`, {
      total: (route.total -= 1)
    });
    toastr.success("Success", "Route unmarked");
  } catch (error) {
    console.log(error);
    toastr.error("Oops", "Something went wrong");
  }
};
