import {
  GET_USER_SUCCESS,
  GET_USER_BEGIN,
  GET_USER_FAILURE,
} from "../constants";

const inititalState = {
  loading: false,
  user: {},
  error: null,
};

const userReducer = (state = inititalState, action) => {
  switch (action.type) {
    case GET_USER_BEGIN:
      return { ...state, loading: true };

    case GET_USER_SUCCESS:
      return { ...state, loading: false, user: action.user };

    case GET_USER_FAILURE:
      return { ...state, loading: false, error: action.error };

    default:
      return { ...state };
  }
};
export default userReducer;
