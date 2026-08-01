

import './App.css'
import HomePage from './pages/homePage.jsx'
import LoginPage from './pages/loginPage.jsx'
import RegisterPage from './pages/registerPage.jsx'
import AdminPage from './pages/adminPage.jsx'
import TestPage from './pages/testPage.jsx'
import { Routes, Route } from 'react-router-dom';
import {Toaster} from 'react-hot-toast';


function App() {
  

  return (
    <div className="w-full h-screen bg-primary">
   <Toaster position='top-right'/>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/*" element={<HomePage />} />
      </Routes>
      
      
      

      
    </div>
  )
}

export default App
