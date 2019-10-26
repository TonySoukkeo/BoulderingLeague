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
  HAVE_CLIMBED_OPEN,
  MODAL_OPEN,
  ADD_ROUTES_OPEN
} from "../modalsaction/ModalConstants";

const initialState = {
  registerModal: false,
  loginModal: false,
  imageModal: false,
  sessionModal: false,
  achievementModal: false,
  haveClimbedModal: false,
  overlay: false,
  overallLeaderboardModal: false,
  youthLeaderboardModal: false,
  adultLeaderboardModal: false,
  modalOpen: false,
  addRoutesModal: false
};

const ModalsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_OPEN:
      return {
        ...state,
        loginModal: action.payload,
        overlay: true
      };

    case REGISTER_OPEN:
      return {
        ...state,
        registerModal: action.payload,
        overlay: true
      };

    case CLOSE_MODAL:
      return {
        ...state,
        loginModal: action.payload,
        registerModal: action.payload,
        imageModal: action.payload,
        sessionModal: action.payload,
        achievementModal: action.payload,
        overallLeaderboardModal: action.payload,
        youthLeaderboardModal: action.payload,
        adultLeaderboardModal: action.payload,
        addRoutesModal: action.payload,
        haveClimbedModal: action.payload,
        modalOpen: action.payload,
        overlay: false
      };

    case SESSION_OPEN:
      return {
        ...state,
        sessionModal: action.payload,
        overlay: true
      };

    case ACHIEVEMENT_OPEN:
      return {
        ...state,
        achievementModal: action.payload,
        overlay: true
      };

    case IMAGE_OPEN:
      return {
        ...state,
        imageModal: action.payload,
        overlay: true
      };

    case ADULT_LEADERBOARD_OPEN:
      return {
        ...state,
        adultLeaderboardModal: action.payload,
        overlay: true
      };

    case YOUTH_LEADERBOARD_OPEN:
      return {
        ...state,
        youthLeaderboardModal: action.payload,
        overlay: true
      };

    case OVERALL_LEADERBOARD_OPEN:
      return {
        ...state,
        overallLeaderboardModal: action.payload,
        overlay: true
      };

    case ADD_ROUTES_OPEN:
      return {
        ...state,
        addRoutesModal: action.payload,
        overlay: true
      };

    case HAVE_CLIMBED_OPEN:
      return {
        ...state,
        haveClimbedModal: action.payload,
        overlay: true
      };

    case MODAL_OPEN:
      return {
        ...state,
        modalOpen: action.payload,
        overlay: true
      };

    default:
      return state;
  }
};

export default ModalsReducer;
