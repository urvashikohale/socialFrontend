import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import { isAuthenticated, authenticate, login } from "../auth/helper/index";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;

  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    login({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const successMessage = () => {
    return (
      <div style={{ display: success ? "" : "none" }}>
        <Alert severity="success">
          Account created successfully. Go to <Link to="/">Login</Link>
        </Alert>
        {/* Account created successfully. Go to <Link to="/">Login</Link> */}
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div style={{ display: error ? "" : "none" }}>
        <Alert severity="error">{error}</Alert>
      </div>
    );
  };

  const loginForm = () => {
    return (
      <div className="container">
        <div className="left">
          <h1 className="text-primary">facebook</h1>
          <p>
            Facebook helps you connect and share with the people in your life.
          </p>
        </div>
        <div className="right">
          <form>
            <input
              type="text"
              value={email}
              onChange={handleChange("email")}
              placeholder="Email Address or phone number"
            />

            <input
              type="password"
              value={password}
              onChange={handleChange("password")}
              placeholder="Password"
            />
            {/* <div className="">
            <input
              type="submit"
              name=""
              className="loginBtn"
              value="Log In"
              onClick={loginUser}
            />
          </div> */}
            <button className="loginBtn" onClick={handleSubmit}>
              <Link to="/feed"></Link>
              LOG IN
            </button>
            <a href="" className="forget">
              Forgotten password?
            </a>
            <hr className="line" />
            <div className="signup">
              <Link to="/signup" className="signupBtn">
                Create New Account
              </Link>
            </div>
          </form>

          <p>Create a Page for a celebrity, brand or business</p>
        </div>
      </div>
    );
  };
  return <div>{loginForm()}</div>;
};

export default Login;
