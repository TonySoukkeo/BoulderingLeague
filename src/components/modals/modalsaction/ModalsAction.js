import {
  LOGIN_OPEN,
  REGISTER_OPEN,
  CLOSE_MODAL,
  IMAGE_OPEN,
  SESSION_OPEN,
  ACHIEVEMENT_OPEN,
  ADULT_LEADERBOARD_OPEN,
  YOUTH_LEADERBOARD_OPEN,
  OVERALL_LEADERBOARD_OPEN,
  ADD_ROUTES_OPEN,
  MODAL_OPEN,
  HAVE_CLIMBED_OPEN
} from "./ModalConstants";

export const modalToggle = type => dispatch => {
  switch (type) {
    case LOGIN_OPEN:
      dispatch({ type: LOGIN_OPEN, payload: true });
      dispatch({ type: REGISTER_OPEN, payload: false });
      dispatch({ type: MODAL_OPEN, payload: true });
      break;

    case REGISTER_OPEN:
      dispatch({ type: REGISTER_OPEN, payload: true });
      dispatch({ type: LOGIN_OPEN, payload: false });
      dispatch({ type: MODAL_OPEN, payload: true });
      break;

    case SESSION_OPEN:
      dispatch({ type: SESSION_OPEN, payload: true });
      dispatch({ type: MODAL_OPEN, payload: true });
      break;

    case ACHIEVEMENT_OPEN:
      dispatch({ type: ACHIEVEMENT_OPEN, payload: true });
      dispatch({ type: MODAL_OPEN, payload: true });
      break;

    case CLOSE_MODAL:
      dispatch({ type: CLOSE_MODAL, payload: false });
      break;

    case IMAGE_OPEN:
      dispatch({ type: IMAGE_OPEN, payload: true });
      dispatch({ type: MODAL_OPEN, payload: true });
      break;

    case OVERALL_LEADERBOARD_OPEN:
      dispatch({ type: OVERALL_LEADERBOARD_OPEN, payload: true });
      dispatch({ type: MODAL_OPEN, payload: true });
      break;

    case ADULT_LEADERBOARD_OPEN:
      dispatch({ type: ADULT_LEADERBOARD_OPEN, payload: true });
      dispatch({ type: MODAL_OPEN, payload: true });
      break;

    case YOUTH_LEADERBOARD_OPEN:
      dispatch({ type: YOUTH_LEADERBOARD_OPEN, payload: true });
      dispatch({ type: MODAL_OPEN, payload: true });
      break;

    case ADD_ROUTES_OPEN:
      dispatch({ type: ADD_ROUTES_OPEN, payload: true });
      dispatch({ type: MODAL_OPEN, payload: true });
      break;

    case HAVE_CLIMBED_OPEN:
      dispatch({ type: HAVE_CLIMBED_OPEN, payload: true });
      dispatch({ type: MODAL_OPEN, payload: true });
      break;

    case MODAL_OPEN:
      dispatch({ type: MODAL_OPEN, payload: true });
      break;

    default:
      return;
  }
};
