import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import HeroSection from '../Components/HeroSection'

import formValidator from '../FormValidators/formValidator'
import imageValidator from '../FormValidators/imageValidator'
export default function UpdateProfilePage() {
    let [data, setData] = useState({
        name: "",
        phone: "",
        address: "",
        pin: "",
        city: "",
        state: "",
        pic: ""
    })
    let [errorMessage, setErrorMessage] = useState({
        name: "",
        phone: "",
        pic: "",
    })
    let [show, setShow] = useState(false)
    let navigate = useNavigate()

    function getInputData(e) {
        let name = e.target.name
        let value = e.target.files ? e.target.files[0] : e.target.value  //in case of real backend
        // let value = e.target.files ? "product/" + e.target.files[0].name : e.target.value

        if (name !== "active") {
            setErrorMessage((old) => {
                return {
                    ...old,
                    [name]: e.target.files ? imageValidator(e) : formValidator(e)
                }
            })
        }
        setData((old) => {
            return {
                ...old,
                [name]: value
            }
        })
    }
    async function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find((x) => x !== "")
        if (error)
            setShow(true)
        else {
            try {
                let formData = new FormData()
                formData.append("_id", data._id)
                formData.append("name", data.name)
                formData.append("phone", data.phone)
                formData.append("address", data.address)
                formData.append("pin", data.pin)
                formData.append("city", data.city)
                formData.append("state", data.state)
                formData.append("pic", data.pic)
                let response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/api/user/${localStorage.getItem("userid")}`, {
                    method: "PUT",
                    headers: {
                        // "content-type": "application/json",
                        "authorization": localStorage.getItem("token")
                    },
                    // body: JSON.stringify({ ...data })
                    body:formData
                })
                response = await response.json()
                if (response.result === "Done") {
                    if (data.role === "Buyer")
                        navigate("/profile")
                    else
                        navigate("/admin")
                }
                else
                    alert("Something Went Wrong")
            }
            catch (error) {
                alert("Internal Server Error")
            }
        }
    }

    useEffect(() => {
        (async () => {
            try {
                let response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/api/user/${localStorage.getItem("userid")}`, {
                    method: "GET",
                    headers: {
                        "content-type": "application/json",
                        "authorization": localStorage.getItem("token")
                    }
                })
                response = await response.json()
                if (response.result === "Done")
                    setData(response.data)
            } catch (error) {
                alert("Internal Server Error")
            }
        })()
    }, [])
    return (
        <>
            <HeroSection title="Update Your Profile" />

            <div className="container-fluid my-3 mb-5">
                <div className="row">
                    <div className="col-md-8 col-sm-10 col-11 m-auto">
                        <h5 className='bg-primary text-center text-light p-2'>Update Your Profile</h5>
                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Name*</label>
                                    <input type="text" name="name" value={data.name} onChange={getInputData} placeholder='Full Name' className={`form-control border-3 ${show && errorMessage.name ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Phone*</label>
                                    <input type="text" name="phone" value={data.phone} onChange={getInputData} placeholder='Phone Number' className={`form-control border-3 ${show && errorMessage.phone ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.phone ? <p className='text-danger'>{errorMessage.phone}</p> : null}
                                </div>
                            </div>

                            <div className="mb-3">
                                <label>Address</label>
                                <textarea name="address" onChange={getInputData} placeholder='Address...' value={data.address} className='form-control border-3 border-primary'></textarea>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>City</label>
                                    <input type="text" name="city" onChange={getInputData} value={data.city} placeholder='City Name' className='form-control border-3 border-primary' />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>State</label>
                                    <input type="text" name="state" onChange={getInputData} value={data.state} placeholder='State Name' className='form-control border-3 border-primary' />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Pin Code</label>
                                    <input type="text" name="pin" onChange={getInputData} value={data.pin} placeholder='Pin Code' className='form-control border-3 border-primary' />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Pic</label>
                                    <input type="file" name="pic" onChange={getInputData} className={`form-control border-3 ${show && errorMessage.pic ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.pic ? <p className='text-danger'>{errorMessage.pic}</p> : null}
                                </div>
                            </div>

                            <div className="mb-3">
                                <button type="submit" className='btn btn-primary w-100'>Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
