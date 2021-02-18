import React from 'react'
import TypewriterEffect from '../Components/cards/TypewriterEffect'
import JeanCollections from '../Components/Home/JeanCollections'
import BestSellers from '../Components/Home/BestSellers'
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
    </>
  );
};

  
  export default Home;
  