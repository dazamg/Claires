import React, {useState, useEffect} from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import AdminNav from '../../nav/AdminNav'
import {getProduct} from '../../../functions/Product'
// import {getCategories, getCategorySubs} from '../../../functions/category'
// import FileUpload from '../../../Components/forms/FileUpload'
// import { LoadingOutlined } from "@ant-design/icons";



const initialState = {
    title: "Nike Dri-FIT",
    description: "Men's Fleece Training Pants",
    price: "55",
    categories: [],
    category: "",
    subs: [],
    shipping: "Yes",
    quantity: "30",
    images: [],
    colors: ["Black", "Brown", "Silver", "White", "Blue", "Grey"],
    brands: ["Nike", "Denim", "Addidas", "Target", "Under Amor"],
    color: "White",
    brand: "Apple",
  };

  const ProductUpdate = ({match}) => {
    const [values, setValues] = useState(initialState);
    // const [values, setValues] = useState("");

  
    // redux
    const { user } = useSelector((state) => ({ ...state }));

    let {slug} = match.params
  
    useEffect(() => {
        loadProduct()
    }, [])

    const loadProduct = () => {
            getProduct(slug)
            .then(p => {
                // console.log('single product', p)
                setValues({ ...values, ...p.data})
            })
    }

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <AdminNav />
          </div>
  
          <div className="col-md-10">
            <h4>Product update</h4>
            {JSON.stringify(values)}
            <hr />
  
          </div>
        </div>
      </div>
    );
  };
  
  export default ProductUpdate;
  
