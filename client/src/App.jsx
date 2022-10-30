import { useState, useEffect} from 'react'
import reactLogo from './assets/react.svg'
import './Components/NavigationBar'
import './App.css'
import NavigationBar from './Components/NavigationBar'

// import '../../.env';


function App() {
  // const [count, setCount] = useState(0)
  // const [message, setMessage] = useState("");

  // useEffect(()=>{
  //   fetch("http://localhost:3000")
  //   .then((res) => res.json())
  //   .then((data)=> setMessage(data.message));
  // },[]);
  
  // console.log(process.env.USER);


  return (
    <div className="App">
      <NavigationBar/>
      <div className='content'>
        Hello 
      </div>
    </div>
  )
}

export default App
