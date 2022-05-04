import {
  GET_USER_SUCCESS,
  GET_USER_BEGIN,
  GET_USER_FAILURE,
} from "../constants";

import axios from "axios";

export const getUserAction = (userId, token) => {
  // 625af1a225bea36fc8b52e54
  return (dispatch) => {
    dispatch({ type: GET_USER_BEGIN });
    const apiUrl = `http://localhost:8800/api/users/${userId}`;

    return axios({
      url: apiUrl,
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        if (response.status == 200) {
          dispatch({ type: GET_USER_SUCCESS, user: response.data });
        } else {
          dispatch({ type: GET_USER_FAILURE, error: response.data });
        }
      })
      .catch((err) => {
        dispatch({ type: GET_USER_FAILURE, error: err });
      });
  };
};
