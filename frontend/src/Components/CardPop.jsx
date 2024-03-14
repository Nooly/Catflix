import { React, axios, useContext, useEffect, useNavigate, useState } from '../imports.js'
import YouTube from 'react-youtube';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../Styles/CardPop.css';
import { extractYouTubeVideoId } from '../utils.js';
import { User } from '../User.jsx';
import { USER_ADD_MY_LIST, USER_REMOVE_MY_LIST } from '../actions.jsx';


const CardPop = (props) => {
    const [isMute, setIsMute] = useState(true);
    const vidID = extractYouTubeVideoId(props.data.trailer);

    const [videoElement, setVideoElement] = useState(null);

    const { state, dispatch: ctxDispatch } = useContext(User);
    const { userInfo } = state;

    const [isMovie, setIsMovie] = useState();

    const [isInMyList, setIsInMyList] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setIsInMyList(checkInMyList(props.data));
        props.data.movie ? setIsMovie(true) : setIsMovie(false);
    }, [userInfo, isInMyList, isMovie])

    useEffect(() => {
    }, [isMovie])

    const checkInMyList = (content) => { return userInfo.myList.some((c) => c._id === content._id); };

    const toggleMute = () => {
        setIsMute(!isMute);
    }

    const playContent = () => {
        localStorage.setItem('lastContent', JSON.stringify(props.data));
        navigate("/watch");
    }

    const addMyList = async () => {
        try {
            const content = props.data;
            const response = await axios.post(`/api/v1/users/user-my-list-add`, {
                email: userInfo.email,
                content: content, // Spread the props to include all properties
            }, {
                headers: {
                    'Authorization': `Bearer ${userInfo.token}`, // Adjust this based on your authentication logic
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                console.log('Content added to myList successfully');
                // You can update the UI or provide feedback to the user here
                ctxDispatch({ type: USER_ADD_MY_LIST, payload: content });
                setIsInMyList(true);
            } else {
                console.error('Failed to add content to myList');
                // Handle the error and provide feedback to the user
            }
        } catch (error) {
            console.error('Error adding content to myList:', error);
            // Handle the error and provide feedback to the user
        }
    };

    const removeMyList = async () => {
        // console.log(props.data)
        try {
            const content = props.data;
            // console.log(content._id)

            const response = await axios.post(`/api/v1/users/user-my-list-remove`, {
                email: userInfo.email,
                content: content,
            }, {
                headers: {
                    'Authorization': `Bearer ${userInfo.token}`, // Adjust this based on your authentication logic
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                console.log('Content removed from myList successfully');
                // You can update the UI or provide feedback to the user here
                ctxDispatch({ type: USER_REMOVE_MY_LIST, payload: content._id });
                setIsInMyList(false);
                if (props.onMyListRemoveItem) {
                    props.onMyListRemoveItem();
                }
            } else {
                console.error('Failed to remove content to myList');
                // Handle the error and provide feedback to the user
            }
        } catch (error) {
            console.error('Error removing content to myList:', error);
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

            if (isMute) {
                if (videoElement.target) {
                    if (videoElement.target.h) {
                        videoElement.target.mute();

                    }
                }

            }
            else {
                if (videoElement.target) {
                    if (videoElement.target.h) {
                        videoElement.target.unMute();

                    }

                }
            }
        }
    }, [videoElement, isMute]);

    const _onReady = (event) => {
        setVideoElement(event);
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
                <button className='custom-play-button bi-play-fill' onClick={playContent}></button>
                {isInMyList ?
                    <button className='custom-remove-button bi-dash-lg' onClick={removeMyList}></button>
                    :
                    <button className='custom-add-button bi-plus-lg' onClick={addMyList}></button>

                }
                <div className='information-div'>
                    {isMovie ?
                        <span>This is a movie </span>
                        :
                        <span>This is a series (not a movie) </span>
                    }
                    <span>{props.data.genre} </span>
                </div>
            </div>
        </div>
    )
}

export default CardPop;