import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import PasswordRecovery from './PasswordRecovery';
import VerifyEmail from './VerifyEmail';
import UpdatePassword from './UpdatePassword';
import RegisterDevice from './RegisterDevice';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/password-recovery" element={<PasswordRecovery />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route path="/register-device" element={<RegisterDevice />} />
      </Routes>
    </Router>
  );
}

export default App;
