import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

export default function Navbar() {
    let navigate = useNavigate()
    function logout() {
        localStorage.clear()
        navigate("/login")
    }
    return (
      <>
        <div className="container-fluid bg-dark py-2 d-md-flex">
          <div className="container">
            <div className="d-flex justify-content-between topbar">
              <div className="top-info">
                <small className="me-3 text-white-50">
                  <Link
                    to="mailto:biharikumarrawat123@gmail.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-light"
                  >
                    <i className="fas fa-envelope me-2 text-secondary"></i>{" "}
                    <span className="d-none d-lg-inline">
                      biharikumarrawat123@gmail.com
                    </span>
                  </Link>
                </small>
                <small className="me-3 text-white-50">
                  <Link
                    to="tel:+919262645718"
                    target="_blank"
                    rel="noreferrer"
                    className="text-light"
                  >
                    <i className="fas fa-phone me-2 text-secondary"></i>{" "}
                    <span className="d-none d-lg-inline">+91-9262645718</span>
                  </Link>
                </small>
                <small className="me-3 text-white-50">
                  <Link
                    to="https://wa.me/+919262645718"
                    target="_blank"
                    rel="noreferrer"
                    className="text-light"
                  >
                    <i className="fa fa-whatsapp fs-5 me-2 text-secondary"></i>{" "}
                    <span className="d-none d-lg-inline">+91-9262645718</span>
                  </Link>
                </small>
              </div>
              <div className="top-link">
                <a
                  href="https://www.facebook.com/biharikumar.rawat.3/photos"
                  className="bg-light nav-fill btn btn-sm-square rounded-circle"
                >
                  <i className="fab fa-facebook-f text-primary"></i>
                </a>
                <a
                  href="https://x.com/BihariKuma50873"
                  className="bg-light nav-fill btn btn-sm-square rounded-circle"
                >
                  <i className="fab fa-twitter text-primary"></i>
                </a>
                <a
                  href="https://www.instagram.com/babu_brand_143/"
                  className="bg-light nav-fill btn btn-sm-square rounded-circle"
                >
                  <i className="fab fa-instagram text-primary"></i>
                </a>
                <a
                  href="https://www.linkedin.com/in/bihari-kumar-rawat-8b8267273/"
                  className="bg-light nav-fill btn btn-sm-square rounded-circle me-0"
                >
                  <i className="fab fa-linkedin-in text-primary"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid bg-primary sticky-top">
          <div className="mx-5">
            <nav className="navbar navbar-dark navbar-expand-lg py-0 ">
              <Link to="/" className="navbar-brand">
                <h1 className="text-white fw-bold d-block">
                  Shop<span className="text-secondary">Sphere</span>{" "}
                </h1>
              </Link>
              <button
                type="button"
                className="navbar-toggler me-0"
                data-bs-toggle="collapse"
                data-bs-target="#navbarCollapse"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse bg-transparent"
                id="navbarCollapse"
              >
                <div className="navbar-nav ms-auto mx-xl-auto p-0">
                  <NavLink to="/" className="nav-item nav-link text-secondary">
                    Home
                  </NavLink>
                  <NavLink to="/about" className="nav-item nav-link">
                    About
                  </NavLink>
                  <NavLink to="/shop" className="nav-item nav-link">
                    Shop
                  </NavLink>
                  <NavLink to="/features" className="nav-item nav-link">
                    Features
                  </NavLink>
                  <NavLink to="/testimonial" className="nav-item nav-link">
                    Testimonials
                  </NavLink>
                  <NavLink to="/contactus" className="nav-item nav-link">
                    Contact Us
                  </NavLink>
                </div>
              </div>
              <div className="d-none d-xl-flex flex-shirink-0">
                <div
                  id="phone-tada"
                  className="d-flex align-items-center justify-content-center me-4"
                >
                  <a
                    href=""
                    className="position-relative animated tada infinite"
                  >
                    <i className="fas fa-phone-alt text-white fa-2x"></i>
                    <div
                      className="position-absolute"
                      style={{ top: "-7px", left: "20px" }}
                    >
                      <span>
                        <i className="fas fa-comment-dots text-secondary"></i>
                      </span>
                    </div>
                  </a>
                </div>
                <div className="d-flex flex-column">
                  <span className="text-white-50">Have any questions?</span>
                  <span className="text-secondary">
                    Call:{" "}
                    <Link
                      to="tel:+919262645718"
                      className="text-light"
                      target="_blank"
                      rel="noreferrer"
                    >
                      +91-9262645718
                    </Link>
                  </span>
                </div>
              </div>
              <div
                className="collapse navbar-collapse bg-transparent"
                id="navbarCollapse"
              >
                <div className="navbar-nav ms-auto mx-xl-auto p-0">
                  {localStorage.getItem("login") ? (
                    <div className="nav-item dropdown">
                      <a
                        href="#"
                        className="nav-link dropdown-toggle"
                        data-bs-toggle="dropdown"
                      >
                        {localStorage.getItem("name")}
                      </a>
                      <div className="dropdown-menu rounded">
                        {localStorage.getItem("role") === "Buyer" ? (
                          <>
                            <Link to="/profile" className="dropdown-item">
                              Profile
                            </Link>
                            <Link to="/cart" className="dropdown-item">
                              Cart
                            </Link>
                            <Link to="/checkout" className="dropdown-item">
                              Checkout
                            </Link>
                          </>
                        ) : (
                          <Link to="/admin" className="dropdown-item">
                            Profile
                          </Link>
                        )}
                        <button className="dropdown-item" onClick={logout}>
                          Logout
                        </button>
                      </div>
                    </div>
                  ) : (
                    <NavLink to="/login" className="nav-item nav-link">
                      Login
                    </NavLink>
                  )}
                </div>
              </div>
            </nav>
          </div>
        </div>
      </>
    );
}
