import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import HeroSection from '../Components/HeroSection'
export default function ForgetPasswordPage2() {
    let [otp, setOtp] = useState("")
    let [errorMessage, setErrorMessage] = useState("")

    let navigate = useNavigate()

    function getInputData(e) {
        setOtp(e.target.value)
    }
    async function postData(e) {
        e.preventDefault()
        try {
            let response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/api/user/forget-password-2`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ username: localStorage.getItem("reset-password-username"), otp: otp })
            })
            response = await response.json()
            if (response.result === "Done")
                navigate("/forget-password-3")
            else {
                setErrorMessage(response.reason)
            }
        } catch (error) {
            alert("Internal Server Error")
        }
    }
    return (
        <>
            <HeroSection title="Reset Password" />

            <div className="container-fluid my-3 mb-5">
                <div className="row">
                    <div className="col-md-6 col-sm-8 col-10 m-auto">
                        <h5 className='bg-primary text-center text-light p-2'>Reset Password</h5>
                        <form onSubmit={postData}>

                            <div className="mb-3">
                                <label>OTP*</label>
                                <input type="text" name="otp" onChange={getInputData} placeholder='Enter OTP Which is Sent On Your Registered Email Address' className={`form-control border-3 ${errorMessage ? 'border-danger' : 'border-primary'}`} />
                                {errorMessage ? <p className='text-danger'>{errorMessage}</p> : null}
                            </div>

                            <div className="mb-3">
                                <button type="submit" className='btn btn-primary w-100'>Submit OTP</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
