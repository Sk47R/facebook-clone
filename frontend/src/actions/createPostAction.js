import {
  GET_CREATE_POST_SUCCESS,
  GET_CREATE_POST_BEGIN,
  GET_CREATE_POST_FAILURE,
} from "../constants";

import axios from "axios";

export const createPostAction = (newPost) => {
  return (dispatch) => {
    dispatch({ type: GET_CREATE_POST_BEGIN });
    const apiUrl = `http://localhost:8800/api/posts`;

    axios
      .post(apiUrl, newPost)
      .then((response) => {
        console.log("then");
        if (response.status == 200) {
          console.log("create post success");
          dispatch({ type: GET_CREATE_POST_SUCCESS, posts: response.data });
        } else {
          dispatch({ type: GET_CREATE_POST_FAILURE, error: response.data });
        }
      })
      .catch((err) => {
        console.log("Errro");

        dispatch({ type: GET_CREATE_POST_FAILURE, error: err });
      });
  };
};
