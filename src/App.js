
import React, { useEffect } from "react"
import {Switch, Route} from 'react-router-dom'
//toast 
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"




import Login from "./Components/Auth/Login"
import Signup from "./Components/Auth/Signup"
import SignupComplete from "./Components/Auth/SignupComplete"
import ForgotPassword from "./Components/Auth/ForgotPassword"
import Home from "./Components/Home"
import Header from "./Components/nav/Header"
import History from "./Components/user/History"
import UserRoute from "./Components/routes/UserRoute"

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
  }, []);
  
  return (
    <>
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup}/>
        <Route exact path='/signup/complete' component={SignupComplete}/>
        <Route exact path='/forgot/password' component={ForgotPassword}/>
        <UserRoute exact path='/user/history' component={History}/>
      </Switch>
    </>
  );
};

export default App;
