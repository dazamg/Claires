import React, { useState } from 'react'
import {Card, Tooltip} from 'antd'
import {EyeOutlined, ShoppingCartOutlined} from "@ant-design/icons"
import jeans from "../../images/jeans.jpg";
import {Link} from 'react-router-dom'
import _ from 'lodash'
import {useDispatch} from 'react-redux'

const { Meta } = Card;


const ProductCard = ({product}) => {
    const [toolTip, setToolTip] = useState("Click to add")
    const {images, title, description, slug, price} = product

    // const {user, cart } = useSelector((state) => ({ ...state}));
    const dispatch = useDispatch()
    
    
    const handleSubmit = () => {
        // create cart array
        let cart = []
        if(typeof window !== 'undefined') {
            // if cart is in localstorage Get it
            if(localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem("cart"));
            }
            // push new product to cart
            cart.push({
                ...product,
                count: 1,
            })
            // remove duplicates with lodash
            let duplicate = _.uniqWith(cart, _.isEqual)
            // Save to local Storage
            // console.log('unique', duplicate)
            localStorage.setItem('cart', JSON.stringify(duplicate))
             //show tooltip
            setToolTip("Added")

            // add to redux state
            dispatch({
                type: "ADD_TO_CART",
                payload: duplicate,
            })
            // show cart items in side drawer
            dispatch({
                type: "SET_VISIBLE",
                payload: true,
            })
        }
    }
    return (
        <Card
            
            cover={
                
                <img
                src={images && images.length ? images[0].url : jeans}
                style={{ height: "150px", objectFit: "cover" }}
                alt="Product Pictures" 
                />
            }

            actions={[
                <Link to={`/product/${slug}`}>

                    
                    <EyeOutlined className="text-warning" /> 
                    <br/> View Product
                </Link>,
                <Tooltip title={toolTip}>
                    <a onClick={handleSubmit}>
                        <ShoppingCartOutlined className="text-danger"/>
                    <br/> Add to Cart
                </a>
                </Tooltip>,
            ]}
            // className="m-2" 
            >
            <Meta
                title={title}
                price={price}
                description={`${description && description.substring(0, 40)}...`}
                
                
            />
        </Card>
    )
}

export default ProductCard
