import "./Register.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { registerAction } from "../../actions/registerAction";
import { Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [relation, setRelation] = useState("");
  const { user, error, loading } = useSelector((state) => state.register);

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(username, email, password, confirmPassword);
    if (password !== confirmPassword) {
      return;
      // set a front end validation
    }
    dispatch(
      registerAction(username, email, city, location, relation, password)
    );

    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setLocation("");
    setCity("");
    setRelation("");
  };

  return (
    <div className="login">
      <div className="registerWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">facebook</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Facebook.
          </span>
        </div>
        <div className="loginRight">
          <form onSubmit={handleRegister} className="registerBox">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              className="loginInput"
            />
            {error?.username ? (
              <p
                style={{
                  color: "red",
                  marginLeft: "8px",
                  fontSize: "1.2rem",
                  marginBottom: ".4rem",
                  marginTop: ".08rem",
                }}
              >
                {error.username}
              </p>
            ) : (
              ""
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="loginInput"
            />
            {error?.email ? (
              <p
                style={{
                  color: "red",
                  marginLeft: "8px",
                  fontSize: "1.2rem",
                  marginBottom: ".4rem",
                  marginTop: ".08rem",
                }}
              >
                {error.email}
              </p>
            ) : (
              ""
            )}

            <input
              type="text"
              placeholder="City"
              className="loginInput"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
            {error?.city ? (
              <p
                style={{
                  color: "red",
                  marginLeft: "8px",
                  fontSize: "1.2rem",
                  marginBottom: ".4rem",
                  marginTop: ".08rem",
                }}
              >
                {error.city}
              </p>
            ) : (
              ""
            )}

            <input
              type="text"
              placeholder="Location"
              className="loginInput"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            />
            {error?.location ? (
              <p
                style={{
                  color: "red",
                  marginLeft: "8px",
                  fontSize: "1.2rem",
                  marginBottom: ".4rem",
                  marginTop: ".08rem",
                }}
              >
                {error.location}
              </p>
            ) : (
              ""
            )}

            <input
              type="number"
              placeholder="Relation (1: single, 2: couple, 3: complecated)"
              className="loginInput"
              value={relation}
              onChange={(e) => {
                setRelation(e.target.value);
              }}
            />
            {error?.relation ? (
              <p
                style={{
                  color: "red",
                  marginLeft: "8px",
                  fontSize: "1.2rem",
                  marginBottom: ".4rem",
                  marginTop: ".08rem",
                }}
              >
                {error.relation}
              </p>
            ) : (
              ""
            )}

            <input
              type="password"
              placeholder="Password"
              className="loginInput"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {error?.password ? (
              <p
                style={{
                  color: "red",
                  marginLeft: "8px",
                  fontSize: "1.2rem",
                  marginBottom: ".4rem",
                  marginTop: ".08rem",
                }}
              >
                {error.password}
              </p>
            ) : (
              ""
            )}

            <input
              type="password"
              placeholder="Confirm Password"
              className="loginInput"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />

            <button className="loginButton">Sign Up</button>
            <Link
              to="/login"
              className="loginRegisterButton"
              style={{
                textDecoration: "none",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Log into Account
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
