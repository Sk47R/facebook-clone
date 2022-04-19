import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  let navigate = useNavigate();

  return (
    <div>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/:username" element={<Profile />} />
        </Routes>
      </Provider>
    </div>
  );
}

export default App;
