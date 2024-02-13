import './App.css';
import { BrowserRouter, Container, Route, Routes } from './imports.js'
import HomePage from './Pages/HomePage.jsx';
import SignIn from './Pages/SignIn.jsx';
import SignUp from './Pages/SignUp.jsx';


function App() {
  return (
    <BrowserRouter>
      <div>
        <Container>
          <Routes>
            <Route>
              <Route path="/" element={<HomePage />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
            </Route>
          </Routes>
        </Container>
      </div>
    </BrowserRouter>
  )
}

export default App
