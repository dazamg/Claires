import React, {useEffect, useState} from 'react'
import {getProduct} from '../functions/Product'
import ViewProduct from './cards/ViewProduct'
const Product = ({match}) => {
    const [product, setProduct] = useState([]);

    const {slug} = match.params

    useEffect(() => {
        loadProduct()
    }, [slug])

    const loadProduct = () => {
        getProduct(slug).then((res) => setProduct(res.data));
    }
    return (
        <div className="container-fluid">
            <div className="row p-4">
                <ViewProduct product={product}/>
            </div>

            <div className="row">
                <div className="col text-center pt-5 pb-5">
                    <hr/>
                    <h4>Related products </h4>
                    <hr/>
                    </div>
            </div>
            
        </div>
    )
}

export default Product
