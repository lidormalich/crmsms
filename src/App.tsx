import React, { useState } from 'react';
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

function App() {
  let [isLogin, setIsLogIn] = useState<boolean>(sessionStorage.getItem("IsLoggedIn") == "true" ? true : false);

  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <NavBar isLogin={isLogin} setIsLogIn={setIsLogIn} />
        <Routes>
          <Route path='/' element={<Login setIsLogIn={setIsLogIn} />} />
          <Route path='/register' element={<Register setIsLogIn={setIsLogIn} isLogin={isLogin} />} />
          <Route path='/home' element={<Home isLogin={isLogin} setIsLogIn={setIsLogIn} />} />
          <Route path='/NewCampaign' element={<NewCampaign />} />
          <Route path='/campaign/:eventId' element={<p>not have 2222access</p>} />
          <Route path='/:eventId/:phone' element={<p>Page not work</p>} />
          <Route path='*' element={<PagenotFound />} />
        </Routes>
      </Router>
    </div >
  );
}

export default App;
