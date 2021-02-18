import React, {useState, useEffect} from 'react'
import {getHomeProducts, productCountTotal} from '../../functions/Product'
import ProductCard from '../cards/ProductCard'
import {Pagination} from 'antd'

import LoadingCard from '../cards/LoadingCard'

const JeanCollections = () => {
    const [products, setProducts] = useState([]);
    const [productsCount, setProductsCount] = useState(0);
    const [page, setPage] = useState(1);

    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      loadAllProducts();
    }, [page]);

    useEffect(() =>{
        productCountTotal().then((res) => setProductsCount(res.data))
    }, [])

    const loadAllProducts = () => {
      setLoading(true);
      getHomeProducts("createdAt", "desc", page).then((res) => {
        setProducts(res.data);
        setLoading(false);
      });
    };
  
    return (
      <>
        <div className="container">
        {loading ? (
          <LoadingCard count={3} />
        ) : (
          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-md-4">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div> 
      <div className="text-center col-md-4 offset-md-4 pt-5 ">
         <Pagination 
      current={page} total={(productsCount / 3) * 10}  
      onChange={(value) => setPage(value)}/> 
      </div>

      
    </>
  );
};

  
  export default JeanCollections;
  