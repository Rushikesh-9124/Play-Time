import React, { useState ,useEffect} from 'react'
import './App.css'
import Navbar from './components/NavBar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import {  Routes, Route } from "react-router-dom";
import Home from './Pages/Home/Home'
import Video from './Pages/Video/Video'

const App = () => {

  const [sideBar, setSideBar] = useState(true);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add("bg-dark");
    } else {
      document.body.classList.remove("bg-dark");
    }
  }, [isDark]);

  return (
    <div className={`${isDark ? "dark-mode" : ""}`}>
      <Navbar isDark={isDark} setIsDark={setIsDark} setSideBar={setSideBar}/>
      <Routes>
        <Route path='/' element={<Home isDark={isDark} setIsDark={setIsDark} sideBar={sideBar}/>}/>
        <Route path='/video/:categoryId/:videoId' element={<Video isDark={isDark} setIsDark={setIsDark}/>}/>
      </Routes>
    </div>
  )
}

export default App
