import Billboard from '../Components/Billboard.jsx';
import DataCarousel from '../Components/DataCarousel.jsx';
import Navbar from '../Components/Navbar.jsx';
import { User } from '../User.jsx';
import { React, axios, useContext, useEffect, useNavigate, useState } from '../imports.js'
import { checkAuthentication } from '../utils.js';


const HomePage = () => {

  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(User);
  const { userInfo } = state;

  const [serieses, setContents] = useState([]);
  const [billBoardContent, setbillBoardContent] = useState(null);

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
          const { data } = await axios.get(`/api/v1/contents`, {
            headers: { 'Authorization': `Bearer ${userInfo.token}` },
          });
          setContents(data.homePage[1].contents);
          setbillBoardContent(data.homePage[0].billboard);
        } catch (error) {
          console.error('Error fetching serieses data:', error);
        }
      };
      getData();
    }

  }, []);
  useEffect(() => {

  }, [])


  return (
    <div>
      <Navbar></Navbar>
      <Billboard data={billBoardContent}></Billboard>
      {serieses.map((contentData, index) => (
        <DataCarousel key={index} data={contentData}></DataCarousel>
      ))}
    </div>
  )
}

export default HomePage;