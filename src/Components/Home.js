import React from 'react'
import TypewriterEffect from '../Components/cards/TypewriterEffect'
import JeanCollections from '../Components/Home/JeanCollections'
import BestSellers from '../Components/Home/BestSellers'
import CategoryList from "./category/CategoryList"
import subList from "./Sub/SubList"
import { Layout} from 'antd';
import SubList from './Sub/SubList'

const { Footer } = Layout;
const Home = () => {

    return (
      <>
        <div className="jumbotron h1 font-weight-bold text-center text-danger">
            <TypewriterEffect text={['Welcome','to Claire`s']}/>
          
        </div>
       <h4 className=" text-center p-3 mt-5 display">
         Our Latest  Jeans Collection
         </h4>  
         <br/>
         <JeanCollections/>

         <h4 className=" text-center p-3 mt-5 display">
         Best Sellers
         </h4>
         <BestSellers />

         <h4 className=" text-center p-3 mt-5 display">
         More To Explore
         </h4>
         <CategoryList />

         <h4 className=" text-center p-3 mt-5 display">
         More To Explore
         </h4>
         <SubList />
         <Layout  className="text-center " >Ant Design ©2018 Created by Ant UED</Layout>
    </>
  );
};

  
  export default Home;
  