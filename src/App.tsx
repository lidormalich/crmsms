import React, { createContext, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Register from './components/Register';
import InvitationTable from './components/InvitationManager';
import PagenotFound from './components/Extra/PagenotFound';
import { ToastContainer } from 'react-toastify';
import CreatNewCamp from './components/CreatNewCamp';
import NotHaveAccess from './components/Extra/NotHaveAccess';
import Booktable from './components/InvitationTable';
import Invitation from './components/WeddingInvitation/Invitation';
import Loading from './components/Extra/Loading';
import AllCampaign from './components/AllCampaign';

export let siteTheme = React.createContext(false);
function App() {
  let [isLogin, setIsLogIn] = useState<boolean>(sessionStorage.getItem("IsLoggedIn") == "true" ? true : false);
  let [peopleChange, setpeopleChanged] = useState<boolean>(false);



  return (
    <div className="App">


      <ToastContainer />
      <siteTheme.Provider value={isLogin}>
        <Router>
          <NavBar isLogin={isLogin} setIsLogIn={setIsLogIn} />
          <Routes>
            <Route path='/' element={<Login setIsLogIn={setIsLogIn} />} />
            <Route path='/register' element={<Register setIsLogIn={setIsLogIn} isLogin={isLogin} />} />
            <Route path='/login' element={<Login setIsLogIn={setIsLogIn} />} />
            {/* <Route path='/InvitationTable' element={<InvitationTable isLogin={isLogin} setIsLogIn={setIsLogIn} setpeopleChanged={setpeopleChanged} peopleChange={peopleChange} />} /> */}
            <Route path='/NewCampaign' element={<CreatNewCamp />} />
            <Route path='/allcampaign' element={<AllCampaign />} />
            <Route path='/campaign/:eventId' element={<InvitationTable isLogin={isLogin} setIsLogIn={setIsLogIn} setpeopleChanged={setpeopleChanged} peopleChange={peopleChange} />} />
            <Route path='/book' element={<Booktable peopleChanged={peopleChange} setPeopleChanged={setpeopleChanged} />} />
            <Route path='/:eventId/:phone' element={<NotHaveAccess />} />
            <Route path='/invitation/:eventId' element={<Invitation />} />
            <Route path='/nothaveaccess' element={<NotHaveAccess />} />
            {/* <Route path='/invitation' element={<WeddingInvitation />} /> */}

            <Route path='/loading' element={<Loading stringToShow={"BLOCKED ID"} />} />
            <Route path='*' element={<PagenotFound />} />
          </Routes>
        </Router>
      </siteTheme.Provider>
    </div >
  );
}

export default App;
