import MyCard from '../Components/MyCard.jsx';
import Navbar from '../Components/Navbar.jsx';
import { User } from '../User.jsx';
import { React, axios, useContext, useEffect, useNavigate, useState } from '../imports.js'
import { checkAuthentication } from '../utils.js';
import '../Styles/MyList.css';

export const MyList = () => {

  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(User);
  const { userInfo } = state;

  // const [myList, setMyList] = useState([]);

  useEffect(() => {
    if (!userInfo) navigate("/signin");
    else {
      const checkAuth = async () => {
        let isAuth = await checkAuthentication(userInfo);
        if (!isAuth) navigate("/signin");
      }
      checkAuth();
    }
  });


  //   const getData = async () => {
  //     console.log(userInfo.myList)
  //     try {
  //       const { data } = await axios.get(`/api/v1/users/user-my-list`, {
  //         params: { email: userInfo.email }, // Use 'params' for query parameters
  //         headers: {
  //           'Authorization': `Bearer ${userInfo.token}`,
  //           'Content-Type': 'application/json',
  //         },
  //       });
  //       setMyList(data);
  //     } catch (error) {
  //       console.error('Error fetching myList data from user:', error);
  //     }
  //   };
  //   getData();
  // }, [userInfo]);

  const handleMyListRemoveItem = () => {
    console.log("need to remove here")
  };

  return (  
    <div>
      <Navbar></Navbar>
      <h1 className='title'>My List: </h1>
      <div className='flex-container'>
        {userInfo && userInfo.myList.length > 0 &&
          userInfo.myList.map((data, index) => (
            <MyCard className='item' key={index} data={data} onMyListRemoveItem={handleMyListRemoveItem}></MyCard>
          ))
        }
      </div>

    </div>
  )
}