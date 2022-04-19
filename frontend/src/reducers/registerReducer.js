import {
  GET_REGISTER_USER_SUCCESS,
  GET_REGISTER_USER_BEGIN,
  GET_REGISTER_USER_FAILURE,
} from "../constants";

const inititalState = {
  loading: false,
  user: null,
  error: null,
};

const registerReducer = (state = inititalState, action) => {
  switch (action.type) {
    case GET_REGISTER_USER_BEGIN:
      return { ...state, loading: true };

    case GET_REGISTER_USER_SUCCESS:
      return { ...state, loading: false, user: action.user };

    case GET_REGISTER_USER_FAILURE:
      return { ...state, loading: false, error: action.error };

    default:
      return { ...state };
  }
};
export default registerReducer;
