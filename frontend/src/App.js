import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
import useTokenAndId from "./components/tokenFetch";

import { BrowserRouter } from "react-router-dom";
import Messenger from "./pages/messenger/Messenger";
import UserDetail from "./components/userDetail/UserDetail";

function App() {
  console.log("render");
  const { token } = useTokenAndId();
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userDetails" element={<UserDetail />} />
          <Route
            path="/"
            element={!token ? <Navigate to="/login" /> : <Home />}
          />

          <Route
            path="/profile/:username"
            element={token ? <Profile /> : <Login />}
          />
          <Route
            path="/messenger"
            element={!token ? <Navigate to="/login" /> : <Messenger />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
