import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    let [email, setEmail] = useState("")
    let [message, setMessage] = useState("")

    async function postData(e) {
        e.preventDefault()
        if (email.length === 0)
            setMessage("Please Enter a Valid Email Address")
        else {
            let response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/api/newsletter`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ email: email })
            })
            response = await response.json()
            console.log(response)
            if (response.result === "Done") {
                setMessage("Thanks to Subscribe Our Newsletter Service")
                setEmail("")
            }
            else
                setMessage(response.reason?.email)
        }
    }
    return (
        <>
            <div className="container-fluid footer bg-dark wow fadeIn px-4" data-wow-delay=".3s">
                <div className="row g-5">
                    <div className="col-lg-2 col-md-6">
                        <Link to="/">
                            <h1 className="text-white fw-bold d-block">Shop<span className="text-secondary">Sphere</span> </h1>
                        </Link>
                        <p className="mt-4 text-light">We Provide Upto 90% Discount on Top Brands Products and we deals in Kids, Female Male Products</p>
                        <div className="d-flex hightech-link">
                            <Link to="https://www.facebook.com/biharikumar.rawat.3" target='_blank' rel='noreferrer' className="btn-light nav-fill btn btn-square rounded-circle me-2"><i className="fab fa-facebook-f text-primary"></i></Link>
                            <Link to="#" target='_blank' rel='noreferrer' className="btn-light nav-fill btn btn-square rounded-circle me-2"><i className="fab fa-twitter text-primary"></i></Link>
                            <Link to="https://www.instagram.com/babu_brand_143/" target='_blank' rel='noreferrer' className="btn-light nav-fill btn btn-square rounded-circle me-2"><i className="fab fa-instagram text-primary"></i></Link>
                            <Link to="https://www.linkedin.com/in/bihari-kumar-rawat-dev/" target='_blank' rel='noreferrer' className="btn-light nav-fill btn btn-square rounded-circle me-0"><i className="fab fa-linkedin-in text-primary"></i></Link>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <h3 className="h3 text-secondary">Contact Us</h3>
                        <div className="text-white mt-4 d-flex flex-column contact-link">
                            <Link to="/" className="pb-3 text-light border-bottom border-primary"><i className="fas fa-map-marker-alt text-secondary me-2"></i> Sipaya Form, Gopalganj, Bihar, India</Link>
                            <Link to="tel:+919262645718" target='_blank' rel='noreferrer' className="py-3 text-light border-bottom border-primary"><i className="fas fa-phone-alt text-secondary me-2"></i> +91-9262645718</Link>
                            <Link to="https://wa.me/+919262645718" target='_blank' rel='noreferrer' className="py-3 text-light border-bottom border-primary"><i className="fa fa-whatsapp text-secondary me-2 fs-5"></i> +91-9262645718</Link>
                            <Link to="mailto:biharikumarrawat123@gmail.com" target='_blank' rel='noreferrer' className="py-3 text-light border-bottom border-primary"><i className="fas fa-envelope text-secondary me-2"></i> biharikumarrawat123@gmail.com</Link>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-6">
                        <h3 className="h3 text-secondary">Quick Link</h3>
                        <div className="mt-4 d-flex flex-column short-link">
                            <Link to="/" className="mb-2 text-white"><i className="fas fa-angle-right text-secondary me-2"></i>Home</Link>
                            <Link to="/about" className="mb-2 text-white"><i className="fas fa-angle-right text-secondary me-2"></i>About</Link>
                            <Link to="/shop" className="mb-2 text-white"><i className="fas fa-angle-right text-secondary me-2"></i>Shop</Link>
                            <Link to="/features" className="mb-2 text-white"><i className="fas fa-angle-right text-secondary me-2"></i>Features</Link>
                            <Link to="/testimonial" className="mb-2 text-white"><i className="fas fa-angle-right text-secondary me-2"></i>Testimonial</Link>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-6">
                        <h3 className="h3 text-secondary">Quick Link</h3>
                        <div className="mt-4 d-flex flex-column short-link">
                            <Link to="/contactus" className="mb-2 text-white"><i className="fas fa-angle-right text-secondary me-2"></i>ContactUs</Link>
                            <Link to="#" className="mb-2 text-white"><i className="fas fa-angle-right text-secondary me-2"></i>Privacy Policy</Link>
                            <Link to="" className="mb-2 text-white"><i className="fas fa-angle-right text-secondary me-2"></i>Terms & Conditions</Link>
                            <Link to="#" className="mb-2 text-white"><i className="fas fa-angle-right text-secondary me-2"></i>Refund Policy</Link>
                            <Link to="#" className="mb-2 text-white"><i className="fas fa-angle-right text-secondary me-2"></i>Delivery Policy</Link>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-12">
                        <h3 className="h3 text-secondary mb-4">Newsletter</h3>
                        <h6 className='text-light'>{message ? message : "Subscribe Our Newsletter Service to Get Latest Update About Our New Products and Great Deals"}</h6>
                        <form onSubmit={postData}>
                            <div className="mb-3">
                                <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Email Address' className='form-control' />
                            </div>
                            <button className='btn btn-secondary w-100' type='submit'>Subscribe</button>
                        </form>
                    </div>
                </div>
                <hr className="text-light mt-5 mb-4" />
                <div className="row">
                    <div className="col-md-6 text-center text-md-start">
                        <span className="text-light"><Link to="#" className="text-secondary"><i className="fas fa-copyright text-secondary me-2"></i>ShopSphere</Link>, All right reserved.</span>
                    </div>
                </div>
            </div>
        </>
    )
}
