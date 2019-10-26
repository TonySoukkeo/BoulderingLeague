import { CURRENT_SESSION } from "./CurrentSessionConstants";

export const getCurrentSession = session => dispatch => {
  dispatch({ type: CURRENT_SESSION, payload: session });
};
