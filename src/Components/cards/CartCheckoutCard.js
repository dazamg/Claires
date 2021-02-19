import React from 'react'
import ModalImage from "react-modal-image";
import jeans from "../../images/jeans.jpg";
import {useDispatch } from "react-redux";

const CartCheckoutCard = ({p}) => {
    const colors = ["Black", "Brown", "Silver", "White", "Blue", "Grey"]
    const dispatch = useDispatch();


    const handleColorChange = (e) => {
        console.log("color", e.target.value)

        let cart = []
        if(typeof window !== 'undefined') {
            if(localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem("cart"))
            }
            cart.map((product, i) => {
                if(product._id === p._id) {
                    cart[i].color = e.target.value
                }
            })
            // console.log('color update', cart)
        localStorage.setItem('cart', JSON.stringify(cart));
        dispatch({
            type: "ADD_TO_CART",
            payload: cart,
        })
        }
    }
    return (
        <tbody>
            <tr>
                <div style={{width: "100px", height: "auto"}}>
                    {p.images.length ? (
                        <ModalImage small={p.images[0].url} large={p.images[0].url}/>
                    ) : (
                        <ModalImage small={jeans} large={jeans}/>
                    )}
                </div>
                <td>{p.title}</td>
                <td>${p.price}</td>
                <td>{p.brand}</td>
                    <select onChange={handleColorChange} name="color" className="form-control">
                        {p.color ? <option value={p.color}>{p.color}</option> : <option>Select</option>}
                        {colors
                        //filter out the colors in the array to check if the color is the same
                        .filter((c) => c !== p.color)
                        .map((c) => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>
                <td>{p.count}</td>
                <td>Shipping</td>
                <td>Delete icon</td>
            </tr>
        </tbody>
    )
}

export default CartCheckoutCard
