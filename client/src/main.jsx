import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './css/index.css'

// protected mode for testing purpose
// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// )

ReactDOM.createRoot(document.getElementById('root')).render(<App />)