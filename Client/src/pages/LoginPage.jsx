import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import HeroSection from "../Components/HeroSection";
export default function LoginPage() {
  let [data, setData] = useState({
    username: "",
    password: "",
  });
  let [errorMessage, setErrorMessage] = useState("");

  let navigate = useNavigate();

  function getInputData(e) {
    let { name, value } = e.target;
    setErrorMessage("");
    setData((old) => {
      return {
        ...old,
        [name]: value,
      };
    });
  }
  async function postData(e) {
    e.preventDefault();
    try {
      let response = await fetch(
        `${process.env.REACT_APP_BACKEND_SERVER}/api/user/login`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            username: data.username,
            password: data.password,
          }),
        }
      );
      response = await response.json();
      if (response.result === "Done" && response.data.active === false) {
        setErrorMessage(
          "Your Account is not Active. Please Contact Us for More Details and To Activate Your Account Please Provide your Username or Registered Email Address in Contact Us Query"
        );
      } else if (response.result === "Done") {
        localStorage.setItem("login", true);
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("userid", response.data._id);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("token", response.token);
        if (response.data.role === "Buyer") navigate("/profile");
        else navigate("/admin");
      } else {
        setErrorMessage("Invalid Username or Password");
      }
    } catch (error) {
      alert("Internal Server Error");
    }
  }
  return (
    <>
      <HeroSection title="Login - Login to Your Account" />

      <div className="container-fluid my-3 mb-5">
        <div className="row">
          <div className="col-md-6 col-sm-8 col-10 m-auto">
            <h5 className="bg-primary text-center text-light p-2">
              Login to Your Account
            </h5>
            <form onSubmit={postData}>
              <div className="mb-3">
                <label>User Name*</label>
                <input
                  type="text"
                  name="username"
                  onChange={getInputData}
                  placeholder="User Name or Email Address"
                  className={`form-control border-3 ${
                    errorMessage ? "border-danger" : "border-primary"
                  }`}
                />
                {errorMessage ? (
                  <p className="text-danger">{errorMessage}</p>
                ) : null}
              </div>

              <div className="mb-3">
                <label>Password*</label>
                <input
                  type="password"
                  name="password"
                  onChange={getInputData}
                  placeholder="Password"
                  className={`form-control border-3 ${
                    errorMessage ? "border-danger" : "border-primary"
                  }`}
                />
              </div>

              <div className="mb-3">
                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
              </div>
            </form>
            <div className="mb-3 d-flex justify-content-between">
              <Link to="/forget-password-1">Forget Password?</Link>
              <Link to="/signup">Doesn't Have an Account?Signup</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
