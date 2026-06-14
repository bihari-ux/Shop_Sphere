import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import HeroSection from '../Components/HeroSection'
export default function ForgetPasswordPage3() {
    let [data, setData] = useState({
        password: "",
        cpassword: "",
    })
    let [errorMessage, setErrorMessage] = useState("")

    let navigate = useNavigate()

    function getInputData(e) {
        let { name, value } = e.target
        setErrorMessage("")
        setData((old) => {
            return {
                ...old,
                [name]: value
            }
        })
    }
    async function postData(e) {
        e.preventDefault()
        if (data.password === data.cpassword) {
            try {
                let response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/api/user/forget-password-3`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({ username: localStorage.getItem("reset-password-username"), password: data.password })
                })
                response = await response.json()
                if (response.result === "Done") {
                    localStorage.removeItem("reset-password-username")
                    navigate("/login")
                }
                else {
                    setErrorMessage(response.reason)
                }
            } catch (error) {
                alert("Internal Server Error")
            }
        }
        else
            setErrorMessage("Password and Confirm Password Doesn't Matched")
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
                                <label>Password*</label>
                                <input type="password" name="password" onChange={getInputData} placeholder='Password' className={`form-control border-3 ${errorMessage ? 'border-danger' : 'border-primary'}`} />
                                {errorMessage ? <p className='text-danger'>{errorMessage}</p> : null}
                            </div>

                            <div className="mb-3">
                                <label>Confirm Password*</label>
                                <input type="password" name="cpassword" onChange={getInputData} placeholder='Confirm Password' className={`form-control border-3 ${errorMessage ? 'border-danger' : 'border-primary'}`} />
                            </div>

                            <div className="mb-3">
                                <button type="submit" className='btn btn-primary w-100'>Reset Password</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
