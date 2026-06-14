import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';

import { EffectCards, EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';

import { getTestimonial } from "../Redux/ActionCreartors/TestimonialActionCreators"
export default function Testimonials() {
    let TestimonialStateData = useSelector(state => state.TestimonialStateData)
    let dispatch = useDispatch()

    let [slidesPerView, setSlidesPerView] = useState(window.innerWidth < 1000 ? 1 : 3)
    let [slideType, setSlideType] = useState(window.innerWidth < 1000 ? 'cards' : 'coverflow')
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
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: true,
        modules: [EffectCoverflow, Pagination, EffectCards, Autoplay],
        className: "mySwiper",
        observer: true,
        observeParents: true,
    }

    React.useEffect(() => {
        function handelWindoResize() {
            setSlidesPerView(window.innerWidth < 1000 ? 1 : 3)
            setSlideType(window.innerWidth < 1000 ? 'cards' : 'coverflow')
        }
        window.addEventListener("resize", handelWindoResize);
        return () => window.removeEventListener("resize", handelWindoResize);
    }, []);

    useEffect(() => {
        (() => {
            dispatch(getTestimonial())
        })()
    }, [TestimonialStateData.length])
    return (
        <>
            <div className="container-fluid testimonial py-5 mb-5">
                <div className="container">
                    <div className="text-center mx-auto pb-5 wow fadeIn" data-wow-delay=".3s" style={{ maxWidth: "600px" }}>
                        <h5 className="text-primary">Our Testimonial</h5>
                        <h1>Our Client Saying!</h1>
                    </div>

                    {TestimonialStateData && TestimonialStateData.filter(x => x.active).length > 0 && <Swiper {...options}>
                        {TestimonialStateData.filter(x => x.active).map(item => {
                            return <SwiperSlide key={item._id}>
                                <div className="testimonial-item border p-4">
                                    <div className="d-flex align-items-center">
                                        <div className="">
                                            <img src={item.pic?.startsWith("http") ? item.pic : `${process.env.REACT_APP_BACKEND_SERVER}/${item.pic}`} height={100} alt="" />
                                        </div>
                                        <div className="ms-4">
                                            <h4 className="text-secondary">{item.name}</h4>
                                            <div className="d-flex pe-5">
                                                <i className="fas fa-star me-1 text-primary"></i>
                                                <i className="fas fa-star me-1 text-primary"></i>
                                                <i className="fas fa-star me-1 text-primary"></i>
                                                <i className="fas fa-star me-1 text-primary"></i>
                                                <i className="fas fa-star me-1 text-primary"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border-top mt-4 pt-3">
                                        <p className="ps-2 pe-4 testimonial-message">{item.message}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        })}
                    </Swiper>}
                </div>
            </div >
        </>
    )
}
