
import React, { useEffect, lazy, Suspense } from "react"
import {Switch, Route} from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons';
//toast 
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

import './Home.css';

// //Nav header Components
import Home from "./Components/Home"
import SideDrawer from "./Components/drawer/SideDrawer"
import Shop from "./Components/Shop"

//Auth Components
import Login from "./Components/Auth/Login"
import Signup from "./Components/Auth/Signup"
import SignupComplete from "./Components/Auth/SignupComplete"
import ForgotPassword from "./Components/Auth/ForgotPassword"
import Header from "./Components/nav/Header"
//User Components
import History from "./Components/user/History"
import Password from "./Components/user/Password"
import WishList from "./Components/user/WishList"
import UserRoute from "./Components/routes/UserRoute"
//Admin Components
import AdminRoute from "./Components/routes/AdminRoute"
import AdminDashboard from "./Components/admin/AdminDashboard"
import CategoryCreate from "./Components/admin/category/CategoryCreate"
import CategoryUpdate from "./Components/admin/category/CategoryUpdate"
import SubCreate from "./Components/admin/sub/SubCreate"
import SubUpdate from "./Components/admin/sub/SubUpdate"
//Product Components
import ProductCreate from "./Components/admin/Product/ProductCreate"
import AllProducts from "./Components/admin/Product/AllProducts"
import ProductUpdate from "./Components/admin/Product/ProductUpdate"
import Product from "./Components/Product"
import CategoryHome from "./Components/category/CategoryHome"
import SubHome from "./Components/Sub/SubHome"
import Cart from "./Components/Cart"


//Firebase and Red
import {auth} from './firebase'
import {useDispatch} from 'react-redux'
import { currentUser } from "./functions/auth";



//Nav header Components
// import Home from "./Components/Home"
// import SideDrawer from "./Components/drawer/SideDrawer"
// import Shop from "./Components/Shop"

//Auth Components
// const Login = lazy(() => import("./Components/Auth/Login"))
// const Signup = lazy(() => import("./Components/Auth/Signup"))
// const SignupComplete = lazy(() => import("./Components/Auth/SignupComplete"))
// const ForgotPassword = lazy(() => import("./Components/Auth/ForgotPassword"))
// const Header = lazy(() => import("./Components/nav/Header"))

// //User Components
// const History = lazy(() => import("./Components/user/History"))
// const Password = lazy(() => import("./Components/user/Password"))
// const WishList = lazy(() => import("./Components/user/WishList"))
// const UserRoute = lazy(() => import("./Components/routes/UserRoute"))

// //Admin Components
// const AdminRoute = lazy(() => import("./Components/routes/AdminRoute"))
// const AdminDashboard = lazy(() => import("./Components/admin/AdminDashboard"))
// const CategoryCreate = lazy(() => import("./Components/admin/category/CategoryCreate"))
// const CategoryUpdate = lazy(() => import("./Components/admin/category/CategoryUpdate"))
// const SubCreate = lazy(() => import("./Components/admin/sub/SubCreate"))
// const SubUpdate = lazy(() => import("./Components/admin/sub/SubUpdate"))

// //Product Components
// const ProductCreate = lazy(() => import( "./Components/admin/Product/ProductCreate"))
// const AllProducts = lazy(() => import("./Components/admin/Product/AllProducts"))
// const ProductUpdate = lazy(() => import("./Components/admin/Product/ProductUpdate"))
// const Product = lazy(() => import("./Components/Product"))
// const CategoryHome = lazy(() => import("./Components/category/CategoryHome"))
// const SubHome = lazy(() => import("./Components/Sub/SubHome"))
// const Cart = lazy(() => import("./Components/Cart"))


const App = () => {
  const dispatch = useDispatch();

  // to check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        console.log("user", user);

        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));
      }
    });
    // cleanup
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Suspense fallback={
      <div className="col text-center p-5">
         Project 4 <LoadingOutlined /> Claire's
      </div>
    }>
      <Header />
      {/* Pop up side Nav */}
      <SideDrawer />
      {/* Toast message container */}
      <ToastContainer />
      <Switch>
        {/* Home ROUTE */}
        <Route exact path="/" component={Home} />
        {/* View Product ROUTE */}
        <Route exact path="/product/:slug" component={Product} />
        <Route exact path="/category/:slug" component={CategoryHome} />
        <Route exact path="/sub/:slug" component={SubHome} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/cart" component={Cart} />

        {/* Auth Routes */}
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signup/complete" component={SignupComplete} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
        {/* User Routes */}
        <UserRoute exact path="/user/history" component={History} />
        <UserRoute exact path="/user/password" component={Password} />
        <UserRoute exact path="/user/wishlist" component={WishList} />
        {/* Admin Routes */}
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute exact path="/admin/category" component={CategoryCreate} />
        <AdminRoute exact path="/admin/category/:slug" component={CategoryUpdate} />
        <AdminRoute exact path="/admin/sub" component={SubCreate} />
        <AdminRoute exact path="/admin/sub/:slug" component={SubUpdate} />
        {/* Product Routes */}
        <AdminRoute exact path="/admin/product" component={ProductCreate} />
        <AdminRoute exact path="/admin/products" component={AllProducts} />
        <AdminRoute exact path="/admin/product/:slug" component={ProductUpdate} />
      </Switch>
    </Suspense>
  );
};

export default App;
