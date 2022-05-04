import {
  GET_CONVERSATIONS_BEGIN,
  GET_CONVERSATIONS_SUCCESS,
  GET_CONVERSATIONS_FAILURE,
} from "../constants";

import axios from "axios";

export const getConversationAction = (userId, token) => {
  // 625af1a225bea36fc8b52e54
  return (dispatch) => {
    dispatch({ type: GET_CONVERSATIONS_BEGIN });
    const apiUrl = `http://localhost:8800/api/conversations/${userId}`;

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
          dispatch({
            type: GET_CONVERSATIONS_SUCCESS,
            conversations: response.data,
          });
        } else {
          dispatch({ type: GET_CONVERSATIONS_FAILURE, error: response.data });
        }
      })
      .catch((err) => {
        dispatch({ type: GET_CONVERSATIONS_FAILURE, error: err });
      });
  };
};
