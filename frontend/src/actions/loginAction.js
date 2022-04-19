import {
  GET_LOGIN_USER_SUCCESS,
  GET_LOGIN_USER_BEGIN,
  GET_LOGIN_USER_FAILURE,
} from "../constants";
import axios from "axios";

export const loginAction = (email, password) => {
  // 625af1a225bea36fc8b52e54
  return (dispatch) => {
    dispatch({ type: GET_LOGIN_USER_BEGIN });
    const apiUrl = `http://localhost:8800/api/auth/login`;

    axios
      .post(apiUrl, { email, password })
      .then((response) => {
        if (response.status == 200) {
          console.log("login success");
          dispatch({ type: GET_LOGIN_USER_SUCCESS, user: response.data });
        } else {
          dispatch({ type: GET_LOGIN_USER_FAILURE, error: response.data });
        }
      })
      .catch((err) => {
        dispatch({ type: GET_LOGIN_USER_FAILURE, error: err });
      });
  };
};
