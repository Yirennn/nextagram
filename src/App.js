import React, {useState} from 'react';
import {Route,Switch} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';

// components
import HomePage from "./pages/HomePage";
import UserProfilePage from './pages/UserProfilePage';
import TopBar from './components/TopBar';
import MyProfilePage from './pages/MyProfilePage';
import UploadPage from './pages/UploadPage';

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"))

  return (
    <div style={{margin:"2px"}}>
      <ToastContainer/>
      <TopBar token={token} setToken={setToken}/>
      <Switch>
        <Route exact path="/">
          <HomePage/>
        </Route>
        <Route path="/users/:userId" component={UserProfilePage}/>
        <Route path="/profile" component={MyProfilePage}/>
        <Route path="/upload" component={UploadPage}/>
      </Switch>
    </div>
  );
}

export default App;
