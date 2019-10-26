import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from "../../../common/helpers/async/asyncActions";

// Upload profile image
export const uploadProfileImage = (file, fileName, type) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase(),
    firestore = getFirestore(),
    user = firebase.auth().currentUser,
    userDoc = await firestore.get(`users/${user.uid}`),
    imageName = fileName,
    options = {
      name: imageName
    };

  let path, uploadedFile, downloadURL;

  try {
    dispatch(asyncActionStart());
    switch (type) {
      case "profile":
        path = `${user.uid}/user__images`;
        uploadedFile = await firebase.uploadFile(path, file, null, options);
        downloadURL = await uploadedFile.uploadTaskSnapshot.downloadURL;
        if (!userDoc.data().photoURL) {
          await firebase.updateProfile({
            photoURL: downloadURL
          });
          await user.updateProfile({
            photoURL: downloadURL
          });
        }

        if (userDoc.data().photoURL) {
          await firestore.update(`users/${user.uid}`, {
            photoURL: downloadURL
          });
        }
        break;
      case "banner":
        path = `${user.uid}/user__banner`;
        uploadedFile = await firebase.uploadFile(path, file, null, options);
        downloadURL = await uploadedFile.uploadTaskSnapshot.downloadURL;
        if (!userDoc.data().bannerURL) {
          await firebase.updateProfile({ bannerURL: downloadURL });
          await user.updateProfile({ bannerURL: downloadURL });
        } else {
          await firestore.update(`users/${user.uid}`, {
            bannerURL: downloadURL
          });
        }
        break;

      default:
        return;
    }
    dispatch(asyncActionFinish());
  } catch (error) {
    dispatch(asyncActionError());
    console.log(error);
  }
};
