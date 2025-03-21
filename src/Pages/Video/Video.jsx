import React, { useState } from 'react'
import './Video.css'
import PlayVideo from '../../components/Play-Video/PlayVideo'
import Recommended from '../../components/Recommended/Recommended'
import { useParams } from 'react-router-dom'



const Video = ({isDark}) => {
  const {videoId, categoryId} = useParams();
  console.log(videoId)
  return (
    <div className='play-container'>
      <PlayVideo isDark={isDark}  videoId={videoId} categoryId={categoryId} />
      <Recommended isDark={isDark} categoryId={categoryId}/>
    </div>
  )
}

export default Video
