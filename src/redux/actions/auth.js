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

    axios
      .post(`${baseURL}/store-token`, {
        token: response.data.accessToken,
      })
      .then((response) => {
        dispatch({
          type: ActionTypes.LOGIN_SUCCESS,
          payload: response.data,
        });
        dispatch(setAlert("Authentication success!", "success"));
      })
      .catch((error) => {
        console.log(error?.error);
      });
  } catch (error) {
    if (error.response.data) {
      dispatch(setAlert(error.response.data.error, "error"));
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

    axios
      .post(`${baseURL}/store-token`, {
        token: res.data.accessToken,
      })
      .then((response) => {
        dispatch({
          type: ActionTypes.SIGNUP_SUCCESS,
          payload: response.data,
        });
        dispatch(setAlert("Successfully Registered!", "success"));
      })
      .catch((error) => {
        console.log(error?.error);
      });

    // console.log(res.data);
  } catch (error) {
    if (error.response.data) {
      dispatch(setAlert(error.response.data.error, "error"));
    }
    dispatch({
      type: ActionTypes.SIGNUP_FAILURE,
      payload: error.response?.data?.error,
    });
  }
};

export const logout = () => (dispatch) => {
  axios
    .post(`${baseURL}/logout`)
    .then((response) => {
      dispatch({
        type: ActionTypes.LOGOUT,
        payload: response.data.message,
      });
      dispatch(setAlert(response.data.message, "success"));
    })
    .catch((error) => {
      console.log(error?.error);
    });
  dispatch(
    setAlert("Successfully Logged Out. Please come back soon😀", "success")
  );
  dispatch({ type: ActionTypes.LOGOUT });
};
