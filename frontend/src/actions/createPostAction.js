import {
  GET_CREATE_POST_SUCCESS,
  GET_CREATE_POST_BEGIN,
  GET_CREATE_POST_FAILURE,
} from "../constants";

import axios from "axios";

export const createPostAction = ({ userId, description, image }, token) => {
  console.log(token);
  return (dispatch) => {
    dispatch({ type: GET_CREATE_POST_BEGIN });
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("description", description);
    formData.append("image", image); // this should be named image as we will be looking for this image field in rest api

    const apiUrl = `http://localhost:8800/api/posts/`;

    return axios
      .post(apiUrl, formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
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
