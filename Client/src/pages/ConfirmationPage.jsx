import React from 'react'
import HeroSection from '../Components/HeroSection'
import { Link } from 'react-router-dom'

export default function ConfirmationPage() {
  return (
    <>
      <HeroSection title="Order Has Been Placed" />

      <div className="container-fluid mt-3 mb-5 text-center p-5">
        <h1>Thank You</h1>
        <h2>Your Order Has Been Placed</h2>
        <h3>Now You Can Track Your Shipment in Profile Section</h3>
        <div className="btn-group">
          <Link to="/profile" className='btn btn-primary border-3 border-light'>Profile</Link>
          <Link to="/shop" className='btn btn-primary border-3 border-light'>Shop More</Link>
        </div>
      </div>
    </>
  )
}
