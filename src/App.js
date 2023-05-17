import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoleSelection from "./components/RoleSelection";
import LandingPage from "./components/LandingPage";
import UploadResume from "./components/UploadResume";
import StudentLogin from "./components/StudentLogin";
import CompanyLogin from "./components/CompanyLogin";
import StudentResumeInfo from "./components/StudentResumeInfo";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminPage from "./components/AdminPage";
import StudentPage from "./components/StudentPage";
import ModeratorPage from "./components/ModeratorPage";
import Registration from "./components/Registration";
import StudentDashboard from "./components/StudentDashboard";
import PrivateRoute from "./components/PrivateRoute";
import ModeratorDashboard from "./components/ModeratorDashboard";
import AdminDashboard from "./components/AdminDashboard";

import script from 'https://kit.fontawesome.com/a81368914c.js';

const App = () => {
  return (
    <div>
      <Router>
        <ToastContainer position="bottom-center" />
        <Routes>

         <Route exact path="/morbhaisite" element={<RoleSelection />} />

          <Route exact path="/" element={<LandingPage />} />  
          <Route exact path="/uploadresume" element={<UploadResume />} /> 
          <Route exact path="/studentlogin" element={<StudentLogin />} /> 
          <Route exact path="/studentresumeinfo" element={<StudentResumeInfo/>} /> 
          <Route exact path="/companylogin" element={<CompanyLogin/>} /> 

          
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/student" element={<PrivateRoute />} >
            <Route path="dashboard" element={<StudentDashboard />} />
          </Route>
          <Route path="/moderator" element={<PrivateRoute />} >
            <Route path="dashboard" element={<ModeratorDashboard />} />
          </Route>
          <Route path="/admin" element={<PrivateRoute />} >
            <Route path="dashboard" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
