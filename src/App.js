import React, {useState,useEffect} from 'react';
import {Route,Switch} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';

import HomePage from "./pages/HomePage";
import UserProfilePage from './pages/UserProfilePage';
import TopBar from './components/TopBar';
import MyProfilePage from './pages/MyProfilePage';

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"))

  return (
    <div style={{margin:'2px'}}>
      <ToastContainer/>
      <TopBar token={token} setToken={setToken}/>
      <Switch>
        <Route exact path='/'><HomePage/></Route>
        <Route path='/users/:userId' component={UserProfilePage}/>
        <Route path='/profile' component={MyProfilePage}/>
      </Switch>
    </div>
  );
}

export default App;
