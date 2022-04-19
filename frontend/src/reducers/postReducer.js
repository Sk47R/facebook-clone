import {
  GET_TIMELINE_POST_BEGIN,
  GET_TIMELINE_POST_SUCCESS,
  GET_TIMELINE_POST_FAILURE,
} from "../constants";

const inititalState = {
  loading: false,
  posts: [],
  error: null,
};

const timelinePostReducer = (state = inititalState, action) => {
  switch (action.type) {
    case GET_TIMELINE_POST_BEGIN:
      return { ...state, loading: true };

    case GET_TIMELINE_POST_SUCCESS:
      return { ...state, loading: false, posts: action.posts };

    case GET_TIMELINE_POST_FAILURE:
      return { ...state, loading: false, error: action.error };

    default:
      return { ...state };
  }
};
export default timelinePostReducer;
