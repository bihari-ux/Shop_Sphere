import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';

import { EffectCards, EffectCoverflow, Pagination } from 'swiper/modules';
import { Link, useNavigate } from 'react-router-dom';

export default function ProductSlider({ title, data }) {
    let [slidesPerView, setSlidesPerView] = useState(window.innerWidth < 1000 ? 1 : 3)
    let [slideType, setSlideType] = useState(window.innerWidth < 1000 ? 'cards' : 'coverflow')
    let navigate = useNavigate()
    let options = {
        effect: slideType,
        grabCursor: true,
        centeredSlides: false,
        slidesPerView: slidesPerView,
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
        },
        loop: true,
        pagination: false,
        modules: [EffectCoverflow, Pagination, EffectCards],
        className: "mySwiper"
    }
    function handelWindoResize() {
        setSlidesPerView(window.innerWidth < 1000 ? 1 : 3)
        setSlideType(window.innerWidth < 1000 ? 'cards' : 'coverflow')
        navigate(0)
    }
    window.addEventListener("resize", handelWindoResize);
    return (
        <>
            <div className="container-fluid py-5 mb-5 team">
                <div className="container">
                    <div className="text-center mx-auto pb-5 wow fadeIn" data-wow-delay=".3s" style={{ maxWidth: "600px" }}>
                        <h5 className="text-primary">{title ? title : "Our Latest Products"}</h5>
                        <h1>Checkout Our {title ? title : "Latest Products"}  of Top Brands</h1>
                    </div>
                    <Swiper {...options}>
                        {data?.map((item) => {
                            return <SwiperSlide key={item._id}>
                                <div className="rounded team-item">
                                    <div className="team-content">
                                        <div className="team-img-icon">
                                            <div className="team-img rounded-circle">
                                                <img src={`${process.env.REACT_APP_BACKEND_SERVER}/${item.pic[0]}`} style={{ height: 300 }} className="img-fluid w-100 rounded-circle" alt="" />
                                            </div>
                                            <div className="team-name text-center py-3">
                                                <h4 className="">{item.name}</h4>
                                                <p className="m-0"><del>&#8377;{item.basePrice}</del> &#8377;{item.finalPrice} <sup>{item.discount}% Off</sup></p>
                                            </div>
                                            <div className="team-icon d-flex justify-content-center pb-4">
                                                <Link className="btn btn-secondary text-white m-1" to={`/product/${item._id}`}><i className="fa fa-shopping-cart"></i> Add to Cart</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        })}
                    </Swiper>
                </div>
            </div>
        </>
    )
}
