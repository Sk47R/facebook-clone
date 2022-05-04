import {
  GET_MESSAGES_BEGIN,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_FAILURE,
} from "../constants";

const inititalState = {
  loading: false,
  messages: [],
  error: null,
};

const getMessageReducer = (state = inititalState, action) => {
  switch (action.type) {
    case GET_MESSAGES_BEGIN:
      return { ...state, loading: true };

    case GET_MESSAGES_SUCCESS:
      return { ...state, loading: false, messages: action.messages };

    case GET_MESSAGES_FAILURE:
      return { ...state, loading: false, error: action.error };

    default:
      return { ...state };
  }
};
export default getMessageReducer;
