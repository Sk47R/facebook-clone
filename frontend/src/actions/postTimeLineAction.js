import {
  GET_TIMELINE_POST_BEGIN,
  GET_TIMELINE_POST_SUCCESS,
  GET_TIMELINE_POST_FAILURE,
} from "../constants";
import axios from "axios";

export const getTimelinePost = (userId, token) => {
  // 625af1a225bea36fc8b52e54
  return (dispatch) => {
    dispatch({ type: GET_TIMELINE_POST_BEGIN });
    const apiUrl = `http://localhost:8800/api/posts/timeline/${userId}`;

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
          dispatch({ type: GET_TIMELINE_POST_SUCCESS, posts: response.data });
        } else {
          dispatch({ type: GET_TIMELINE_POST_FAILURE, error: response.data });
        }
      })
      .catch((err) => {
        dispatch({ type: GET_TIMELINE_POST_FAILURE, error: err });
      });
  };
};
