import YouTube from 'react-youtube';
import Navbar from '../Components/Navbar.jsx';
import { User } from '../User.jsx';
import { React, useContext, useEffect, useNavigate } from '../imports.js'
import { checkAuthentication, extractYouTubeVideoId } from '../utils.js';


let videoElement = null;


export const Watch = (props) => {

    const vidID = extractYouTubeVideoId(props.data.trailer);

    const navigate = useNavigate();

    const { state, dispatch: ctxDispatch } = useContext(User);
    const { userInfo } = state;

    useEffect(() => {
        if (!userInfo) navigate("/signin");
        else {
            const checkAuth = async () => {
                let isAuth = await checkAuthentication(userInfo);
                if (!isAuth) navigate("/signin");
            }
            checkAuth();
        }
    }, []);

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

    const _onReady = (event) => {
        videoElement = event;
    };

    const previousPage = () =>{

    };

    return (
        <div>
            <Navbar></Navbar>
            <div className='video-container'>
                <YouTube videoId={vidID} opts={opts} onReady={_onReady} />
            </div>
            <button onClick={previousPage} className=''>Back</button>
        </div>
    )
}
