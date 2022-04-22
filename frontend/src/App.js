import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import useTokenAndId from "./components/tokenFetch";

import { BrowserRouter } from "react-router-dom";
import { useState } from "react";

function App() {
  const { token } = useTokenAndId();
  console.log(token);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={token ? <Home /> : <Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile/:username"
            element={token ? <Profile /> : <Login />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
