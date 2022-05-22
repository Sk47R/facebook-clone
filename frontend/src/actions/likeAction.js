import {
  GET_LIKE_SUCCESS,
  GET_LIKE_BEGIN,
  GET_LIKE_FAILURE,
} from "../constants";

import axios from "axios";

export const likeAction = (postId, currentUserId) => {
  return (dispatch) => {
    dispatch({ type: GET_LIKE_BEGIN });
    const apiUrl = `http://localhost:8800/api/posts/${postId}/like`;

    axios
      .put(apiUrl, { userId: currentUserId })
      .then((response) => {
        if (response.status == 200) {
          console.log("like success");
          dispatch({ type: GET_LIKE_SUCCESS, likes: response.data });
        } else {
          dispatch({ type: GET_LIKE_FAILURE, error: response.data });
        }
      })
      .catch((err) => {
        console.log("Errro");

        dispatch({ type: GET_LIKE_FAILURE, error: err });
      });
  };
};
