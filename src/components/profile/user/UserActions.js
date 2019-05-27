// Upload profile image
export const uploadProfileImage = (file, fileName) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase(),
    firestore = getFirestore(),
    user = firebase.auth().currentUser,
    path = `${user.uid}/user_images`,
    imageName = fileName,
    options = {
      name: imageName
    };

  try {
    // upload file to firebase storage
    let uploadedFile = await firebase.uploadFile(path, file, null, options);
    // get url of image
    let downloadURL = await uploadedFile.uploadTaskSnapshot.downloadURL;
    // get userdoc
    let userDoc = await firestore.get(`users/${user.uid}`);

    // check if user has photo, if not update profile with new image
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
  } catch (error) {
    console.log(error);
  }
};
