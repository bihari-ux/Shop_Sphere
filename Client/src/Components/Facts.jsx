import React from 'react'

export default function Facts() {
  return (
    <>
        <div className="container-fluid bg-secondary py-5">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 wow fadeIn" data-wow-delay=".1s">
                        <div className="d-flex counter">
                            <h1 className="me-3 text-primary counter-value">100</h1>
                            <h5 className="text-white mt-1">Top Brands</h5>
                        </div>
                    </div>
                    <div className="col-lg-3 wow fadeIn" data-wow-delay=".3s">
                        <div className="d-flex counter">
                            <h1 className="me-3 text-primary counter-value">1000</h1>
                            <h5 className="text-white mt-1">Products</h5>
                        </div>
                    </div>
                    <div className="col-lg-3 wow fadeIn" data-wow-delay=".5s">
                        <div className="d-flex counter">
                            <h1 className="me-3 text-primary counter-value">7</h1>
                            <h5 className="text-white mt-1">Days Refund Policy</h5>
                        </div>
                    </div>
                    <div className="col-lg-3 wow fadeIn" data-wow-delay=".7s">
                        <div className="d-flex counter">
                            <h1 className="me-3 text-primary counter-value">100000</h1>
                            <h5 className="text-white mt-1">Happy Customers</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
