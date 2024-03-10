import Billboard from '../Components/Billboard.jsx';
import DataCarousel from '../Components/DataCarousel.jsx';
import Navbar from '../Components/Navbar.jsx';
import { User } from '../User.jsx';
import { React, axios, useContext, useEffect, useNavigate, useState } from '../imports.js'
import { checkAuthentication } from '../utils.js';

export const Series = () => {

    const navigate = useNavigate();

    const { state, dispatch: ctxDispatch } = useContext(User);
    const { userInfo } = state;
  
    
    const [serieses, setSerieses] = useState([]);
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

      const getData = async () => {
        try {
            const { data } = await axios.get(`/api/v1/serieses`, {
                headers: { 'Authorization': `Bearer ${userInfo.token}` },
            });
            setSerieses(data.seriesesPage[1].serieses);
            setBillBoardMovie(data.seriesesPage[0].billboard);
        } catch (error) {
            console.error('Error fetching serieses data:', error);
        }
    };
    getData();

    }, []);
    
  return (
    <div>
        <Navbar></Navbar>
        <Billboard data={billBoardMovie}></Billboard>
            {serieses.map((movieData, index) => (
                <DataCarousel key={index} data={movieData}></DataCarousel>
            ))}
    </div>
  )
}
