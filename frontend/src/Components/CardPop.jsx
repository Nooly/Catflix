import { React, useEffect, useState } from '../imports.js'
import YouTube from 'react-youtube';
import '../Styles/CardPop.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

let videoElement = null;

const CardPop = () => {
    const [isMute, setIsMute] = useState(true);

    const toggleMute = () => {
        setIsMute(!isMute);
    }

    const playMovie = () =>{

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
            playlist: 'IUN664s7N-c',
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
            <div className='video-container'>
                <YouTube videoId={"IUN664s7N-c"} opts={opts} onReady={_onReady} />
                {isMute ?
                    <button className='custom-mute-button bi-volume-mute-fill' onClick={toggleMute}></button>
                    :
                    <button className='custom-mute-button bi-volume-up-fill' onClick={toggleMute}></button>
                }

            </div>
            <button className='custom-play-button bi-play-fill' onClick={playMovie}></button>
            <button className='custom-add-button bi-dash-lg' onClick={addMyList}></button>
            <div className='information-div'>
                <span>Genre </span><span>Length</span>
                <div>Description</div>
            </div>
        </div>

    )
}

export default CardPop;