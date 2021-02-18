import React from 'react'
import {Card} from 'antd'
import {EyeOutlined, ShoppingCartOutlined} from "@ant-design/icons"
import jeans from "../../images/jeans.jpg";
import {Link} from 'react-router-dom'

const { Meta } = Card;

const ProductCard = ({product}) => {
    const {images, title, description, slug, price} = product
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
                <>
                    <ShoppingCartOutlined className="text-danger"/>
                    <br/> Add to Cart
                </>,
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
