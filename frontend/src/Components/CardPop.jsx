import { React, axios, useContext, useEffect, useState } from '../imports.js'
import YouTube from 'react-youtube';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../Styles/CardPop.css';
import { extractYouTubeVideoId } from '../utils.js';
import { User } from '../User.jsx';

let videoElement = null;

const CardPop = (props) => {
    const [isMute, setIsMute] = useState(true);
    const vidID = extractYouTubeVideoId(props.data.trailer);

    const { state, dispatch: ctxDispatch } = useContext(User);
    const { userInfo } = state;

    const toggleMute = () => {
        setIsMute(!isMute);
    }

    const playMovie = () => {

    }

    const addMyList = async () => {
        try {
            const response = await axios.post(`/api/v1/users/user-my-list-add`, {
                movie: props.data, // Spread the props to include all properties
            }, {
                headers: {
                    'Authorization': `Bearer ${userInfo.token}`, // Adjust this based on your authentication logic
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                console.log('Movie added to myList successfully');
                // You can update the UI or provide feedback to the user here
            } else {
                console.error('Failed to add movie to myList');
                // Handle the error and provide feedback to the user
            }
        } catch (error) {
            console.error('Error adding movie to myList:', error);
            // Handle the error and provide feedback to the user
        }
    };

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
            // if (isMute) {
            //     videoElement.target.mute();
            // }
            // else {
            //     videoElement.target.unMute();
            // }
        }
    }, [videoElement, isMute]);

    const _onReady = (event) => {
        videoElement = event;
    };

    return (
        <div className='pop-container popout'>
            <div className='pop-content'>
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
                    <span>{props.data.genre} </span>
                    {/* <span>{props.data.duation}</span> */}
                    {/* <div>{props.data.description}</div> */}
                </div>
            </div>
        </div>
    )
}

export default CardPop;