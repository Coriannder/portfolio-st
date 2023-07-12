import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
//import { PointerFollower } from './components/PointerFollower/PointerFollower.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <PointerFollower/> */}
    <App />
  </React.StrictMode>,
)
