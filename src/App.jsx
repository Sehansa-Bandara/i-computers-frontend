
import './App.css'
import HomePage from './pages/homePage.jsx'
import LoginPage from './pages/loginPage.jsx'
import RegisterPage from './pages/registerPage.jsx'
import AdminPage from './pages/adminPage.jsx'
import TestPage from './pages/testPage.jsx'
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import api from "./lib/api";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import UserContext from './context/user.jsx'



function App() {
  const [user, setUser] = useState(null);
  const [userLoadingFinished, setUserLoadingFinished] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token"); 


    api
      .get("/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data.user);
        setUserLoadingFinished(true);
      })
      .catch(() => {
        toast.error("Please login again");
        localStorage.removeItem("token");
        setUser(null);
        setUserLoadingFinished(true);
      });
  }, []);


  return (
    <UserContext value={
      {
        user: user,
        setUser: setUser,
        userLoadingFinished: userLoadingFinished
      }
    }
    >
      <div className="w-full h-screen bg-primary">
        <Toaster position='top-right' />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/*" element={<HomePage user={user} />} />
        </Routes>





      </div>
    </UserContext>
  )
}

export default App
