// fetching user by user name
import {
  GET_USER_BY_USERNAME_SUCCESS,
  GET_USER_BY_USERNAME_BEGIN,
  GET_USER_BY_USERNAME_FAILURE,
} from "../constants";

const inititalState = {
  loading: false,
  user: {},
  error: null,
};

const userUsernameReducer = (state = inititalState, action) => {
  switch (action.type) {
    case GET_USER_BY_USERNAME_BEGIN:
      return { ...state, loading: true };

    case GET_USER_BY_USERNAME_SUCCESS:
      return { ...state, loading: false, user: action.user };

    case GET_USER_BY_USERNAME_FAILURE:
      return { ...state, loading: false, error: action.error };

    default:
      return { ...state };
  }
};
export default userUsernameReducer;
