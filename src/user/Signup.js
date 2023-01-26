import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";
import Alert from "@mui/material/Alert";
import { red } from "@mui/material/colors";

const Signup = () => {
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { firstname, lastname, email, password, error, success } = values;
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ firstname, lastname, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch((error) => {
        console.log("ERROR IN SIGNUP", error);
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

  const signupForm = () => {
    return (
      <form>
        <div>
          <input
            value={firstname}
            onChange={handleChange("firstname")}
            autoComplete="off" //this remove history of typing suggestion when typing
            type="text"
            placeholder="First name"
            name="firstname"
          ></input>
        </div>
        <div className="lastname">
          <input
            value={lastname}
            onChange={handleChange("lastname")}
            autoComplete="off"
            type="text"
            placeholder="Surname"
            name="lastname"
          ></input>
        </div>
        <div className="email">
          <input
            value={email}
            onChange={handleChange("email")}
            autoComplete="off"
            type="email"
            placeholder="email address"
            name="email"
          ></input>
        </div>
        <div className="password">
          <input
            value={password}
            onChange={handleChange("password")}
            autoComplete="off"
            type="password"
            placeholder="New password"
            name="password"
          ></input>
        </div>
        {/* <div className="DOB">
                <label>Date of birth</label>
                <input type="number" min="1" max="31" ></input>
                <input type="month"></input>
            </div>
            <div>
                <label>Gender</label>
                <input type="radio" id="female"></input>
                <label for="female">Female</label>
                <input type="radio" id="male"></input>
                <label for="male">Male</label>
            </div> */}
        <div className="d-grid gap-2">
          <button onClick={handleSubmit} className="signupBtn ">
            Sign Up
          </button>
        </div>
      </form>
    );
  };

  return (
    <div>
      {successMessage()}
      {errorMessage()}
      {signupForm()}
      <p>{JSON.stringify(values)}</p>
    </div>
  );
};

export default Signup;
