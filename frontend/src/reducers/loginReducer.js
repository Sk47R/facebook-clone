import {
  GET_LOGIN_USER_SUCCESS,
  GET_LOGIN_USER_BEGIN,
  GET_LOGIN_USER_FAILURE,
  GET_FOLLOW_FIREND_SUCCESS,
  GET_FOLLOW_FIREND_BEGIN,
  GET_FOLLOW_FIREND_FAILURE,
  GET_UNFOLLOW_FIREND_SUCCESS,
  GET_UNFOLLOW_FIREND_BEGIN,
  GET_UNFOLLOW_FIREND_FAILURE,
} from "../constants";

const inititalState = {
  loading: false,
  user: {},
  error: null,
};

const loginReducer = (state = inititalState, action) => {
  switch (action.type) {
    case GET_LOGIN_USER_BEGIN:
      return { ...state, loading: true };

    case GET_LOGIN_USER_SUCCESS:
      localStorage.setItem("userInfo", JSON.stringify(action.user));
      return { ...state, loading: false, user: action.user };

    case GET_LOGIN_USER_FAILURE:
      return { ...state, loading: false, error: action.error };

    case GET_FOLLOW_FIREND_BEGIN:
      return { ...state, loading: true };
    case GET_FOLLOW_FIREND_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          followings: [...state.user.followings, action.payload],
        },
      };

    case GET_FOLLOW_FIREND_FAILURE:
      return { ...state, error: action.error };

    case GET_UNFOLLOW_FIREND_BEGIN:
      return { ...state, loading: true };

    case GET_UNFOLLOW_FIREND_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          followings: state.user.followings.filter(
            (following) => following !== action.payload
          ),
        },
      };

    case GET_FOLLOW_FIREND_FAILURE:
      return { ...state, error: action.error };

    default:
      return { ...state };
  }
};
export default loginReducer;
