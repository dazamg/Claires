import React, { useEffect, useState } from 'react'
import {useSelector, useDispatch} from "react-redux"
import { getUserCart } from "../functions/User"
import useSelection from 'antd/lib/table/hooks/useSelection'

const Checkout = () => {

    const [products, setProducts] = useState([])
    const [total, setTotal] = useState(0)

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
    const checkOutOrder = () => {

    }
    return (
        <div className="row">
            <div className="col-md-6">
                <h4>Delivery Address</h4>
                <br/>
                <br/>
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
                        <button className="btn btn-primary">Place Order</button>
                    </div>
                    <div className="col-md-6">
                        <button className="btn btn-primary">Empty Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout
