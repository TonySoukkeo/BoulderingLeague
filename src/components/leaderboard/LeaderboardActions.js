import {
  GET_ADULT_LEADERBOARD,
  GET_YOUTH_LEADERBOARD,
  GET_OVERALL_LEADERBOARD
} from "./LeaderboardConstants";

class Leaderboard {
  constructor(users, session, dispatch) {
    this.users = users;
    this.dispatch = dispatch;
    this.session = session;
  }

  getLeaderboard(type) {
    const session = this.session;

    let user;

    switch (type) {
      case "youth":
        user = this.users.filter(x => x.division === "youth");
        break;

      case "adult":
        user = this.users.filter(x => x.division === "adult");
        break;

      case "overall":
        user = this.users.filter(x => x.session);
        break;

      default:
        break;
    }

    const hasSession = user.filter(x => x.session);

    const climbers = hasSession.filter(x => x.session[`${session}Total`]);

    const sessionTotal = climbers.sort(
      (a, b) => b.session[`${session}Total`] - a.session[`${session}Total`]
    );

    if (type === "youth")
      return this.dispatch({
        type: GET_YOUTH_LEADERBOARD,
        payload: sessionTotal
      });

    if (type === "adult")
      return this.dispatch({
        type: GET_ADULT_LEADERBOARD,
        payload: sessionTotal
      });

    if (type === "overall")
      return this.dispatch({
        type: GET_OVERALL_LEADERBOARD,
        payload: sessionTotal
      });

    return;
  }
}

export const getLeaderboard = (users, session) => dispatch => {
  const leaderboard = new Leaderboard(users, session, dispatch);
  return leaderboard;
};
