import { React, useState, useEffect, axios, useContext, PropTypes } from '../imports.js';
// import '../Styles/Carousel.css';
import { User } from '../User.jsx';
import YoutubePlayer from './YoutubePlayer.jsx';

const Card = () => {
    const [movie, setMovie] = useState(null);
    const { state, dispatch: ctxDispatch } = useContext(User);
    const { userInfo } = state;
    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const { data } = await axios.get(`/api/v1/movies/token/The Dark Knight`, {
                    headers: { 'Authorization': `Bearer ${userInfo.token}`, },
                });
                setMovie(data);
            } catch (error) {
                console.error('Error fetching movie data:', error);
            }
        };

        fetchMovie();
    }, []);

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
        console.log("hover")
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        console.log(" nothover")
    };

    if (!movie) return null;

    return (
        <div
            className={`card-container ${isHovered ? 'hovered' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Display imageThumbnail or nothing based on hover state */}
            {isHovered ? null : <img src={movie.imgThumb} alt="Movie Thumbnail" />}

            {/* Display additional information on hover */}
            {isHovered && (
                <div className="hover-content">
                    <YoutubePlayer videoUrl={movie.trailer}></YoutubePlayer>
                    {/* <img src={movie.trailer} alt="Icon 1" /> */}

                    <img src={movie.icon1} alt="Icon 1" className="icon1" />
                    <div className="icon-container">
                        <img src={movie.icon2} alt="Icon 2" className="icon2" />
                        <img src={movie.icon3} alt="Icon 3" className="icon3" />
                    </div>
                    <div className="text-container">
                        <p>{"blabla"}</p>
                        <div className="details-container">
                            <span>{movie.duration}</span>
                            <span>{movie.genre}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

Card.propTypes = {
    movie: PropTypes.shape({
        imageThumbnail: PropTypes.string.isRequired,
        icon1: PropTypes.string.isRequired,
        icon2: PropTypes.string.isRequired,
        icon3: PropTypes.string.isRequired,
        movieDescription: PropTypes.string.isRequired,
        movieDuration: PropTypes.string.isRequired,
        movieGenre: PropTypes.string.isRequired,
    }).isRequired,
};

export default Card;
