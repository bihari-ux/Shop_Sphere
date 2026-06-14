import React from 'react'
import HeroSection from '../Components/HeroSection'
import Profile from '../Components/Profile'
import Cart from '../Components/Cart'

export default function CheckoutPage() {
    return (
        <>
            <HeroSection title="Checkout Section" />
            <div className="container-fluid mt-3 mb-5">
                <div className="row">
                    <div className="col-md-6">
                        <Profile title="Checkout"/>
                    </div>
                    <div className="col-md-6">
                        <Cart title="Checkout"/>
                    </div>
                </div>
            </div>
            <div className="pb-5"></div>
        </>
    )
}
