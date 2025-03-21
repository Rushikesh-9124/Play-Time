import React, { useState } from 'react'
import './Navbar.css'
import menu_icon from '../../assets/menu.png'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search.png'
import upload_icon from '../../assets/upload.png'
import more_icon from '../../assets/more.png'
import notification_icon from '../../assets/notification.png'
import profile_icon from '../../assets/jack.png'
import { Link } from 'react-router-dom'
import { IoSunnyOutline } from "react-icons/io5";
import { FaRegMoon } from "react-icons/fa";
import play from '../../assets/play.png'




const Navbar = ({setSideBar, isDark, setIsDark}) => {
  const [rotated, setRotated] = useState(false)

  console.log(rotated);
  return (
    <nav className={`flex-div ${isDark? "dark-mode" : ""}`}>
      <div className={`nav-left flex-div ${isDark? "dark-mode" : ""}`}>
        <img style={{ transition: "transform 1s cubic-bezier(0.25, 1, 0.5, 1)", cursor: "pointer" }} className={`menu_icon ${isDark? "dark-mode" : ""} ${rotated ? "rotated" : ""}`} src={menu_icon} alt="menu_icon"  onClick={() => {setSideBar(prev => prev === false?true:false), setRotated(prev => !prev) }}/>
        <Link to='/' className={`link-logo ${isDark? "dark-mode" : ""}`}><img className={`logo ${isDark? "dark-mode" : ""}`} src={play} alt="" /></Link>
      </div>

      <div className={`nav-middle flex-div ${isDark? "dark-mode" : ""}`}>
        <div className={`search-box flex-div ${isDark? "dark-mode" : ""}`}>
          <input type="text"  placeholder='Search'/>
          <img src={search_icon} alt="search_icon" />
        </div>
      </div>
      <div className={`nav-right flex-div ${isDark? "dark-mode" : ""}`}>
        <button  className={`flex-div ${isDark? "dark-mode" : ""}`} onClick={() => setIsDark(prev => !prev)}>{isDark? <FaRegMoon />: <IoSunnyOutline className='light-mode-btn' />}</button>
        <img src={upload_icon} alt="upload_icon" />
        <img src={more_icon} alt="more_icon" />
        <img src={notification_icon} alt="notification_icon" />
        <img src={profile_icon} className='user-icon' alt="profile_icon" />
      </div>
    </nav>
  )
}

export default Navbar
