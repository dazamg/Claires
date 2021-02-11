
import React, { useEffect } from "react"
import {Switch, Route} from 'react-router-dom'
//toast 
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"




import Login from "./Components/Auth/Login"
import Signup from "./Components/Auth/Signup"
import SignupComplete from "./Components/Auth/SignupComplete"
import Home from "./Components/Home"
import Header from "./Components/nav/Header"

import {auth} from './firebase'
import {useDispatch} from 'react-redux'



const App = () => {
  const dispatch = useDispatch()

  // to check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if(user) {
        const idTokenResult = await user.getIdTokenResult()

        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            email: user.email,
            token: idTokenResult.token,

          }
        })
      }
    })
    // cleanup
    return () => unsubscribe()
  }, [])

  return (
    <>
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup}/>
        <Route exact path='/signup/complete' component={SignupComplete}/>
      </Switch>
    </>
  );
};

export default App;
