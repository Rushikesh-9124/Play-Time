import React, { useState } from 'react'
import './Home.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import Feed from '../../components/Feed/Feed'

const Home = ({sideBar,  isDark, setIsDark}) => {
  
  const [category, setCategory] = useState(0);
  return (
    <div className={`${isDark ? "dark-mode" : ""}`}>
      <Sidebar isDark={isDark} setIsDark={setIsDark}  sideBar={sideBar} category={category} setCategory={setCategory}/>
      <div className={`container ${sideBar ? "" : "larger-container"}`}>
        <Feed isDark={isDark} setIsDark={setIsDark} category={category} />
      </div>
    </div>
  )
}

export default Home
