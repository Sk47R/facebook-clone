import {
  GET_REGISTER_USER_SUCCESS,
  GET_REGISTER_USER_BEGIN,
  GET_REGISTER_USER_FAILURE,
} from "../constants";
import axios from "axios";

export const registerAction = (
  username,
  email,
  city,
  location,
  relation,
  password
) => {
  // 625af1a225bea36fc8b52e54
  return (dispatch) => {
    dispatch({ type: GET_REGISTER_USER_BEGIN });
    const apiUrl = `http://localhost:8800/api/auth/register`;
    console.log("IN register action");
    axios
      .post(apiUrl, { username, email, city, location, relation, password })
      .then((response) => {
        if (response.status == 201) {
          dispatch({ type: GET_REGISTER_USER_SUCCESS, user: response.data });
        } else {
          console.log("no log");
          dispatch({ type: GET_REGISTER_USER_FAILURE, error: response.data });
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_REGISTER_USER_FAILURE,
          error: err.response.data,
        });
      });
  };
};
