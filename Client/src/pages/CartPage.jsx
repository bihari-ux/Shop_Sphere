import React from 'react'
import HeroSection from '../Components/HeroSection'
import Cart from '../Components/Cart'

export default function CartPage() {
  return (
    <>
      <HeroSection title="Cart Section" />

      <div className="container-fluid mt-3 mb-5">
        <Cart title="Cart" />
      </div>
      <div className="pb-5"></div>
    </>
  )
}
