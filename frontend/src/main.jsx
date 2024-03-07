import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import axios from 'axios'
import {UserProvider} from './User.jsx'

axios.defaults.baseURL = import.meta.env.DEV ? 'http://localhost:8080' : 'https://catflix-server.vercel.app/';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
)
