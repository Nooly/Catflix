import Navbar from '../Components/Navbar.jsx';
import { User } from '../User.jsx';
import { React, useContext, useEffect, useNavigate } from '../imports.js'
import { checkAuthentication } from '../utils.js';


const HomePage = () => {

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
      <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, sint consectetur quas aut recusandae corporis quidem ut explicabo delectus porro cumque minima. Cum incidunt sit ducimus ipsam inventore repellat rem labore a quam voluptatibus beatae, nemo, recusandae illo est laborum ipsa atque aliquam tenetur sint omnis quibusdam consequatur dolore dolor?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, sint consectetur quas aut recusandae corporis quidem ut explicabo delectus porro cumque minima. Cum incidunt sit ducimus ipsam inventore repellat rem labore a quam voluptatibus beatae, nemo, recusandae illo est laborum ipsa atque aliquam tenetur sint omnis quibusdam consequatur dolore dolor?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, sint consectetur quas aut recusandae corporis quidem ut explicabo delectus porro cumque minima. Cum incidunt sit ducimus ipsam inventore repellat rem labore a quam voluptatibus beatae, nemo, recusandae illo est laborum ipsa atque aliquam tenetur sint omnis quibusdam consequatur dolore dolor?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, sint consectetur quas aut recusandae corporis quidem ut explicabo delectus porro cumque minima. Cum incidunt sit ducimus ipsam inventore repellat rem labore a quam voluptatibus beatae, nemo, recusandae illo est laborum ipsa atque aliquam tenetur sint omnis quibusdam consequatur dolore dolor?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, sint consectetur quas aut recusandae corporis quidem ut explicabo delectus porro cumque minima. Cum incidunt sit ducimus ipsam inventore repellat rem labore a quam voluptatibus beatae, nemo, recusandae illo est laborum ipsa atque aliquam tenetur sint omnis quibusdam consequatur dolore dolor?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, sint consectetur quas aut recusandae corporis quidem ut explicabo delectus porro cumque minima. Cum incidunt sit ducimus ipsam inventore repellat rem labore a quam voluptatibus beatae, nemo, recusandae illo est laborum ipsa atque aliquam tenetur sint omnis quibusdam consequatur dolore dolor?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, sint consectetur quas aut recusandae corporis quidem ut explicabo delectus porro cumque minima. Cum incidunt sit ducimus ipsam inventore repellat rem labore a quam voluptatibus beatae, nemo, recusandae illo est laborum ipsa atque aliquam tenetur sint omnis quibusdam consequatur dolore dolor?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, sint consectetur quas aut recusandae corporis quidem ut explicabo delectus porro cumque minima. Cum incidunt sit ducimus ipsam inventore repellat rem labore a quam voluptatibus beatae, nemo, recusandae illo est laborum ipsa atque aliquam tenetur sint omnis quibusdam consequatur dolore dolor?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, sint consectetur quas aut recusandae corporis quidem ut explicabo delectus porro cumque minima. Cum incidunt sit ducimus ipsam inventore repellat rem labore a quam voluptatibus beatae, nemo, recusandae illo est laborum ipsa atque aliquam tenetur sint omnis quibusdam consequatur dolore dolor?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, sint consectetur quas aut recusandae corporis quidem ut explicabo delectus porro cumque minima. Cum incidunt sit ducimus ipsam inventore repellat rem labore a quam voluptatibus beatae, nemo, recusandae illo est laborum ipsa atque aliquam tenetur sint omnis quibusdam consequatur dolore dolor?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, sint consectetur quas aut recusandae corporis quidem ut explicabo delectus porro cumque minima. Cum incidunt sit ducimus ipsam inventore repellat rem labore a quam voluptatibus beatae, nemo, recusandae illo est laborum ipsa atque aliquam tenetur sint omnis quibusdam consequatur dolore dolor?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, sint consectetur quas aut recusandae corporis quidem ut explicabo delectus porro cumque minima. Cum incidunt sit ducimus ipsam inventore repellat rem labore a quam voluptatibus beatae, nemo, recusandae illo est laborum ipsa atque aliquam tenetur sint omnis quibusdam consequatur dolore dolor?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, sint consectetur quas aut recusandae corporis quidem ut explicabo delectus porro cumque minima. Cum incidunt sit ducimus ipsam inventore repellat rem labore a quam voluptatibus beatae, nemo, recusandae illo est laborum ipsa atque aliquam tenetur sint omnis quibusdam consequatur dolore dolor?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, sint consectetur quas aut recusandae corporis quidem ut explicabo delectus porro cumque minima. Cum incidunt sit ducimus ipsam inventore repellat rem labore a quam voluptatibus beatae, nemo, recusandae illo est laborum ipsa atque aliquam tenetur sint omnis quibusdam consequatur dolore dolor?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, sint consectetur quas aut recusandae corporis quidem ut explicabo delectus porro cumque minima. Cum incidunt sit ducimus ipsam inventore repellat rem labore a quam voluptatibus beatae, nemo, recusandae illo est laborum ipsa atque aliquam tenetur sint omnis quibusdam consequatur dolore dolor?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, sint consectetur quas aut recusandae corporis quidem ut explicabo delectus porro cumque minima. Cum incidunt sit ducimus ipsam inventore repellat rem labore a quam voluptatibus beatae, nemo, recusandae illo est laborum ipsa atque aliquam tenetur sint omnis quibusdam consequatur dolore dolor?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, sint consectetur quas aut recusandae corporis quidem ut explicabo delectus porro cumque minima. Cum incidunt sit ducimus ipsam inventore repellat rem labore a quam voluptatibus beatae, nemo, recusandae illo est laborum ipsa atque aliquam tenetur sint omnis quibusdam consequatur dolore dolor?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, sint consectetur quas aut recusandae corporis quidem ut explicabo delectus porro cumque minima. Cum incidunt sit ducimus ipsam inventore repellat rem labore a quam voluptatibus beatae, nemo, recusandae illo est laborum ipsa atque aliquam tenetur sint omnis quibusdam consequatur dolore dolor?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, sint consectetur quas aut recusandae corporis quidem ut explicabo delectus porro cumque minima. Cum incidunt sit ducimus ipsam inventore repellat rem labore a quam voluptatibus beatae, nemo, recusandae illo est laborum ipsa atque aliquam tenetur sint omnis quibusdam consequatur dolore dolor?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, sint consectetur quas aut recusandae corporis quidem ut explicabo delectus porro cumque minima. Cum incidunt sit ducimus ipsam inventore repellat rem labore a quam voluptatibus beatae, nemo, recusandae illo est laborum ipsa atque aliquam tenetur sint omnis quibusdam consequatur dolore dolor?
        
      </div>
    </div>
  )
}

export default HomePage;