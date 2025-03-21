import React, {  useEffect, useState } from 'react'
import './PlayVideo.css'
import video1 from '../../assets/video.mp4';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
import jack from '../../assets/jack.png';
import userProfile from '../../assets/user_profile.jpg';
import {API_KEY, value_converter} from '../../data'
import moment from 'moment';
import { useParams } from 'react-router-dom';

const PlayVideo = ({isDark}) => {
    const {videoId} = useParams()
    const [apiData, setApiData] = useState(null);
    const [channelData, setChannelData] = useState(null);
    const [commentData, steCommentData] = useState([])

    const [widthIncrease, setWidthIncrease] = useState(false);
    const [CwidthIncrease, setCWidthIncrease] = useState(false);

    const fetchVideoData = async () => {
        const videoDetails_url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${API_KEY}`;
        await fetch(videoDetails_url)
            .then(response => response.json())
            .then(data => setApiData(data.items[0]));
    };

    const fetchChannelData = async () => {
        if (!apiData?.snippet?.channelId) return; 
        const channelData_url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
        await fetch(channelData_url)
            .then(response => response.json())
            .then(data => setChannelData(data.items[0]));

        const comment_url = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=100&videoId=${videoId}&key=${API_KEY}`;
        await fetch(comment_url).then(response => response.json()).then(data => steCommentData(data.items))
    };

    useEffect(() => {
        fetchVideoData();
    }, [videoId]);

    useEffect(() => {
        if (apiData) fetchChannelData();  
    }, [apiData]);


  return (
    <div className={`play-video ${isDark? "dark-mode" : ""}`}>
        {/* <video src={video1} controls autoPlay muted></video> */}
        <iframe  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen ></iframe>

        <h3>{apiData ? apiData.snippet.title : "Title Here"}</h3>

        <div className="play-video-info">
            <p>{value_converter(apiData?.statistics?.viewCount || 0)} views &bull;  {apiData?moment(apiData?.snippet?.publishedAt).fromNow() : ""}</p>
            <div>
                <div className='like-dislike'>
                    <span><img src={like} alt="" />{value_converter(apiData?.statistics?.likeCount || 0)}</span>
                    <span><img src={dislike} alt="" /></span>
                </div>
                <span className='share-save share-save1'><img src={share} alt="" />share</span>
                <span className='share-save'><img src={save} alt="" />save</span>
            </div>
        </div>
        <hr />
        <div className="publisher">
        <img src={channelData?.snippet?.thumbnails?.default?.url} alt="Channel Logo" />
            <div>
                <p>{apiData?.snippet.channelTitle}</p>
                <span>{value_converter(channelData?.statistics?.subscriberCount || 0)} Subscribers</span>
            </div>
            <button>Subscribe</button>
        </div>
        <div className="vid-description">
            <div className='description-div'>
                <p className={widthIncrease ? "expanded" : ""}>{apiData ? apiData.snippet.description : "Title Here"}</p>
                <button onClick={() =>setWidthIncrease(prev => !prev)}>{widthIncrease?"show less" : "show more"}</button>
            </div>
            <hr />
            <h4>{value_converter(apiData?.statistics?.commentCount || 0)} Comments</h4>
            <div className="cmt-btn">
                    <button className='cmt-btn-control' onClick={() => {setCWidthIncrease(prev => !prev)}}>{CwidthIncrease?"Show less" : "show more"}</button>
            </div>
            <div className={`comment-section ${CwidthIncrease ? "comment-section-more" : ""}`}>
                {commentData.map((item, index) => (
                    <div  className="comment" key={index}>
                        <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="User Profile" />
                        <div>
                            <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>{moment(item.snippet.topLevelComment.snippet.publishedAt).fromNow()}</span></h3>
                            <p>{item?item.snippet.topLevelComment.snippet.textDisplay :""}</p>
                            <div className="comment-action">
                                <img src={like} alt="Like" />
                                <span>{value_converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                                <img src={dislike} alt="Dislike" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            
        </div>
    </div>
  )
}

export default PlayVideo
