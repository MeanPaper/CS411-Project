import { useState, useEffect} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import NavigationBar from './Components/NavigationBar'
import CourseReview from './Components/CourseReview'
import CreateList from './Components/CreateList'
import UserInterface from './Components/UserInterface'
import HomePage from './Components/HomePage'
import './App.css'

// const url = "http://127.0.0.1:5000"

function setToken(useToken){  // creating session token
  sessionStorage.setItem('token', JSON.stringify(useToken));
}

function getToken(){
  const tokenStr = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenStr);
  return userToken?.token;
}


function App() {
  // const [loadForm, setloadForm] = useState(0);  // determine what component to be display, eg. home, user, etc
  const [current_form, set_current_form] = useState('');  // used by user option on the NavigationBar
  const [genEdType, setGenEdType] = useState(''); // use by creat my list
  const nothing = [['none',0]];
  const [genEdCount, setGenEdCount] = useState(nothing);  // getting gened data
  const [logInStatus, setLogInStatus] = useState(()=>{
    const token = getToken();
    if(!token) return false;
    return true;
  });  // checking login session


  // function openForm(state){ // use to switch between components
  //   setloadForm(state);  // setting the state of the website
  // }
  
  function set_request_form(state_string){    // setting the form that user setting is using, this is kinda bad
    set_current_form(state_string);
  }
  
  return (
    <div className="App">
      <div className='content'>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<NavigationBar         
                // openForm = {openForm}
                logInStatus={logInStatus}
                setLogInStatus={setLogInStatus}
                setToken={setToken}/>} >
              <Route index element={<HomePage />} />
              <Route path='search' element={<CourseReview logInStatus={logInStatus}/>} /> 
              <Route path='create_list' element={
                <CreateList 
                  genEdCount={genEdCount} 
                  setGenEdCount={setGenEdCount}
                  genEdType={genEdType}
                  setGenEdType={setGenEdType}/>}></Route>
              <Route path='settings' element={<UserInterface 
                  set_request_form={set_request_form}
                  current_form={current_form}/>}/>
              <Route path='login'></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App
