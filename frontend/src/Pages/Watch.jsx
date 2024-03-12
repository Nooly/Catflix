import YouTube from 'react-youtube';
import Navbar from '../Components/Navbar.jsx';
import { User } from '../User.jsx';
import { React, useContext, useEffect, useNavigate, useState } from '../imports.js'
import { checkAuthentication, extractYouTubeVideoId } from '../utils.js';
import '../Styles/Watch.css';


let videoElement = null;


export const Watch = () => {


    const navigate = useNavigate();

    const { state, dispatch: ctxDispatch } = useContext(User);
    const { userInfo } = state;

    const [content, setContent] = useState(null);
    const [vidID, setVidID] = useState(null);

    useEffect(() => {
        if (!userInfo) navigate("/signin");
        else {
            const checkAuth = async () => {
                let isAuth = await checkAuthentication(userInfo);
                if (!isAuth) navigate("/signin");
            }
            checkAuth();
        }

        if (userInfo && !vidID) {
            const contentData = localStorage.getItem('lastContent');
            if (contentData) {
                setContent(JSON.parse(contentData));
            }
            else {
                navigate("/");
            }
        }
        if (content && !vidID) {
            if (content.movie)
                setVidID(extractYouTubeVideoId(content.movie))
            else if (content.episodes[0])
                setVidID(extractYouTubeVideoId(content.episodes[0]))
        }
    }, [content]);

    const opts = {
        width: '100%',
        height: '100%',
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

    const _onReady = (event) => {
        videoElement = event;
    };

    const previousPage = () => {
        // Check if there's a previous page in the history
        if (window.history.length > 1) {
            // Go back to the previous page
            navigate(-1);
        } else {
            // If there's no previous page, navigate to the home page or another appropriate route
            navigate("/");
        }
    };
    

    return (
        <div>
            <Navbar></Navbar>
            <div className='video-container'>
                {
                    vidID &&
                    <YouTube videoId={vidID} opts={opts} onReady={_onReady} className='watch-video' />
                }

            </div>
            <button onClick={previousPage} className=''>Back</button>
        </div>
    )
}
