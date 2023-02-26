import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Register from './components/Register';
import PagenotFound from './components/Extra/PagenotFound';
import { ToastContainer } from 'react-toastify';
import CreatNewCamp from './components/CreatNewCamp';
import NotHaveAccess from './components/Extra/NotHaveAccess';
import Invitation from './components/WeddingInvitation/Invitation';
import Loading from './components/Extra/Loading';
import AllCampaign from './components/AllCampaign';
import Home from './components/Home';
import Dashboard from './components/Extra/Dashboard';
import Profile from './components/Extra/Profile/Profile';
import InvitationComponent from './components/InvitationComponent';
import ClientPage from './components/ClientUpadteGuostPage/ClientPage';
import ParseExcel from './components/Extra/ParseExcel';
import ManageAllGroup from './components/MangeGroup/ManageAllGroup';
import About from './components/Extra/About';
import SaveTheDate from './components/Extra/SaveTheDate/SaveTheDate';

export let siteTheme = React.createContext(false);
export let isLoginGlobal = React.createContext<boolean>(false);

function App() {
  let [isLogin, setIsLogIn] = useState<boolean>(sessionStorage.getItem("IsLoggedIn") == "true" ? true : false);
  let [peopleChange, setpeopleChanged] = useState<boolean>(false);
  let [groupChange, setgroupChanged] = useState<boolean>(false);

  return (

    <div className="App">


      <ToastContainer />
      <isLoginGlobal.Provider value={isLogin}>

        <Router>
          <NavBar setIsLogIn={setIsLogIn} />
          <Routes>
            <Route path='/' element={<Home setIsLogIn={setIsLogIn} />} />
            <Route path='/register' element={<Register setIsLogIn={setIsLogIn} />} />
            <Route path='/login' element={<Login setIsLogIn={setIsLogIn} />} />
            {/* <Route path='/InvitationTable' element={<InvitationTable  setIsLogIn={setIsLogIn} setpeopleChanged={setpeopleChanged} peopleChange={peopleChange} />} /> */}
            <Route path='/NewCampaign' element={<CreatNewCamp />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/allcampaign' element={<AllCampaign />} />
            <Route path='/campaign/:eventId' element={<InvitationComponent setIsLogIn={setIsLogIn} setpeopleChanged={setpeopleChanged} peopleChange={peopleChange} />} />
            <Route path='/group/:eventId' element={<ManageAllGroup setIsLogIn={setIsLogIn} setGroupChanged={setgroupChanged} groupChanged={groupChange} />} />
            <Route path='/event/:eventId/:phoneNum' element={<ClientPage />} />
            <Route path='/9090' element={<ParseExcel />} />
            <Route path='/about' element={<About />} />
            <Route path='/invitation/:eventId' element={<Invitation />} />
            <Route path='/nothaveaccess' element={<NotHaveAccess />} />
            <Route path='/dashboard' element={<Dashboard letA='lidor' letC='500' letb='400' />} />
            {/* <Route path='/invitation' element={<WeddingInvitation />} /> */}
            <Route path='/savethedate' element={<SaveTheDate />} />

            <Route path='/loading' element={<Loading stringToShow={"BLOCKED ID"} />} />
            <Route path='*' element={<PagenotFound />} />
          </Routes>
        </Router>
      </isLoginGlobal.Provider>
    </div >
  );
}

export default App;
