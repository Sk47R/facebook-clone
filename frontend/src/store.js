import thunk from "redux-thunk";
import { combineReducers, createStore, applyMiddleware } from "redux";
import timelinePostReducer from "./reducers/postReducer";
import userReducer from "./reducers/userReducer";
import userPostReducer from "./reducers/userPostReducer";
import userUsernameReducer from "./reducers/userUsernameReducer";
import loginReducer from "./reducers/loginReducer";
import registerReducer from "./reducers/registerReducer";
import likeReducer from "./reducers/likeReducer";
import createPostReducer from "./reducers/createPost";
import getConversationReducer from "./reducers/getConversationReducer";
import getMessageReducer from "./reducers/getMessageReducer";

const rootReducer = combineReducers({
  timelinePost: timelinePostReducer,
  user: userReducer,
  userPost: userPostReducer,
  userUsername: userUsernameReducer,
  login: loginReducer,
  register: registerReducer,
  likes: likeReducer,
  createPost: createPostReducer,
  conversations: getConversationReducer,
  messages: getMessageReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
