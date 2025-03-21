import React, { useEffect, useState } from 'react'
import './Recommended.css'
import {API_KEY, value_converter} from '../../data'
import { Link } from 'react-router-dom';

const Recommended = ({categoryId, isDark}) => {

    const [apiData, setApiData] = useState([]);

    const fetchData = async() => {
        const relatedVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&chart=mostPopular&maxResults=45&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;

        await fetch(relatedVideo_url).then(response => response.json()).then(data => setApiData(data.items));
    }

    useEffect(()=>{
        fetchData();
    },[])

  return (
    <div className={`recommended ${isDark ? "dark-mode" : ""}`}>
        {apiData?.map((item, index) => (
            <Link to={`/video/${item.snippet.categoryId}/${item.id}`} className="side-video-list" key={item.id}>
                <img src={item.snippet.thumbnails.standard.url} alt={item.snippet.title} />
                <div className="vid-info">
                    <h5>{item.snippet.title}</h5>
                    <p>{item.snippet.channelTitle}</p>
                    <p>{value_converter(item.statistics.viewCount)} views</p>
                </div>
            </Link>
        ))}
    </div>
  )
}

export default Recommended
