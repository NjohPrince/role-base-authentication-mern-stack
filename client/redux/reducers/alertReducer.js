import { ActionTypes } from "../constants/ActionTypes";

const initialState = [];

const alertReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ActionTypes.SET_ALERT:
      return [...state, payload];
    case ActionTypes.REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
};

export default alertReducer;
