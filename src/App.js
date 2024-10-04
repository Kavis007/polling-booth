import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';

import Signup from './Signup';
import ForgotPassword from './Loginpage/Forgotpassword';
import VerifyOtpPassword from './Loginpage/Verifyotppassword';
import HomePage from './Homepage';
import Addpoll from './Addpoll';
import Top3polls from './Top3polls';
import Topnavbar from './Topnavbar';
import LoginPage from './Login';
import ProfilePage from './ProfilePage';
import Share from './Share/Share';

const Project = () => {
  const location = useLocation();
  const hidecolumns = location.pathname === "/" || location.pathname === "/Signup" || location.pathname==='/ForgotPassword' || location.pathname==='/VerifyOtpPassword' || location.pathname=='/share/:id' ;
  const hideNavbar = location.pathname === "/" || location.pathname === "/Signup"  || location.pathname==='/ForgotPassword' || location.pathname==='/VerifyOtpPassword' || location.pathname=='/share/:id' ;

  return (
    <div 
    // style={{overflowX:"auto",overflowy:'auto',height:"100vh",position:"relative",top:0,left:0}}
    >
      {/* Topnavbar Component (Always visible) */}
      {!hideNavbar && <Topnavbar />}

      <Row>
        {/* Left Sidebar / Offcanvas in Mobile View */}
        {!hideNavbar && (
          <Col xs={12} md={3} lg={3} className="d-none d-md-block">
            {/* Sidebar is already handled in Top3polls */}
          </Col>
        )}
        <Col xs={12} md={hidecolumns ? 12 : 6} lg={hidecolumns ? 12 : 6}>
          <Routes>
            <Route path="/" element={<LoginPage/>} />
            <Route path="/HomePage" element={<HomePage />} />
            <Route path='/VerifyOtpPassword' element={<VerifyOtpPassword/>}></Route>
            <Route path='/ForgotPassword' element={<ForgotPassword/>}></Route>
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Addpoll" element={<Addpoll />} />
            <Route path="/Addpoll/:editid" element={<Addpoll />} />
            <Route path='/Profilepage' element={<ProfilePage/>}/>
            <Route path='/share/:id' element={<Share/>}/>
          </Routes>
        </Col>
        {!hideNavbar && (
          <Col xs={12} md={3} lg={3} className="d-none d-md-block">
            <Top3polls />
          </Col>
        )}
      </Row>
    </div>
  );
};

function App() {
  return (
    <>
      <BrowserRouter>
        <Project />
      </BrowserRouter>
    </>
  );
}

export default App;
