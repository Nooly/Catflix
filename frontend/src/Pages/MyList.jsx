import MyCard from '../Components/MyCard.jsx';
import Navbar from '../Components/Navbar.jsx';
import { User } from '../User.jsx';
import { React, axios, useContext, useEffect, useNavigate, useState } from '../imports.js'
import { checkAuthentication } from '../utils.js';

export const MyList = () => {

  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(User);
  const { userInfo } = state;

  const [myList, setMyList] = useState([]);

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
      // console.log("reached getData")
      try {
        // console.log("in try")
        const { data } = await axios.get(`/api/v1/users/user-my-list`, {
          headers: { 'Authorization': `Bearer ${userInfo.token}` },
        });
        // console.log("after axios")
        // console.log(data)
        setMyList(data);
      } catch (error) {
        console.error('Error fetching myList data from user:', error);
      }
    };
    getData();
  }, [myList]);

  const handleMyListRemoveItem = () =>{
    console.log("need to remove here")
  };

  return (
    <div>
      <Navbar></Navbar>
      {myList.length > 0 &&
        myList.map((data, index) => (
          <MyCard key={index} data={data} onMyListRemoveItem={handleMyListRemoveItem}></MyCard>
        ))
      }
    </div>
  )
}