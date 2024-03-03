        // YoutubePlayer.js
        import React from 'react';
        import ReactPlayer from 'react-player';

        const YoutubePlayer = ({ videoUrl }) => {
        return (
            <ReactPlayer
            url={videoUrl}
            width="640px"
            height="390px"
            controls={true}
            playing={true}
            muted={true}
            config={{
                youtube: {
                playerVars: { autoplay: 1, modestbranding: 1, controls: 0 }
                }
            }}
            />
        );
        };

        export default YoutubePlayer;
