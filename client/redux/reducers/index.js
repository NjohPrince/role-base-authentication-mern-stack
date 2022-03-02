import { combineReducers } from "redux";
import alertReducer from "./alertReducer";
import authReducer from "./authReducer";

const reducers = combineReducers({
  alert: alertReducer,
  auth: authReducer,
});

export default reducers;
