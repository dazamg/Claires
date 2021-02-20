import React, { useState} from 'react'
import {Card, Tabs, Tooltip} from 'antd'
import {HeartOutlined, ShoppingCartOutlined} from "@ant-design/icons"
import {Link} from 'react-router-dom'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import jeans from "../../images/jeans.jpg";
import ProductListItems from './ProductListItems'
import _ from 'lodash'
import {useSelector, useDispatch} from 'react-redux'

const {TabPane} = Tabs;

const ViewProduct = ({product}) => {
    const [toolTip, setToolTip] = useState("Click to add")
    const {images, title, description} = product

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
        <>
            <div className="col-md-7">
                {images && images.length ? (
                <Carousel showArrows={true} autoPlay infiniteLoop >
                    {images && images.map((i) => <img src={i.url} alt="carousel pic" key={i.public_id} />)}
                </Carousel>
                ) : (
                <Card cover={<img src={jeans} alt="carousel pic" className="mb-3 card-image" />}></Card>
                )}
                <br/>
                <Tabs type="card">
                        <TabPane tab="Description" key="1">
                            {description && description}
                        </TabPane>
                        <TabPane tab="More" key="2">
                            
                        </TabPane>

                </Tabs>
            </div>

            <div className="col-md-5">
            <h1 className="text-center">{title}</h1>
                <Card
                actions=
                {[
                    <Tooltip title={toolTip}>
                    <a onClick={handleSubmit}>
                        <ShoppingCartOutlined className="text-danger"/>
                    <br/> Add to Cart
                </a>
                </Tooltip>,
                    <Link to="/">
                        <HeartOutlined className="text-danger"/>
                        <br/>
                        Add to WishList
                    </Link> 
                ]}
                >
                    <ProductListItems product={product}/>
                </Card>     
            </div>
        </>
    )
}

export default ViewProduct

