import React from 'react'
import ModalImage from "react-modal-image";
import jeans from "../../images/jeans.jpg";
import {useDispatch } from "react-redux";
import {CheckCircleOutlined, CloseCircleOutlined, CloseOutlined} from '@ant-design/icons';
import { toast } from 'react-toastify';


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

    const handleCount = (e) => {
        
        let count = e.target.value < 1 ? 1 : e.target.value
        //check the quantity against the database
        if(count > p.quantity) {
            toast.error(`Max available quantity: ${p.quantity}`)
            return;
        }
         let cart = []
        
        if(typeof window !== 'undefined') {
            if(localStorage.getItem("cart")) {
                cart = JSON.parse(localStorage.getItem("cart"))
            }
            cart.map((product, index) => {
                if(product._id === p._id) {
                    cart[index].count = count
                }
                
            })
            localStorage.setItem('cart', JSON.stringify(cart))
            dispatch({
                type: "ADD_TO_CART",
                payload: cart,
            })
        }
    }

    const handleRemove = () => {
        console.log(p._id, "remove")
        let cart = []
        
        if(typeof window !== 'undefined') {
            if(localStorage.getItem("cart")) {
                cart = JSON.parse(localStorage.getItem("cart"))
            }
            cart.map((product, index) => {
                if(product._id === p._id) {
                    cart.splice(index, 1)
                }
                
            })
            localStorage.setItem('cart', JSON.stringify(cart))
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
                <td className="text-center">
                    <input
                    type="number"
                    className="form-control" value={p.count} onChange={handleCount}/>
                </td>
                <td className="text-center">{p.shipping === "Yes" ? <CheckCircleOutlined  className="text-success"/> : <CloseCircleOutlined className="text-danger"/>}</td>
                <td className="text-center">
                    <CloseOutlined onClick={handleRemove} className="text-danger pointer"/>
                </td>
            </tr>
        </tbody>
    )
}

export default CartCheckoutCard
