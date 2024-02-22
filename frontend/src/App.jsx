import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"; // this to make the toast look good
import './App.css';
import { BrowserRouter, Container, Route, Routes } from './imports.js'
import HomePage from './Pages/HomePage.jsx';
import SignIn from './Pages/SignIn.jsx';
import SignUp from './Pages/SignUp.jsx';
import { Movies } from './Pages/Movies.jsx';
import { Series } from './Pages/Series.jsx';
import { MyList } from './Pages/MyList.jsx';


function App() {
  return (
    <BrowserRouter>
      <ToastContainer position='bottom-center' limit={1} />

      <Container>
        <Routes>
          <Route>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path='/movies' element={<Movies></Movies>}></Route>
            <Route path='/series' element={<Series></Series>}></Route>
            <Route path='/mylist' element={<MyList></MyList>}></Route>

          </Route>
        </Routes>
      </Container>

    </BrowserRouter>
  )
}

export default App
