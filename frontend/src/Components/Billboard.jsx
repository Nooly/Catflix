import { React, useEffect, useRef, useState } from '../imports.js'
import { extractYouTubeVideoId } from '../utils.js';
import YouTube from 'react-youtube';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../Styles/Billboard.css';

let videoElement = null;

const Billboard = (props) => {

  const vidID = useRef(null);

  const [item, setItem] = useState();

  useEffect(() => {
    console.log(item)
    if (props.data) {
      if (!item)
        setItem(props.data)
    }
    if (item) {
      vidID.current = extractYouTubeVideoId(item.trailer);

    }
  }, [props, item])

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
      playlist: vidID.current,
    },
  };

  const _onReady = (event) => {
    videoElement = event;
  };

  return (
    <div className='billboard-container'>
      <div className='billboard-video-container'>
        <YouTube videoId={vidID.current} opts={opts} onReady={_onReady} className='billboard-video' />
      </div>
      <div className='billboard-information'>
        {item &&
          <img className='billboard-image' src={item.imgTitle} alt='image suppose to go here'></img>
        }
        {item &&
          <div className='billboard-description'>{item.description}</div>
        }
        <button className='billboard-play-button bi-play-fill'> Play</button>
        <button className='billboard-info-button bi-exclamation-circle'> More Info</button>
      </div>

    </div>
  )
}

export default Billboard;