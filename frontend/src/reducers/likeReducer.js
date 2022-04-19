import {
  GET_LIKE_SUCCESS,
  GET_LIKE_BEGIN,
  GET_LIKE_FAILURE,
} from "../constants";

const inititalState = {
  loading: false,
  likes: [],
  error: null,
};

const likeReducer = (state = inititalState, action) => {
  switch (action.type) {
    case GET_LIKE_BEGIN:
      return { ...state, loading: true };

    case GET_LIKE_SUCCESS:
      return { ...state, loading: false, likes: action.likes };

    case GET_LIKE_FAILURE:
      return { ...state, loading: false, error: action.error };

    default:
      return { ...state };
  }
};
export default likeReducer;
