import {
  GET_FOLLOW_FIREND_SUCCESS,
  GET_FOLLOW_FIREND_BEGIN,
  GET_FOLLOW_FIREND_FAILURE,
  GET_UNFOLLOW_FIREND_SUCCESS,
  GET_UNFOLLOW_FIREND_BEGIN,
  GET_UNFOLLOW_FIREND_FAILURE,
} from "../constants";

import axios from "axios";

export const followFriendAction = (userId) => {
  return (dispatch) => {
    dispatch({ type: GET_FOLLOW_FIREND_SUCCESS, payload: userId });
  };
};
export const unFollowFriendAction = (userId) => {
  return (dispatch) => {
    dispatch({ type: GET_UNFOLLOW_FIREND_SUCCESS, payload: userId });
  };
};
