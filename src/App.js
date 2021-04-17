import React, { useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import { Context } from '../src/index';
import Navbar from './components/Navbar';
import './App.css'
import {useAuthState} from "react-firebase-hooks/auth"
import Loader from "../src/components/Loader"

let App = () =>{
  
  const {auth} = useContext(Context);
  const [ user, loading, error] = useAuthState(auth);

  if(loading){
    return <Loader/>
  }
  
  if(error){
    return <>{alert(error, user)}</>
  }
return (
    <BrowserRouter>
      {/* <Navbar/> */}
      <AppRouter/>
    </BrowserRouter>
  )
}

export default App;