import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Facts from '../Components/Facts'
import About from '../Components/About'
import Features from '../Components/Features'
import Products from '../Components/Products'
import ProductSlider from '../Components/ProductSlider'
import Testimonials from '../Components/Testimonials'
import CategorySlider from '../Components/CategorySlider'

import { getMaincategory } from "../Redux/ActionCreartors/MaincategoryActionCreators"
import { getSubcategory } from "../Redux/ActionCreartors/SubcategoryActionCreators"
import { getBrand } from "../Redux/ActionCreartors/BrandActionCreators"
import { getProduct } from "../Redux/ActionCreartors/ProductActionCreators"
export default function Home() {
    let ProductStateData = useSelector((state) => state.ProductStateData)
    let MaincategoryStateData = useSelector((state) => state.MaincategoryStateData)
    let SubcategoryStateData = useSelector((state) => state.SubcategoryStateData)
    let BrandStateData = useSelector((state) => state.BrandStateData)

    let dispatch = useDispatch()

    useEffect(() => {
        (() => {
            dispatch(getMaincategory())
        })()
    }, [MaincategoryStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getSubcategory())
        })()
    }, [SubcategoryStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getBrand())
        })()
    }, [BrandStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getProduct())
        })()
    }, [ProductStateData.length])
    return (
        <>
            <div className="container-fluid px-0">
                <div id="carouselId" className="carousel slide" data-bs-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-bs-target="#carouselId" data-bs-slide-to="0" className="active" aria-current="true" aria-label="First slide"></li>
                        <li data-bs-target="#carouselId" data-bs-slide-to="1" aria-label="Second slide"></li>
                        <li data-bs-target="#carouselId" data-bs-slide-to="2" aria-label="Third slide"></li>
                    </ol>
                    <div className="carousel-inner" role="listbox">
                        <div className="carousel-item active">
                            <img src="img/banner1.jpg" style={{ height: 500 }} className="w-100" alt="First slide" />
                            <div className="carousel-caption">
                                <div className="container carousel-content">
                                    <h6 className="text-secondary h4 animated fadeInUp">Best Online Shopping Plateform</h6>
                                    <h1 className="text-white display-5 mb-4 animated fadeInRight">We Deals in Top Brand Products for Male</h1>
                                    <Link to="/shop?mc=Male" className="me-2"><button type="button" className="px-4 py-sm-3 px-sm-5 btn btn-primary rounded-pill carousel-content-btn1 animated fadeInLeft">Shop Now</button></Link>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src="img/banner5.jpg" style={{ height: 500 }} className="w-100" alt="Second slide" />
                            <div className="carousel-caption">
                                <div className="container carousel-content">
                                    <div className="container carousel-content">
                                        <h6 className="text-secondary h4 animated fadeInUp">Best Online Shopping Plateform</h6>
                                        <h1 className="text-white display-5 mb-4 animated fadeInRight">We Deals in Top Brand Products for Female</h1>
                                        <Link to="/shop?mc=Female" className="me-2"><button type="button" className="px-4 py-sm-3 px-sm-5 btn btn-primary rounded-pill carousel-content-btn1 animated fadeInLeft">Shop Now</button></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src="img/banner4.jpg" style={{ height: 500 }} className="w-100" alt="Second slide" />
                            <div className="carousel-caption">
                                <div className="container carousel-content">
                                    <h6 className="text-secondary h4 animated fadeInUp">Best Online Shopping Plateform</h6>
                                    <h1 className="text-white display-5 mb-4 animated fadeInRight">We Deals in Top Brand Products for Kids</h1>
                                    <Link to="/shop?mc=Kids" className="me-2"><button type="button" className="px-4 py-sm-3 px-sm-5 btn btn-primary rounded-pill carousel-content-btn1 animated fadeInLeft">Shop Now</button></Link>
                                </div>

                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselId" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselId" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>

            <Facts />
            <CategorySlider title="Maincategory" data={MaincategoryStateData.filter(x => x.active)} />
            <About title="Home" />
            <CategorySlider title="Subcategory" data={SubcategoryStateData.filter(x => x.active)} />
            <Features />
            {MaincategoryStateData.filter(x => x.active).map((item) => {
                return <Products title={item.name} data={ProductStateData.filter(x => x.active && x.maincategory?.name === item.name).slice(0, 12)} />
            })}
            <ProductSlider data={ProductStateData.filter(x => x.active)} />
            <CategorySlider title="Brand" data={BrandStateData.filter(x => x.active)} />
            <Testimonials />
        </>
    )
}
