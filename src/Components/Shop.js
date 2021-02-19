import React, { useState, useEffect } from 'react'
import {getProductByCount} from '../functions/Product'
import {useSelector, useDispatch} from 'react-redux'
import ProductCard from './cards/ProductCard'


const Shop = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        loadAllProducts()
    }, [])

    const loadAllProducts = () => {
            getProductByCount(12).then((p) => {
            setProducts(p.data)
            setLoading(false)
        })
    }
       

    return (
        <div>
            <div>
                
            </div>
        </div>
    )
}

export default Shop
