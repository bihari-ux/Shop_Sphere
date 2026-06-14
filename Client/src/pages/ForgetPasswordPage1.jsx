import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import HeroSection from '../Components/HeroSection'
export default function ForgetPasswordPage1() {
    let [username, setUsername] = useState("")
    let [errorMessage, setErrorMessage] = useState("")

    let navigate = useNavigate()

    function getInputData(e) {
        setUsername(e.target.value)
    }
    async function postData(e) {
        e.preventDefault()
        try {
            let response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/api/user/forget-password-1`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ username: username })
            })
            response = await response.json()
            if (response.result === "Done") {
                localStorage.setItem("reset-password-username", username)
                navigate("/forget-password-2")
            }
            else {
                setErrorMessage("User Not Found")
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
                                <label>User Name*</label>
                                <input type="text" name="username" onChange={getInputData} placeholder='User Name or Registered Email Address' className={`form-control border-3 ${errorMessage ? 'border-danger' : 'border-primary'}`} />
                                {errorMessage ? <p className='text-danger'>{errorMessage}</p> : null}
                            </div>

                            <div className="mb-3">
                                <button type="submit" className='btn btn-primary w-100'>Send OTP</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
