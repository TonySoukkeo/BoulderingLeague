// Get all users from database
// Filter out users with current session total
// Sort them from high to low
export const getRank = (session, user) => async (
  getState,
  dispatch,
  { getFirebase }
) => {
  const firebase = getFirebase(),
    db = firebase.firestore(),
    collection = await db.collection("users").get();

  const users = [], // Array of all users
    currentUser = user;

  collection.docs.forEach(user => users.push(user.data()));

  // Users with session property
  const filteredUsers = users.filter(user => user.session);

  // Sort users from high to low
  const topUsers = filteredUsers
    .filter(user => user.session[`${session}Total`])
    .sort(
      (a, b) => b.session[`${session}Total`] - a.session[`${session}Total`]
    );

  let rank = "-";

  // Loop through topUsers array
  for (let i = 0; i < topUsers.length; i++) {
    if (topUsers[i].uid === currentUser.uid) {
      rank = i + 1;
      break;
    }
  }

  return rank;
};
