import Billboard from '../Components/Billboard.jsx';
import DataCarousel from '../Components/DataCarousel.jsx';
import Navbar from '../Components/Navbar.jsx';
import { User } from '../User.jsx';
import { React, axios, useContext, useEffect, useNavigate, useState } from '../imports.js'
import { checkAuthentication } from '../utils.js';

export const Movies = () => {

    const navigate = useNavigate();

    const { state, dispatch: ctxDispatch } = useContext(User);
    const { userInfo } = state;

    const [movies, setMovies] = useState([]);
    const [billBoardMovie, setBillBoardMovie] = useState(null);

    useEffect(() => {

        if (!userInfo) navigate("/signin");
        else {
            const checkAuth = async () => {
                let isAuth = await checkAuthentication(userInfo);
                if (!isAuth) navigate("/signin");
            }
            checkAuth();

        }
        if (userInfo) {

            const getData = async () => {
                try {
                    const { data } = await axios.get(`/api/v1/movies`, {
                        headers: { 'Authorization': `Bearer ${userInfo.token}` },
                    });
                    setMovies(data.moviesPage[1].movies);
                    setBillBoardMovie(data.moviesPage[0].billboard);
                    // console.log(data)
                } catch (error) {
                    console.error('Error fetching movies data:', error);
                }
            };
            getData();
        }
    }, []);


    return (

        <div>
            <Navbar></Navbar>
            <Billboard data={billBoardMovie}></Billboard>
            {movies.map((movieData, index) => (
                <DataCarousel key={index} data={movieData}></DataCarousel>
            ))}

        </div>
    )
}
