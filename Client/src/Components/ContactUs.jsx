import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import formValidator from '../FormValidators/formValidator'

import { createContactUs } from "../Redux/ActionCreartors/ContactUsActionCreators"
export default function ContactUs() {
    let [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    })
    let [errorMessage, setErrorMessage] = useState({
        name: "Name Field Is Mendatory",
        email: "Email Address Field Is Mendatory",
        phone: "Phone Number Field Is Mendatory",
        subject: "Subject Field Is Mendatory",
        message: "Message Field Is Mendatory"
    })
    let [show, setShow] = useState()
    let [message, setMessage] = useState("")

    let dispatch = useDispatch()

    function getInputData(e) {
        let { name, value } = e.target
        setErrorMessage((old) => {
            return {
                ...old,
                [name]: formValidator(e)
            }
        })
        setData((old) => {
            return {
                ...old,
                [name]: value
            }
        })
    }
    function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find(x => x !== "")
        if (error)
            setShow(true)
        else {
            dispatch(createContactUs({ ...data, active: true, date: new Date }))
            setMessage("Thanks to Share Your Query With Us. Our Team Will Contact You Soon")
            setData({
                name: "",
                email: "",
                phone: "",
                subject: "",
                message: ""
            })
        }
    }
    return (
      <>
        <div className="container-fluid py-5 mb-5">
          <div className="container">
            <div
              className="text-center mx-auto pb-5 wow fadeIn"
              data-wow-delay=".3s"
              style={{ maxWidth: "600px" }}
            >
              <h5 className="text-primary">Get In Touch</h5>
              <h1 className="mb-3">Contact for any query</h1>
            </div>
            <div className="contact-detail position-relative p-5">
              <div className="row g-5 mb-5 justify-content-center">
                <div className="col-md-6 wow fadeIn" data-wow-delay=".3s">
                  <div className="d-flex bg-light p-3 rounded">
                    <div
                      className="flex-shrink-0 btn-square bg-secondary rounded-circle"
                      style={{ width: "64px", height: "64px" }}
                    >
                      <i className="fs-3 fas fa-map-marker-alt text-white"></i>
                    </div>
                    <div className="ms-3">
                      <h5 className="text-primary">Address</h5>
                      <a
                        href="https://www.google.com/maps/place/DUCAT/@28.5797958,77.3120864,706m/data=!3m2!1e3!4b1!4m6!3m5!1s0x390ce5106f125cfb:0xc516eda25aa8482c!8m2!3d28.5797958!4d77.3146667!16s%2Fg%2F1tcvmnf2?entry=ttu&g_ep=EgoyMDI1MDEyMC4wIKXMDSoASAFQAw%3D%3D"
                        target="_blank"
                        className=""
                      >
                        Sipaya Form, Gopalganj, Bihar, India
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 wow fadeIn" data-wow-delay=".5s">
                  <div className="d-flex bg-light p-3 rounded">
                    <div
                      className="flex-shrink-0 btn-square bg-secondary rounded-circle"
                      style={{ width: "64px", height: "64px" }}
                    >
                      <i className="fs-3 fa fa-phone text-white"></i>
                    </div>
                    <div className="ms-3">
                      <h5 className="text-primary">Call Us</h5>
                      <a className="" href="tel:+919262645718" target="_blank">
                        +91-9262645718
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 wow fadeIn" data-wow-delay=".5s">
                  <div className="d-flex bg-light p-3 rounded">
                    <div
                      className="flex-shrink-0 btn-square bg-secondary rounded-circle"
                      style={{ width: "64px", height: "64px" }}
                    >
                      <i className="fs-3 fa fa-whatsapp text-white"></i>
                    </div>
                    <div className="ms-3">
                      <h5 className="text-primary">Chat With Us</h5>
                      <a
                        className=""
                        href="https://wa.me/+919262645718"
                        target="_blank"
                      >
                        +91-9262645718
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 wow fadeIn" data-wow-delay=".7s">
                  <div className="d-flex bg-light p-3 rounded">
                    <div
                      className="flex-shrink-0 btn-square bg-secondary rounded-circle"
                      style={{ width: "64px", height: "64px" }}
                    >
                      <i className="fs-3 fa fa-envelope text-white"></i>
                    </div>
                    <div className="ms-3">
                      <h5 className="text-primary">Email Us</h5>
                      <a
                        className=""
                        href="mailto:biharikumarrawat123@gmail.com"
                        target="_blank"
                      >
                        biharikumarrawat123@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row g-5">
                <div className="col-lg-6 wow fadeIn" data-wow-delay=".3s">
                  <div className="p-5 h-100 rounded contact-map">
                    <iframe
                      width="100%"
                      height="100%"
                      id="gmap_canvas"
                      src="https://maps.google.com/maps?q=A-43%20Sector%2016%20Noida&t=k&z=13&ie=UTF8&iwloc=&output=embed"
                    ></iframe>
                  </div>
                </div>
                <div className="col-lg-6 wow fadeIn" data-wow-delay=".5s">
                  <div className="p-5 rounded contact-form">
                    {message && (
                      <p className="text-dark text-center">{message}</p>
                    )}
                    <form onSubmit={postData}>
                      <div className="mb-4">
                        <input
                          type="text"
                          name="name"
                          onChange={getInputData}
                          value={data.name}
                          className={`form-control border-3 ${
                            show && errorMessage.name
                              ? "border-danger"
                              : "border-success"
                          } py-2`}
                          placeholder={
                            show && errorMessage.name
                              ? "Name Field is Mendatory"
                              : "Your Name"
                          }
                        />
                      </div>
                      <div className="mb-4">
                        <input
                          type="email"
                          name="email"
                          e
                          onChange={getInputData}
                          value={data.email}
                          className={`form-control border-3 ${
                            show && errorMessage.email
                              ? "border-danger"
                              : "border-success"
                          } py-2`}
                          placeholder={
                            show && errorMessage.email
                              ? "Email Address Field is Mendatory"
                              : "Your Email Address"
                          }
                        />
                      </div>
                      <div className="mb-4">
                        <input
                          type="text"
                          name="phone"
                          onChange={getInputData}
                          value={data.phone}
                          className={`form-control border-3 ${
                            show && errorMessage.phone
                              ? "border-danger"
                              : "border-success"
                          } py-2`}
                          placeholder={
                            show && errorMessage.phone
                              ? "Phone Number Field is Mendatory"
                              : "Your Phone Number"
                          }
                        />
                      </div>
                      <div className="mb-4">
                        <input
                          type="text"
                          name="subject"
                          onChange={getInputData}
                          value={data.subject}
                          className={`form-control border-3 ${
                            show && errorMessage.subject
                              ? "border-danger"
                              : "border-success"
                          } py-2`}
                          placeholder={
                            show && errorMessage.subject
                              ? "Subject Field is Mendatory"
                              : "Subject"
                          }
                        />
                      </div>
                      <div className="mb-4">
                        <textarea
                          name="message"
                          className={`w-100 form-control border-3 ${
                            show && errorMessage.message
                              ? "border-danger"
                              : "border-success"
                          } py-2`}
                          rows="4"
                          onChange={getInputData}
                          value={data.message}
                          cols="10"
                          placeholder={
                            show && errorMessage.message
                              ? "Message Field is Mendatory"
                              : "Your Message"
                          }
                        ></textarea>
                      </div>
                      <div className="text-start">
                        <button
                          className="w-100 btn bg-primary text-white py-2 px-5"
                          type="submit"
                        >
                          Send Message
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}
