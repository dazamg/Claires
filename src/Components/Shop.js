import React, { useState, useEffect } from 'react'
import {getProductsByCount, searchByFilter} from '../functions/Product'
import {getCategories} from '../functions/category'
import {useSelector, useDispatch} from 'react-redux'
import ProductCard from './cards/ProductCard'
import {  DownSquareOutlined, DollarOutlined } from '@ant-design/icons';
import { Menu, Slider, Checkbox } from "antd";

const { SubMenu, ItemGroup } = Menu;
const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [categories, setCatergories] = useState([])
  const [categoryIds, setCaategoryIds ] = useState([])

  let dispatch = useDispatch();
  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  useEffect(() => {
    loadAllProducts();
    // fetch categories
    getCategories().then((res) => setCatergories(res.data))

  }, []);

  const filterProducts = (arg) => {
    searchByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };



  // 1. load products by default on page load
  const loadAllProducts = () => {
    getProductsByCount(12).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };

  // 2. load products on user search input
  useEffect(() => {
    const delayed = setTimeout(() => {
      filterProducts({ query: text });
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

  // 3. load products based on price range
  useEffect(() => {
    console.log("ok to request");
    filterProducts({ price });
  }, [ok]);

  const handleSlider = (value) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setCaategoryIds([])
    setPrice(value);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  // load products base on the category 
  // show categories in a list of checkbox
  const showCategories = () => categories.map((c) =>
    <div key={c._id}>
      <Checkbox 
      onChange={handleCheck}
      className="pb-2 pl-4 pr-4" 
      value={c._id}
      name="category"
      checked={categoryIds.includes(c._id)}>
        {c.name}
        <br/>
      </Checkbox>
    </div>
  )

  // handle check functiom
  const handleCheck = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0,0])
    // console.log(e.target.value)
    let newCheck = [...categoryIds]
    let nextChecked = e.target.value
    let foundNewCheck = newCheck.indexOf(nextChecked) // index or -1

    //indexOf method ?? if not found returns -1 else return index
    if(foundNewCheck === -1) {
      newCheck.push(nextChecked);
    } else {
      // if found pull out one item from index
      newCheck.splice(foundNewCheck, 1)
    }
    setCaategoryIds(newCheck);
    // console.log(newCheck)
    filterProducts({category: newCheck})
  }
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 pt-2">
          <h4>Search/Filter</h4>
          <hr />

          <Menu defaultOpenKeys={["1", "2"]} mode="inline">
            {/* Price */}
            <SubMenu
              key="1"
              title={
                <span className="h6">
                  <DollarOutlined /> Price
                </span>
              }
            >
              <div>
                <Slider
                  className="ml-4 mr-4"
                  tipFormatter={(v) => `$${v}`}
                  range
                  value={price}
                  onChange={handleSlider}
                  max="300"
                />
              </div>
            </SubMenu>
              {/* Categories */}
            <SubMenu
              key="2"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Categories
                </span>
              }
            >
              <div style={{ margin:"-10px"}}>
                {showCategories()}
              </div>
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

export default Shop;
