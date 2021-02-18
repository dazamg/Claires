import React from 'react'
import {Card, Tabs, Descriptions} from 'antd'
import {HeartOutlined, ShoppingCartOutlined} from "@ant-design/icons"
import {Link} from 'react-router-dom'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import jeans from "../../images/jeans.jpg";
import ProductListItems from './ProductListItems'

const {TabPane} = Tabs;

const ViewProduct = ({product}) => {
    const {images, title, description} = product
    return (
        <>
            <div className="col-md-7">
                {images && images.length ? (
                <Carousel  showArrows={true} autoPlay infiniteLoop>
                    <div>
                        {images && images.map((i) => <img src={i.url} alt="Product description" key={i.public_id}/>)}
                    </div>    
                </Carousel>
                ) : (
                    <Card
                    cover={
                        <img
                        src={jeans}
                        alt="Product Pictures" 
                        className="mb-3 card-image"
                        />
                        }
                    >     
                    </Card>
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
                    <>
                        <ShoppingCartOutlined className="text-success"/><br/>
                        Add to Cart
                    </>,
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

