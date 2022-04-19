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

const rootReducer = combineReducers({
  timelinePost: timelinePostReducer,
  user: userReducer,
  userPost: userPostReducer,
  userUsername: userUsernameReducer,
  login: loginReducer,
  register: registerReducer,
  likes: likeReducer,
  createPost: createPostReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
