import Navbar from '../Components/Navbar.jsx';
import { User } from '../User.jsx';
import { React, useContext, useEffect, useNavigate } from '../imports.js'
import { checkAuthentication } from '../utils.js';

export const Movies = () => {

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


  return (
    
    <div>
        <Navbar></Navbar>
    </div>
  )
}
