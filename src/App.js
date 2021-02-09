
import React from "react"
import {Switch, Route} from 'react-router-dom'
import Login from "./Components/Auth/Login"
import Signup from "./Components/Auth/Signup"
import Home from "./Components/Home"
import Header from "./Components/nav/Header"

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup}/>
      </Switch>
    </>
  );
};

export default App;
