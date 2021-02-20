import React from 'react'
import TypewriterEffect from '../Components/cards/TypewriterEffect'
import JeanCollections from '../Components/Home/JeanCollections'
import BestSellers from '../Components/Home/BestSellers'
import CategoryList from "./category/CategoryList"
import subList from "./Sub/SubList"
import { Layout} from 'antd';
import SubList from './Sub/SubList'
import { Link } from "react-router-dom";
import {GithubOutlined, LinkedinOutlined} from "@ant-design/icons"

const { Footer } = Layout;
const Home = () => {

    return (
      <>
        <div className="jumbotron h1 font-weight-bold text-center ">
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

         {/* <h4 className=" text-center p-3 mt-5 display">
         More To Explore
         </h4>
         <SubList /> */}
         <Footer className="text-center" >
           <div className="container-fluid">
             <div className="row float-right">
                  <Link><GithubOutlined className="h5"/><br/>Github </Link>
                  <Link><LinkedinOutlined className="h5"/> <br/> Linkedin</Link>
             </div>
           </div>
           GA ©2021 Created by Clairvisual</Footer>
    </>
  );
};

  
  export default Home;
  