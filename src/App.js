import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/Login/LoginPage';
import ForgotPasswordPage from './components/ForgotPasswordPage/ForgotPasswordPage';
import RegisterPage1 from './components/Register/RegisterPage1';
import RegisterPage2 from './components/Register/RegisterPage2';
import AircraftForm from './components/AircraftForm/AircraftForm';
import Dashboard from './components/Dashboard/Dashboard';
import ProfilePage from './components/Profile/ProfilePage';
import './App.css';
import AddLogbookForm from './components/AddLogbookForm/AddLogbookForm';
import AddWorkorderForm from './components/AddWorkorderForm/AddWorkorderForm';
import Header from './components/LandingPage/Header';
import Services from './components/LandingPage/Services';
import About from './components/LandingPage/About';
import Home from './components/LandingPage/Home';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} /> {/* Root URL displays LoginPage */}
        <Route path="/login" element={<LoginPage />} /> {/* Optional: Duplicate route for /login */}
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/register" element={<RegisterPage1 />} />
        <Route path="/register-step2" element={<RegisterPage2 />} />
        <Route path="/AddLogBook" element={<AddLogbookForm />} />
        <Route path="/AddWorkOrder" element={<AddWorkorderForm />} />
        <Route path="/aircraft-register" element={<AircraftForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/edit-profile" element={<ProfilePage />} />
        <Route path="/LandingPage" element={<Home/>}></Route>
        <Route path="/services" element={<Services/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;