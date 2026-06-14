import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'


import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

import HeroSection from '../Components/HeroSection'
import ProductSlider from '../Components/ProductSlider'


import { getProduct } from "../Redux/ActionCreartors/ProductActionCreators"
import { getCart, createCart } from "../Redux/ActionCreartors/CartActionCreators"
import { getWishlist, createWishlist } from "../Redux/ActionCreartors/WishlistActionCreators"
export default function ProductPage() {
    let { _id } = useParams()
    let [qty, setQty] = useState(1)
    let [data, setData] = useState({ pic: [] })
    let [relatedProducts, setRelatedProducts] = useState([])
    let [loop, setLoop] = useState(false)

    let ProductStateData = useSelector(state => state.ProductStateData)
    let CartStateData = useSelector(state => state.CartStateData)
    let WishlistStateData = useSelector(state => state.WishlistStateData)

    let dispatch = useDispatch()
    let navigate = useNavigate()

    let options = {
        effect: "cards",
        grabCursor: true,
        centeredSlides: false,
        slidesPerView: 1,
        loop: loop,
        pagination: false,
        modules: [EffectCards],
        className: "mySwiper"
    }

    function addToCart() {
        let item = CartStateData.find(x => x.product?._id === _id && x.user?._id === localStorage.getItem("userid"))
        if (!item) {
            dispatch(createCart({
                user: localStorage.getItem("userid"),
                product: data._id,
                // name: data.name,
                // brand: data.brand,
                // color: data.color,
                // size: data.size,
                // price: data.finalPrice,
                // stockQuantity: data.stockQuantity,
                qty: qty,
                total: data.finalPrice * qty,
                // pic: data.pic[0],
            }))
        }
        navigate("/cart")
    }

    function addToWishlist() {
        let item = WishlistStateData.find(x => x.product?._id === _id && x.user?._id === localStorage.getItem("userid"))
        if (!item) {
            dispatch(createWishlist({
                user: localStorage.getItem("userid"),
                product: data._id,
                // name: data.name,
                // brand: data.brand,
                // color: data.color,
                // size: data.size,
                // price: data.finalPrice,
                // stockQuantity: data.stockQuantity,
                // pic: data.pic[0],
            }))
        }
        navigate("/profile")
    }

    useEffect(() => {
        (() => {
            dispatch(getProduct())
            if (ProductStateData.length) {
                let item = ProductStateData.find(x => x._id === _id)
                setData(item)
                setRelatedProducts(ProductStateData.filter(x => x.active && x.maincategory?.name === item.maincategory?.name && x._id !== item._id))
            }
        })()
    }, [ProductStateData.length])

    useEffect(() => {
        let time = setTimeout(() => {
            setLoop(true)
        }, 1000)
        return () => clearTimeout(time)
    }, [])

    useEffect(() => {
        (() => {
            dispatch(getCart())
        })()
    }, [CartStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getWishlist())
        })()
    }, [WishlistStateData.length])
    return (
        <>
            <HeroSection title={`Product - ${data.name ? data.name : ""}`} />

            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-6">
                        <Swiper {...options} className='w-75'>
                            {
                                data.pic.map((item, index) => {
                                    return <SwiperSlide key={index} className='w-100'>
                                        <img src={`${process.env.REACT_APP_BACKEND_SERVER}/${item}`} style={{ height: 500, width: "100%" }} alt="" />
                                    </SwiperSlide>
                                })
                            }
                        </Swiper>
                    </div>
                    <div className="col-md-6">
                        <table className='table table-bordered table-striped'>
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                    <td>{data.name}</td>
                                </tr>
                                <tr>
                                    <th>Maincategory/Subcategory/Brand</th>
                                    <td>{data.maincategory?.name}/{data.subcategory?.name}/{data.brand?.name}</td>
                                </tr>
                                <tr>
                                    <th>Color/Size</th>
                                    <td>{data.color}/{data.size}</td>
                                </tr>
                                <tr>
                                    <th>Price</th>
                                    <td><del className='text-danger'>&#8377;{data.basePrice}</del> &#8377;{data.finalPrice} <sup className='text-success'>{data.discount}% Off</sup></td>
                                </tr>
                                <tr>
                                    <th>Stock</th>
                                    <td>{data.stock ? `Yes, ${data.stockQuantity} Left in Stock` : 'Out Of Stock'}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                        {data.stock ?
                                            <div className="row">
                                                <div className="col-md-4 mb-3">
                                                    <div className="btn-group w-100">
                                                        <button className='btn btn-primary w-25' onClick={() => qty > 1 ? setQty(qty - 1) : null}><i className='fa fa-minus'></i></button>
                                                        <h3 className='w-50 text-center'>{qty}</h3>
                                                        <button className='btn btn-primary w-25' onClick={() => qty < data.stockQuantity ? setQty(qty + 1) : null}><i className='fa fa-plus'></i></button>
                                                    </div>
                                                </div>
                                                <div className="col-md-8 mb-3">
                                                    <div className="btn-group w-100">
                                                        <button className='btn btn-primary' onClick={addToCart}><i className='fa fa-shopping-cart'></i> Add To Cart</button>
                                                        <button className='btn btn-secondary' onClick={addToWishlist}><i className='fa fa-heart'></i> Add To Wishlist</button>
                                                    </div>
                                                </div>
                                            </div> :
                                            <button className='btn btn-secondary w-100' onClick={addToWishlist}><i className='fa fa-heart'></i> Add To Wishlist</button>
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th>Description</th>
                                    <td><div dangerouslySetInnerHTML={{ __html: data.description }} /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <ProductSlider title="Other Related Products" data={relatedProducts} />
        </>
    )
}
