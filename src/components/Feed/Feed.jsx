import React, { useEffect, useState } from 'react'
import './Feed.css'
import {API_KEY, value_converter} from '../../data'
import thumbnail1 from '../../assets/thumbnail1.png';
import thumbnail2 from '../../assets/thumbnail2.png';
import thumbnail3 from '../../assets/thumbnail3.png';
import thumbnail4 from '../../assets/thumbnail4.png';
import thumbnail5 from '../../assets/thumbnail5.png';
import thumbnail6 from '../../assets/thumbnail6.png';
import thumbnail7 from '../../assets/thumbnail7.png';
import thumbnail8 from '../../assets/thumbnail8.png';
import { Link } from 'react-router-dom';
import moment from 'moment';


const Feed = ({category, isDark}) => {

    const [data, setData] = useState([]);

    const fetchData = async() => {
        const VideoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=60&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;
        
        await fetch(VideoList_url).then(response => response.json()).then(data => setData(data.items));
    }
    
    useEffect(()=>{
        fetchData();
    },[category])

  return (
    <div className="feed">
        {data.map((Item, index) => {
            return (
                <Link to={`video/${Item.snippet.categoryId}/${Item.id}`} className='card'> 
                    <img src={Item.snippet.thumbnails.standard.url} alt="" />
                    <h2 className={`${isDark ? "dark-mode" : ""}`}>{Item.snippet.title}</h2>
                    <h3 className={`H3 ${isDark ? "dark-mode" : ""}`}>{Item.snippet.channelTitle}</h3>
                    <p className={`P ${isDark ? "dark-mode" : ""}`}>{value_converter(Item.statistics.viewCount)} views &bull;&nbsp;{moment(Item.snippet.publishedAt).fromNow()}</p>
                </Link>
            )
        })}
        

    </div>
  )
}

export default Feed
