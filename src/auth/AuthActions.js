import moment from "moment";
import { toastr } from "react-redux-toastr";

// USER LOGIN
export const loginUser = creds => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  try {
    await firebase
      .auth()
      .signInWithEmailAndPassword(creds.email, creds.password);
  } catch (error) {
    console.log(error);
    toastr.error("Oops", "Login Credentials incorrect");
  }
};

// REGISTER NEW USER
export const registerUser = user => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase(),
    firestore = getFirestore(),
    age = moment().diff(user.dateOfBirth, "years", false);

  let division;

  try {
    // Create user in firebase
    await firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password);
    // Update auth profile
    await firebase.auth().currentUser.updateProfile({
      firstName: user.firstName,
      lastName: user.lastName
    });
    // Convert moment date to JS date
    user.dateOfBirth = moment(user.dateOfBirth).toDate();

    if (age > 18) {
      division = "adult";
    } else {
      division = "youth";
    }

    // Create new profile in firestore
    let newUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: firestore.FieldValue.serverTimestamp(),
      dateOfBirth: user.dateOfBirth,
      about: null,
      gender: user.gender,
      age,
      uid: firebase.auth().currentUser.uid,
      division,
      admin: false
    };
    await firestore.set(`users/${firebase.auth().currentUser.uid}`, {
      ...newUser
    });
  } catch (error) {
    console.log(error);
    toastr.error("Oops", "Could not create account");
  }
};

// UPDATE PROFILE
export const updateProfile = user => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const firestore = getFirestore(),
    firebase = getFirebase(),
    currentUser = firebase.auth().currentUser;
  const { isLoaded, isEmpty, ...updatedUser } = user;
  const profile = getState().firebase.profile;

  // Check for about field
  if (!user.about) {
    user.about = profile.about;
  }

  // Check for first name field
  if (!user.firstName) {
    user.firstName = profile.firstName;
  }

  // Check for last name field
  if (!user.lastName) {
    user.lastName = profile.lastName;
  }

  try {
    // Update firebase profile
    await firebase.updateProfile(updatedUser);

    // // Add user profile to firestore
    await firestore.update(`users/${currentUser.uid}`, {
      firstName: user.firstName,
      lastName: user.lastName,
      about: user.about
    });
    toastr.success("Success", "Profile has been updated");
  } catch (error) {
    console.log(error);
    toastr.error("Oops", "Could not update profile");
  }
};

// Update users Division
export const updateDivision = user => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();

  // Update division for profile
  await firestore.update(`users/${user.uid}`, {
    division: "adult"
  });
};
