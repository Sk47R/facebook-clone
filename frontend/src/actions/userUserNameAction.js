import {
  GET_USER_BY_USERNAME_SUCCESS,
  GET_USER_BY_USERNAME_BEGIN,
  GET_USER_BY_USERNAME_FAILURE,
} from "../constants";

import axios from "axios";

export const getUserUsernameAction = (username) => {
  // 625af1a225bea36fc8b52e54
  return (dispatch) => {
    dispatch({ type: GET_USER_BY_USERNAME_BEGIN });
    const apiUrl = `http://localhost:8800/api/users?username=${username}`;

    return axios({
      url: apiUrl,
      method: "GET",
      header: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.status == 200) {
          dispatch({ type: GET_USER_BY_USERNAME_SUCCESS, user: response.data });
        } else {
          dispatch({
            type: GET_USER_BY_USERNAME_FAILURE,
            error: response.data,
          });
        }
      })
      .catch((err) => {
        dispatch({ type: GET_USER_BY_USERNAME_FAILURE, error: err });
      });
  };
};
