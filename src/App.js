import React from "react";
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 

import { ConfirmAccount } from "./components/ConfirmAccount";
import { LogIn } from "./components/LogIn";
import { SignUp } from "./components/SignUp";
import { UserProvider } from './components/UserContext'; 
import ResetPassword from "./components/ResetPassword";

import Main from "./components/Main";

//App.js
function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/confirm" element={<ConfirmAccount />} />
          <Route path="/reset" element={<ResetPassword />} />
        </Routes>
      </Router>
    </UserProvider> 
  );
}

export default App;
