import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Register from './components/Register';
import PagenotFound from './components/Extra/PagenotFound';
import { ToastContainer } from 'react-toastify';
import CreatNewCamp from './components/CreatNewCamp';
import Invitation from './components/WeddingInvitation/Invitation';
import AllCampaign from './components/AllCampaign';
import Home from './components/Home';
import Profile from './components/Extra/Profile/Profile';
import InvitationComponent from './components/InvitationComponent';
import ClientPage from './components/ClientUpadteGuostPage/ClientPage';
import ParseExcel from './components/Extra/ParseExcel';
import About from './components/Extra/About';
import SaveTheDate from './components/Extra/SaveTheDate/SaveTheDate';
import UploadImage from './components/Extra/UploadImage';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';

export let siteTheme = React.createContext(false);
export let isLoginGlobal = React.createContext<boolean>(false);
export let globalContext = React.createContext<any>([]);

const AppContent = () => {
  let [isLogin, setIsLogIn] = useState<boolean>(sessionStorage.getItem("IsLoggedIn") === "true");
  let [peopleChange, setpeopleChanged] = useState<boolean>(false);
  let [eventDate, setEventDate] = useState<boolean>(false);
  const { dir } = useLanguage();

  useEffect(() => {
    document.documentElement.setAttribute("dir", dir);
  }, [dir]);

  return (
    <div className="min-h-screen bg-slate-50">
      <ToastContainer
        position="top-center"
        hideProgressBar
        newestOnTop
        closeOnClick
        theme="light"
      />
      <isLoginGlobal.Provider value={isLogin}>
        <globalContext.Provider value={[setEventDate, eventDate]}>
          <Router>
            <NavBar setIsLogIn={setIsLogIn} />
            <div className="flex-1 pt-16 lg:pt-16  flex flex-col items-center">
              <Routes>
                <Route path='/' element={<Home setIsLogIn={setIsLogIn} />} />
                <Route path='/register' element={<Register setIsLogIn={setIsLogIn} />} />
                <Route path='/login' element={<Login setIsLogIn={setIsLogIn} />} />
                <Route path='/NewCampaign' element={<CreatNewCamp />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/allcampaign' element={<AllCampaign />} />
                <Route path='/campaign/:eventId' element={<InvitationComponent setIsLogIn={setIsLogIn} setpeopleChanged={setpeopleChanged} peopleChange={peopleChange} />} />
                <Route path='/event/:eventId/:phoneNum' element={<ClientPage />} />
                <Route path='/about' element={<About />} />
                <Route path='/invitation/:eventId' element={<Invitation />} />
                <Route path='/savethedate/:eventId' element={<SaveTheDate coupleImage={''} />} />
                <Route path='/uploadimage/:eventId' element={<UploadImage />} />
                <Route path='/importExcel/:id' element={<ParseExcel />} />
                <Route path='*' element={<PagenotFound />} />
              </Routes>
            </div>
          </Router>
        </globalContext.Provider>
      </isLoginGlobal.Provider>
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;