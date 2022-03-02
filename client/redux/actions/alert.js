import { v4 as uuid } from "uuid";
import { ActionTypes } from "../constants/ActionTypes";

export const setAlert =
  (msg, alertType, timeout = 2000) =>
  (dispatch) => {
    const id = uuid();
    dispatch({
      type: ActionTypes.SET_ALERT,
      payload: { msg, alertType, id },
    });

    setTimeout(
      () => dispatch({ type: ActionTypes.REMOVE_ALERT, payload: id }),
      timeout
    );
  };
