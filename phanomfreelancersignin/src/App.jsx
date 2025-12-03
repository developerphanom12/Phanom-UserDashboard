import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./GlobalComponents/ScrollToTop";
import Layout from "./Layout/Layout"
import LandingPage from "./pages/LandingPage/LandingPage";
import SignUp from "./pages/SignupMultiStep";
import Login from "./pages/Login";
import Tests from "./pages/Tests/Tests";
import Welcome from "./pages/Welcome/Welcome";
import Pass from "./pages/Scorecard/Pass"
import Fail from "./pages/Scorecard/Fail"
import TechnicalRound from "./pages/TechnicalRound/TechnicalRound";
import Interview from "./pages/Interview/Interview";
import ComingSoon from "./GlobalComponents/ComingSoon";
function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Interview - full screen without layout */}
        <Route path="/interview" element={<Interview/>}/>
        
        {/* Landing pages with layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/first-round-test" element={<Tests/>} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/pass" element={<Pass />} />
          <Route path="/fail" element={<Fail/>}/>
          <Route path="/technicalround" element={<TechnicalRound/>}/>
          <Route path="/coming-soon" element={<ComingSoon/>}/>
        </Route>

        {/* Auth pages without layout */}
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;


