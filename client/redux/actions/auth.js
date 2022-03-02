import axios from "axios";
import { setAlert } from "./alert";

import { ActionTypes } from "../constants/ActionTypes";

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ username, password });

  try {
    dispatch({
      type: ActionTypes.LOGIN_REQUEST,
    });

    const response = await axios.post(
      ``,
      body,
      config
    );
    dispatch({
      type: ActionTypes.LOGIN_SUCCESS,
      payload: response.data,
    });

    axiosInstance.defaults.headers[""] =
      "Bearer " + response.data.access_token;
    axiosInstances.defaults.headers[""] =
      "Bearer " + response.data.access_token;

    dispatch(setAlert("Authenticated Successfully", "success"));
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: ActionTypes.LOGIN_FAILURE,
      payload: error.response.data,
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

    dispatch({
      type: ActionTypes.SIGNUP_SUCCESS,
      payload: res.data,
    });

    dispatch(login(email, password));
  } catch (err) {
    dispatch({
      type: ActionTypes.SIGNUP_FAILURE,
      payload: err.response,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch(
    setAlert("Successfully Logged Out. Please come back soon😀", "success")
  );
  dispatch({ type: ActionTypes.LOGOUT });
};
