
import React, { useEffect } from "react"
import {Switch, Route} from 'react-router-dom'
//toast 
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"


import Home from "./Components/Home"
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

//Firebase and Redux
import {auth} from './firebase'
import {useDispatch} from 'react-redux'
import { currentUser } from "./functions/auth";

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
    <>
      <Header />
      <ToastContainer />
      <Switch>
        {/* Home ROUTE */}
        <Route exact path="/" component={Home} />
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
    </>
  );
};

export default App;
