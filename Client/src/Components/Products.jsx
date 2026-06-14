import React from 'react'
import { Link } from 'react-router-dom'

export default function Products({ title, data }) {
    return (
        <>
            <div className="container-fluid project py-5 mb-5">
                <div className="container">
                    {title !== "Shop" && <div className="text-center mx-auto pb-5 wow fadeIn" data-wow-delay=".3s" style={{ maxWidth: "600px" }}>
                        <h5 className="text-primary">Our Products</h5>
                        <h1>For {title}</h1>
                    </div>}
                    <div className="row g-5">
                        {data.map((item) => {
                            return <div key={item._id} className="col-md-6 col-lg-4 wow fadeIn" data-wow-delay=".3s">
                                <div className="project-item">
                                    <div className="project-img">
                                        <img src={`${process.env.REACT_APP_BACKEND_SERVER}/${item.pic[0]}`} style={{ height: 300 }} className="img-fluid w-100 rounded" alt="" />
                                        <div className="project-content">
                                            <Link to={`/product/${item._id}`} className="text-center">
                                                <h6 className="text-secondary">{item.name}</h6>
                                                <p className="m-0 text-white"><del>&#8377;{item.basePrice}</del> &#8377;{item.finalPrice} <sup>{item.discount}% off</sup></p>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}
