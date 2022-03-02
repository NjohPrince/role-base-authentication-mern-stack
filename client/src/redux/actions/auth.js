import axios from "axios";
import { setAlert } from "./alert";

// action types
import { ActionTypes } from "../constants/ActionTypes";

// baseURL - API Route
const baseURL = process.env.REACT_APP_API_KEY;

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    dispatch({
      type: ActionTypes.LOGIN_REQUEST,
    });

    const response = await axios.post(`${baseURL}/login`, body, config);
    dispatch({
      type: ActionTypes.LOGIN_SUCCESS,
      payload: response.data,
    });

    console.log(response.data);

    axios.defaults.headers["x-access-token"] = response.data.accessToken;
    axios.defaults.headers["x-access-token"] = response.data.accessToken;

    dispatch(setAlert("Authentication success!", "success"));
  } catch (error) {
    if(error.response.data) {
      dispatch(setAlert(error.response.data.error, "error"));
    } 
    if(error.message) {
      dispatch(setAlert(error.message, "error"));
    }
    dispatch({
      type: ActionTypes.LOGIN_FAILURE,
      payload: error.response?.data?.error,
    });
  }
};

export const signup = (name, email, password, role) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({
    name,
    email,
    password,
    role,
  });

  try {
    dispatch({
      type: ActionTypes.SIGNUP_REQUEST,
    });

    const res = await axios.post(`${baseURL}/signup`, body, config);
    dispatch({
      type: ActionTypes.SIGNUP_SUCCESS,
      payload: res.data,
    });

    axios.defaults.headers["x-access-token"] = res.data.accessToken;
    axios.defaults.headers["x-access-token"] = res.data.accessToken;

    // console.log(res.data);
  } catch (error) {
    // console.log(error.response?.data?.error);
    dispatch({
      type: ActionTypes.SIGNUP_FAILURE,
      payload: error.response?.data?.error,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch(
    setAlert("Successfully Logged Out. Please come back soon😀", "success")
  );
  dispatch({ type: ActionTypes.LOGOUT });
};
