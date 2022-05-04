import {
  GET_MESSAGES_BEGIN,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_FAILURE,
} from "../constants";

import axios from "axios";

export const getMessageAction = (conversationId, token) => {
  // 625af1a225bea36fc8b52e54
  return (dispatch) => {
    dispatch({ type: GET_MESSAGES_BEGIN });
    const apiUrl = `http://localhost:8800/api/messages/${conversationId}`;

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
          console.log(response.data);
          dispatch({
            type: GET_MESSAGES_SUCCESS,
            messages: response.data,
          });
        } else {
          dispatch({ type: GET_MESSAGES_FAILURE, error: response.data });
        }
      })
      .catch((err) => {
        dispatch({ type: GET_MESSAGES_FAILURE, error: err });
      });
  };
};
