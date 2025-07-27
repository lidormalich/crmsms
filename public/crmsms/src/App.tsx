import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Register from "./components/Register";
import PagenotFound from "./components/Extra/PagenotFound";
import { ToastContainer } from "react-toastify";
import CreatNewCamp from "./components/CreatNewCamp";
import NotHaveAccess from "./components/Extra/NotHaveAccess";
import Invitation from "./components/WeddingInvitation/Invitation";
import Loading from "./components/Extra/Loading";
import AllCampaign from "./components/AllCampaign";
import Home from "./components/Home";
import Dashboard from "./components/Extra/Dashboard";
import Profile from "./components/Extra/Profile/Profile";
import InvitationComponent from "./components/InvitationComponent";
import ClientPage from "./components/ClientUpadteGuostPage/ClientPage";
import ParseExcel from "./components/Extra/ParseExcel";
import About from "./components/Extra/About";
import SaveTheDate from "./components/Extra/SaveTheDate/SaveTheDate";
import UploadImage from "./components/Extra/UploadImage";
import TableManager from "./components/TableManager";

export let siteTheme = React.createContext(false);
export let isLoginGlobal = React.createContext<boolean>(false);
export let globalContext = React.createContext<any>([]);

function App() {
  let [isLogin, setIsLoggedIn] = useState<boolean>(
    sessionStorage.getItem("IsLoggedIn") == "true" ? true : false
  );
  let [peopleChange, setPeopleChanged] = useState<boolean>(false);
  let [eventDate, setEventDate] = useState<boolean>(false);

  return (
    <div className='App'>
      <ToastContainer />
      <isLoginGlobal.Provider value={isLogin}>
        <globalContext.Provider value={[setEventDate, eventDate]}>
          <Router>
            <NavBar setIsLoggedIn={setIsLoggedIn} />
            <Routes>
              <Route
                path='/'
                element={<Home setIsLoggedIn={setIsLoggedIn} />}
              />
              <Route
                path='/register'
                element={<Register setIsLoggedIn={setIsLoggedIn} />}
              />
              <Route
                path='/login'
                element={<Login setIsLoggedIn={setIsLoggedIn} />}
              />
              <Route
                path='/NewCampaign'
                element={<CreatNewCamp />}
              />
              <Route
                path='/profile'
                element={<Profile />}
              />
              <Route
                path='/allcampaign'
                element={<AllCampaign />}
              />
              <Route
                path='/campaign/:eventId'
                element={
                  <InvitationComponent
                    setIsLoggedIn={setIsLoggedIn}
                    setPeopleChanged={setPeopleChanged}
                    peopleChange={peopleChange}
                  />
                }
              />
              <Route
                path='/event/:eventId/:phoneNum'
                element={<ClientPage />}
              />
              <Route
                path='/about'
                element={<About />}
              />
              <Route
                path='/invitation/:eventId'
                element={<Invitation />}
              />
              <Route
                path='/savethedate/:eventId'
                element={<SaveTheDate coupleImage={""} />}
              />
              <Route
                path='/uploadimage/:eventId'
                element={<UploadImage />}
              />
              <Route
                path='/importExcel/:id'
                element={<ParseExcel />}
              />
              <Route
                path='/tablemanager/:eventId'
                element={<TableManager />}
              />

              {/* <Route path='/loading' element={<Loading stringToShow={"BLOCKED ID"} />} /> */}
              <Route
                path='*'
                element={<PagenotFound />}
              />
            </Routes>
          </Router>
        </globalContext.Provider>
      </isLoginGlobal.Provider>
    </div>
  );
}

export default App;
