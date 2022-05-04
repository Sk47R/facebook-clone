import {
  GET_CONVERSATIONS_BEGIN,
  GET_CONVERSATIONS_SUCCESS,
  GET_CONVERSATIONS_FAILURE,
} from "../constants";

const inititalState = {
  loading: false,
  conversations: [],
  error: null,
};

const getConversationReducer = (state = inititalState, action) => {
  switch (action.type) {
    case GET_CONVERSATIONS_BEGIN:
      return { ...state, loading: true };

    case GET_CONVERSATIONS_SUCCESS:
      return { ...state, loading: false, conversations: action.conversations };

    case GET_CONVERSATIONS_FAILURE:
      return { ...state, loading: false, error: action.error };

    default:
      return { ...state };
  }
};
export default getConversationReducer;
