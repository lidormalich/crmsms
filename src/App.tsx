import React, { createContext, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import PagenotFound from './components/PagenotFound';
import { ToastContainer } from 'react-toastify';
import NewCampaign from './components/NewCampaign';
import NotHaveAccess from './components/NotHaveAccess';
import CreatNewCamp from './components/CreatNewCamp';

export let siteTheme = React.createContext(false);
function App() {
  let [isLogin, setIsLogIn] = useState<boolean>(sessionStorage.getItem("IsLoggedIn") == "true" ? true : false);



  return (
    <div className="App">


      <ToastContainer />
      <siteTheme.Provider value={isLogin}>
        <Router>
          <NavBar isLogin={isLogin} setIsLogIn={setIsLogIn} />
          <Routes>
            <Route path='/' element={<Login setIsLogIn={setIsLogIn} />} />
            <Route path='/register' element={<Register setIsLogIn={setIsLogIn} isLogin={isLogin} />} />
            <Route path='/home' element={<Home isLogin={isLogin} setIsLogIn={setIsLogIn} />} />
            <Route path='/NewCampaign' element={<CreatNewCamp />} />
            <Route path='/campaign/:eventId' element={<p>not have 2222access</p>} />
            <Route path='/:eventId/:phone' element={<NotHaveAccess />} />
            <Route path='/NotHaveAccess' element={<NotHaveAccess />} />
            <Route path='*' element={<PagenotFound />} />
          </Routes>
        </Router>
      </siteTheme.Provider>
    </div >
  );
}

export default App;
