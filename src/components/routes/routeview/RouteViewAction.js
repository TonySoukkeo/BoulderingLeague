export const completed = (session, routeName) => async (
  getState,
  dispatch,
  { getFirebase }
) => {
  const firebase = getFirebase(),
    db = firebase.firestore(),
    collection = await db
      .collection(`${session}`)
      .doc(`${routeName}`)
      .collection(`completed`)
      .get();
  const completedBy = [];

  collection.docs.forEach(doc => completedBy.push(doc.data()));

  return completedBy;
};
