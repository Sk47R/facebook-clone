import "./Login.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../actions/loginAction";
import Loader from "react-js-loader";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { user, error, loading } = useSelector((state) => state.login);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);

    dispatch(loginAction(email, password));
    navigate("/");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">facebook</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Facebook.
          </span>
        </div>
        <div className="loginRight">
          <form onSubmit={handleSubmit} className="loginBox">
            <input
              type="email"
              placeholder="Email"
              className="loginInput"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Password"
              className="loginInput"
              required
              value={password}
              minLength="6"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button className="loginButton" disabled={loading}>
              {loading ? <Loader size={35} bgColor={"white"} /> : "Log In"}
            </button>
            <span className="loginForgot">Forgot password?</span>
            <button className="loginRegisterButton">
              {loading ? (
                <Loader size={35} bgColor={"white"} />
              ) : (
                "Create new account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
