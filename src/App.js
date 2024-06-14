import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'; 

import { ConfirmAccount } from "./components/ConfirmAccount";
import { LogIn } from "./components/LogIn";
import { SignUp } from "./components/SignUp";
import ResetPassword from "./components/ResetPassword";
import Profile from "./components/Profile";
import Main from "./components/Main";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/confirm" element={<ConfirmAccount />} />
        <Route path="/reset" element={<ResetPassword />} />

        <Route element={<ProtectedRoutes />}>
        <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
