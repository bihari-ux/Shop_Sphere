import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import HeroSection from "../Components/HeroSection";

import formValidator from "../FormValidators/formValidator";
export default function SignupPage() {
  let [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
  });
  let [errorMessage, setErrorMessage] = useState({
    name: "Full Name Field Is Mendatory",
    username: "User Name Field Is Mendatory",
    email: "Email Address Field Is Mendatory",
    phone: "Phone Number Field Is Mendatory",
    password: "Password Field Is Mendatory",
  });
  let [show, setShow] = useState(false);
  let navigate = useNavigate();

  function getInputData(e) {
    let { name, value } = e.target;
    setErrorMessage((old) => {
      return {
        ...old,
        [name]: formValidator(e),
      };
    });
    setData((old) => {
      return {
        ...old,
        [name]: value,
      };
    });
  }
  async function postData(e) {
    e.preventDefault();
    if (data.password === data.cpassword) {
      let error = Object.values(errorMessage).find((x) => x !== "");
      if (error) setShow(true);
      else {
        try {
          let response = await fetch(
            `${process.env.REACT_APP_BACKEND_SERVER}/api/user`,
            {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({
                name: data.name,
                username: data.username,
                email: data.email,
                phone: data.phone,
                password: data.password,
                role: "Buyer",
                active: true,
              }),
            }
          );
          response = await response.json();
          console.log(response);
          if (response.result === "Done") navigate("/login");
          else {
            setShow(true);
            setErrorMessage((old) => {
              return {
                ...old,
                username: response.reason?.username ?? "",
                email: response.reason?.email ?? "",
              };
            });
          }
        } catch (error) {
          alert("Internal Server Error");
        }
      }
    } else {
      setShow(true);
      setErrorMessage((old) => {
        return {
          ...old,
          password: "Password and Confirm Password Does Not Matched",
        };
      });
    }
  }
  return (
    <>
      <HeroSection title="Signup - Create Your Account" />

      <div className="container-fluid my-3 mb-5">
        <div className="row">
          <div className="col-md-8 col-sm-10 col-11 m-auto">
            <h5 className="bg-primary text-center text-light p-2">
              Create a Free Account
            </h5>
            <form onSubmit={postData}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Name*</label>
                  <input
                    type="text"
                    name="name"
                    onChange={getInputData}
                    placeholder="Full Name"
                    className={`form-control border-3 ${
                      show && errorMessage.name
                        ? "border-danger"
                        : "border-primary"
                    }`}
                  />
                  {show && errorMessage.name ? (
                    <p className="text-danger">{errorMessage.name}</p>
                  ) : null}
                </div>
                <div className="col-md-6 mb-3">
                  <label>Phone*</label>
                  <input
                    type="text"
                    name="phone"
                    onChange={getInputData}
                    placeholder="Phone Number"
                    className={`form-control border-3 ${
                      show && errorMessage.phone
                        ? "border-danger"
                        : "border-primary"
                    }`}
                  />
                  {show && errorMessage.phone ? (
                    <p className="text-danger">{errorMessage.phone}</p>
                  ) : null}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>User Name*</label>
                  <input
                    type="text"
                    name="username"
                    onChange={getInputData}
                    placeholder="User Name"
                    className={`form-control border-3 ${
                      show && errorMessage.username
                        ? "border-danger"
                        : "border-primary"
                    }`}
                  />
                  {show && errorMessage.username ? (
                    <p className="text-danger">{errorMessage.username}</p>
                  ) : null}
                </div>
                <div className="col-md-6 mb-3">
                  <label>Email*</label>
                  <input
                    type="email"
                    name="email"
                    onChange={getInputData}
                    placeholder="Email Address"
                    className={`form-control border-3 ${
                      show && errorMessage.email
                        ? "border-danger"
                        : "border-primary"
                    }`}
                  />
                  {show && errorMessage.email ? (
                    <p className="text-danger">{errorMessage.email}</p>
                  ) : null}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Password*</label>
                  <input
                    type="password"
                    name="password"
                    onChange={getInputData}
                    placeholder="Password"
                    className={`form-control border-3 ${
                      show && errorMessage.password
                        ? "border-danger"
                        : "border-primary"
                    }`}
                  />
                  {show && errorMessage.password ? (
                    <p className="text-danger">{errorMessage.password}</p>
                  ) : null}
                </div>
                <div className="col-md-6 mb-3">
                  <label>Confirm Password*</label>
                  <input
                    type="password"
                    name="cpassword"
                    onChange={getInputData}
                    placeholder="Confirm Password"
                    className={`form-control border-3 ${
                      show && errorMessage.password
                        ? "border-danger"
                        : "border-primary"
                    }`}
                  />
                </div>
              </div>

              <div className="mb-3">
                <button type="submit" className="btn btn-primary w-100">
                  Signup
                </button>
              </div>
            </form>
            <div className="mb-3">
              <Link to="/login">Already Have An Account?Login</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
