import {
  GET_USER__POST_SUCCESS,
  GET_USER__POST_BEGIN,
  GET_USER__POST_FAILURE,
} from "../constants";

import axios from "axios";

export const getUserPostAction = (username) => {
  // 625af1a225bea36fc8b52e54
  return (dispatch) => {
    dispatch({ type: GET_USER__POST_BEGIN });
    const apiUrl = `http://localhost:8800/api/posts/profile/${username}`;

    return axios({
      url: apiUrl,
      method: "GET",
      header: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.status == 200) {
          dispatch({ type: GET_USER__POST_SUCCESS, userPosts: response.data });
        } else {
          dispatch({ type: GET_USER__POST_FAILURE, error: response.data });
        }
      })
      .catch((err) => {
        dispatch({ type: GET_USER__POST_FAILURE, error: err });
      });
  };
};
