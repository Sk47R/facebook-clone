import {
  GET_USER__POST_SUCCESS,
  GET_USER__POST_BEGIN,
  GET_USER__POST_FAILURE,
} from "../constants";

const inititalState = {
  loading: false,
  userPosts: [],
  error: null,
};

const userPostReducer = (state = inititalState, action) => {
  switch (action.type) {
    case GET_USER__POST_BEGIN:
      return { ...state, loading: true };

    case GET_USER__POST_SUCCESS:
      return { ...state, loading: false, userPosts: action.userPosts };

    case GET_USER__POST_FAILURE:
      return { ...state, loading: false, error: action.error };

    default:
      return { ...state };
  }
};
export default userPostReducer;
