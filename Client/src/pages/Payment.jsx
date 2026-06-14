import React, { useEffect, useState } from "react";
import { useRazorpay } from "react-razorpay";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { getCheckout } from "../Redux/ActionCreartors/CheckoutActionCreators";
import HeroSection from "../Components/HeroSection"

export default function Payment() {
    var [checkout, setcheckout] = useState({})

    const { Razorpay } = useRazorpay();

    var navigate = useNavigate()

    var { _id } = useParams()

    var dispatch = useDispatch()
    var CheckoutStateData = useSelector((state) => state.CheckoutStateData)


    async function getData() {
        dispatch(getCheckout())
        if (CheckoutStateData.length) {
            var result
            if (_id === "-1")
                result = CheckoutStateData[0]
            else
                result = CheckoutStateData.find((item) => item._id === _id)

            setcheckout(result)
        }
    }
    useEffect(() => {
        getData()
    }, [CheckoutStateData.length])

    const initPayment = (data) => {
        const options = {
            key: "rzp_test_kJFCr5jnzPYy9s",
            amount: data.amount,
            currency: "INR",
            order_id: data._id,
            "prefill": {
                "name": checkout?.user?.name,
                "email": checkout?.user?.email,
                "contact": checkout?.user?.phone,
            },
            handler: async (response) => {
                try {
                    var item = {
                        razorpay_payment_id: response.razorpay_payment_id,
                        checkid: checkout._id
                    }
                    response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/api/checkout/verify`, {
                        method: "post",
                        headers: {
                            "content-type": "application/json",
                            "authorization": localStorage.getItem("token")
                        },
                        body: JSON.stringify(item)
                    });
                    response = await response.json()
                    if (response.result === "Done") {
                        dispatch(getCheckout())
                        navigate("/confirmation")
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            theme: {
                color: "#3399cc",
            },
        };
        const rzp1 = new Razorpay(options);
        rzp1.open();
    };

    const handlePayment = async () => {
        try {
            var response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/api/checkout/order`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    authorization: localStorage.getItem("token")
                },
                body: JSON.stringify({ amount: checkout.total })
            });
            response = await response.json()
            initPayment(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <HeroSection title="Online Payment" />

            <div className="container my-5">
                {
                    checkout ? <button onClick={handlePayment} className="btn btn-primary w-100 m-auto">
                        Pay(&#8377;{checkout.total}) With Razorpay
                    </button> : ""
                }
            </div>
            <div style={{height:100}}></div>
        </>
    );
}
