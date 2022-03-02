import { ActionTypes } from "../constants/ActionTypes";

const token = localStorage.getItem("access-token");

const initialState = token
  ? {
      isAuthenticated: true,
      user: null,
      loading: false,
      token: token,
    }
  : {
      isAuthenticated: false,
      user: null,
      loading: false,
      token: null,
    };

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.USER_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.USER_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        user: payload,
      };
    case ActionTypes.USER_DATA_FAIL:
      return {
        ...state,
        loading: false,
      };
    case ActionTypes.LOGIN_REQUEST:
    case ActionTypes.SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.LOGIN_SUCCESS:
    case ActionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        token: payload,
      };
    case ActionTypes.SIGNUP_FAILURE:
    case ActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
      };
    case ActionTypes.LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
