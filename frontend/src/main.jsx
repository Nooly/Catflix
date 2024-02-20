import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import axios from 'axios'
import {UserProvider} from './User.jsx'

axios.defaults.baseURL = 'http://localhost:8080'; // Change this to server once we have one in production or import from .env

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
)
