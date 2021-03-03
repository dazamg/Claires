import React, { useState, useEffect } from 'react'
import {getProductsByCount, searchByFilter} from '../functions/Product'
import {useSelector, useDispatch} from 'react-redux'
import ProductCard from './cards/ProductCard'
import {  DownSquareOutlined, DollarOutlined } from '@ant-design/icons';
import { Menu, Slider } from "antd";

const { SubMenu, ItemGroup } = Menu;
const Shop = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [price, setPrice] = useState([0, 0])
    const [ok, setOk] = useState([0, 0])

    // I need to access search from the redux state
    let dispatch = useDispatch();
    let {search} = useSelector((state) => ({...state}));
    const { text } = search

    useEffect(() => {
        loadAllProducts()
    }, [])

    // load products by default on page load
    const loadAllProducts = () => {
            getProductsByCount(12).then((p) => {
            setProducts(p.data)
            setLoading(false)
        })
    } 
    //load products user search input
    useEffect(() => {
        filterProducts({query: text})
    }, [text])
       
    const filterProducts = (arg) => {
        searchByFilter(arg)
        .then((res) =>{
            setProducts(res.data)
        })
    }

    // Load products base on price range
    useEffect(() => {
      console.log('Request is good')
      filterProducts({price})
      
    }, [ok])

    const handleSlider = (value) => {
      dispatch({
        type: "SEARCH_QUERY"
      })
      setPrice(value)
    }

    return (
        <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 pt-2">
            <h4 className="mm">Search/Filter</h4>
            <hr />
  
            <Menu defaultOpenKeys={["1", "2"]} mode="inline">
              {/* category */}
              <SubMenu
                key="1"

                title={
                  <span className="h6">
                    <DollarOutlined /> Price
                  </span>
                }
              >
                <div style={{ maringTop: "-10px" }}>
                  <Slider className="ml-4 mr-4" 
                  tipFormatter={(v) => `$${v}`} 
                  range value={price}
                  onChange={handleSlider}
                  max="300"/>
                </div>
              </SubMenu>
              <SubMenu

                //key=2

                 // <span className="h6">
                  //   <DownSquareOutlined /> Categories
                  // </span>
              >
                
              </SubMenu>
            </Menu>
          </div>
  
          <div className="col-md-9 pt-2">
            {loading ? (
              <h4 className="text-danger">Loading...</h4>
            ) : (
              <h2 className="text-success text-center">𝕮𝖑𝖆𝖎𝖗𝖊'𝖘</h2>
            )}
  
            {products.length < 1 && <p>No products found</p>}
  
            <div className="row pb-5">
              {products.map((p) => (
                <div key={p._id} className="col-md-4 mt-3">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
export default Shop
