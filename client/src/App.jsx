import { useState, useEffect} from 'react'
import axios from "axios"
// import reactLogo from './assets/react.svg'

import NavigationBar from './Components/NavigationBar'
import UpdateForm from './Components/UpdateForm'
import SearchBar from './Components/SearchBar'
import SubNavBar from './Components/SubNavBar'
import './App.css'

const url = "http://127.0.0.1:5000"

function App() {
  // const [count, setCount] = useState(0)
  const [message, setMessage] = useState(null);

  useEffect(()=>{
    fetch(`http://127.0.0.1:5000/prof`)
    .then((response) => response.json())
    .then((data)=>{setMessage(data)});
  },[]);
  

  // console.log(process.env.USER);
  const [loadForm, setloadForm] = useState(0);  // determine what component to be display
  const [current_form, set_current_form] = useState('');

  function openForm(state){
    setloadForm(state);  // setting the state of the website
  }
  
  function set_request_form(state_string){
    set_current_form(state_string);
  }

  function conditionalLoading(){  // base on loadForm state to determine what components 
                                  // need to be loaded
    switch(loadForm){
      case 1:         // use by update course lists or database, may use a separate html page for
                      // this instead of loading everything in one single page
        return (
          <div className='update-table-component'>
            <SubNavBar
              set_request_form={set_request_form}
            />   
            <UpdateForm
              current_form={current_form}
            />
          </div>)
      case 2:         // use by search bar
        return <SearchBar
                loadForm={loadForm}
                setloadForm={setloadForm}
                />
      default: break;
    }
  }
  return (
    <div className="App">
      <NavigationBar          // this is a permanent flow bar in all pages
        openForm = {openForm}
      />
      <div className='content'>
        {conditionalLoading()}  
        <h1 style={{lineHeight: 1.5}}>Hello</h1>

      </div>
    </div>
  )
}

export default App
