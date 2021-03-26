import React, { useEffect, useState } from 'react'
import {useSelector, useDispatch} from "react-redux"
import { getUserCart, emptyUserCart, saveAddressInCart } from "../functions/User"
import { toast } from 'react-toastify'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'

const Checkout = () => {

    const [products, setProducts] = useState([])
    const [total, setTotal] = useState(0)
    const [address, setAddress] = useState("")
    const [saveAddress, setSaveAddress] = useState(false)

    const dispatch = useDispatch()
    const { user } = useSelector((state) => ({ ...state})); 

    useEffect(() => {
        getUserCart(user.token)
        .then(res => {
            console.log('user cart', JSON.stringify(res.data, null, 4))
            setProducts(res.data.products)
            setTotal(res.data.cartTotal)
        })
    }, [])
    const emptyCart = () => {
        if(typeof window !== 'undefined') {
            localStorage.removeItem("cart")
        }
        //remove from redux
        dispatch({
            type: 'ADD_TO_CART',
            payload: [],
        });
        // Remove from backend
        emptyUserCart(user.token)
        .then(res => {
            setProducts([])
            setTotal(0);
            toast.success("Cart is empty. Continue Shopping.")
        })
    }

    const checkOutOrder = () => {
        // console.log(address)
        saveAddressInCart(user.token, address)
        .then((res) => {
            if(res.data.ok) {
                setSaveAddress(true);
                toast.success("Address saved")
            }
        })
    }
    return (
        <div className="row">
            <div className="col-md-6">
                <h4>Delivery Address</h4>
                <br/>
                <br/>
                <ReactQuill theme="snow" 
                    value={address} 
                    placeholder="Enter your Delivery Address Here"
                    onChange={setAddress}/>
                <button className="btn btn-primary mt-2" onClick={checkOutOrder}>
                    Save
                </button>
                <hr/>
                <h4>
                    Got Coupon?
                </h4>
                <br/>
                Coupon input and apply button
            </div>

            <div className="col-md-6">
                <h4>Order Summary</h4>
                <hr/>
                <p>Products {products.length}</p>
                <hr/>
                {products.map((p, i) => (
                    <div key={i}>
                        <p>
                            {p.product.title} ({p.color}) x {p.count} ={" "}
                            {p.product.price * p.count}
                        </p>
                    </div>
                ))}
                <hr/>
                <p>Cart Total: {total}</p>

                <div className="row">
                    <div className="col-md-6">
                        <button 
                        className="btn btn-primary"
                        disabled={!saveAddress || !products.length}
                        >Place Order</button>
                    </div>
                    <div className="col-md-6">
                        <button 
                            disabled={!products.length}
                            onClick={emptyCart} 
                            className="btn btn-primary"
                        >
                            Empty Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout
