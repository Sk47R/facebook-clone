import {
  GET_LOGIN_USER_SUCCESS,
  GET_LOGIN_USER_BEGIN,
  GET_LOGIN_USER_FAILURE,
} from "../constants";
import axios from "axios";

export const loginAction = (
  email,
  password,
  navigate,
  setEmail,
  setPassword
) => {
  return (dispatch) => {
    dispatch({ type: GET_LOGIN_USER_BEGIN });
    const apiUrl = `http://localhost:8800/api/auth/login`;

    axios
      .post(apiUrl, { email, password })
      .then((response) => {
        if (response.status == 200) {
          dispatch({ type: GET_LOGIN_USER_SUCCESS, user: response.data });
          setEmail("");
          setPassword("");
          navigate("/");
          window.location.reload();
        } else {
          dispatch({ type: GET_LOGIN_USER_FAILURE, error: response.data });
        }
      })
      .catch((err) => {
        dispatch({ type: GET_LOGIN_USER_FAILURE, error: err.response.data });
      });
  };
};
