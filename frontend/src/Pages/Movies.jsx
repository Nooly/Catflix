import Card from '../Components/Card1.jsx';
import CardPop from '../Components/CardPop.jsx';
import DataCarousel from '../Components/DataCarousel.jsx';
import Navbar from '../Components/Navbar.jsx';
import { User } from '../User.jsx';
import { React, axios, useContext, useEffect, useNavigate } from '../imports.js'
import { checkAuthentication } from '../utils.js';

export const Movies = () => {

    const navigate = useNavigate();

    const { state, dispatch: ctxDispatch } = useContext(User);
    const { userInfo } = state;

    const movie = null;
    // useEffect(() => {

    //     if (!userInfo) navigate("/signin");
    //     else {
    //         const checkAuth = async () => {
    //             let isAuth = await checkAuthentication(userInfo);
    //             if (!isAuth) navigate("/signin");
    //         }
    //         checkAuth();

    //     }
    // }, []);

    const moviesData = [
        {
            imageThumbnail: 'path/to/thumbnail1.jpg',
            icon1: 'path/to/icon1.png',
            icon2: 'path/to/icon2.png',
            icon3: 'path/to/icon3.png',
            movieDescription: 'Description of Movie 1',
            movieDuration: '2h 30min',
            movieGenre: 'Action',
        },
        // Add more movie objects as needed
    ];

    return (

        <div>
            <Navbar></Navbar>
            {/* <div>
                {moviesData.map((movie, index) => (
                    <Card key={index} movie={movie} />
                ))}
            </div> */}
            {/* <CardPop></CardPop> */}
            <DataCarousel></DataCarousel>
        </div>
    )
}
