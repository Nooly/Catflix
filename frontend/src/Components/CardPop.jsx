import { React, useEffect, useState } from '../imports.js'
import YouTube from 'react-youtube';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../Styles/CardPop.css';

let videoElement = null;

const CardPop = (props) => {
    const [isMute, setIsMute] = useState(true);
    const vidID = extractYouTubeVideoId(props.data.trailer);
    function extractYouTubeVideoId(url) {
        return url.includes("youtu.be/")
            ? url.slice(url.lastIndexOf("/") + 1)
            : url.slice(url.indexOf("v=") + 2).split("&")[0];
    }

    const toggleMute = () => {
        setIsMute(!isMute);
    }

    const playMovie = () => {

    }

    const addMyList = () => {

    }

    const opts = {
        height: "195",
        width: "320",
        playerVars: {
            autoplay: 1,
            controls: 0,
            disablekb: 1,
            loop: 1,
            modestbranding: 1,
            playsinline: 1,
            color: 'white',
            mute: 1,
            playlist: vidID,
        },
    };



    useEffect(() => {        
        if (videoElement) {
            if (isMute) {
                videoElement.target.mute();
            }
            else {
                videoElement.target.unMute();
            }
        }
    }, [videoElement, isMute]);

    const _onReady = (event) => {
        videoElement = event;
    };

    return (
        <div className='pop-container'>
            <div>
                <div className='video-container'>
                    <YouTube videoId={vidID} opts={opts} onReady={_onReady} />
                    {isMute ?
                        <button className='custom-mute-button bi-volume-mute-fill' onClick={toggleMute}></button>
                        :
                        <button className='custom-mute-button bi-volume-up-fill' onClick={toggleMute}></button>
                    }

                </div>
                <button className='custom-play-button bi-play-fill' onClick={playMovie}></button>
                <button className='custom-add-button bi-dash-lg' onClick={addMyList}></button>
                <div className='information-div'>
                    <span>{props.data.genre} </span><span>{props.data.duation}</span>
                    {/* <div>{props.data.description}</div> */}
                </div>
            </div>
        </div>
    )
}

export default CardPop;