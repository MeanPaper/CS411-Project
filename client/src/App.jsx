import { useState, useEffect} from 'react'
import axios from "axios"
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";

// import reactLogo from './assets/react.svg'

import NavigationBar from './Components/NavigationBar'
import UserSetting from './Components/UserSetting'
import SearchBar from './Components/SearchBar'
import SubNavBar from './Components/SubNavBar'
import './App.css'
import './Navbar.css'

// const url = "http://127.0.0.1:5000"

function App() {
  const [loadForm, setloadForm] = useState(0);  // determine what component to be display, eg. home, user, etc
  const [current_form, set_current_form] = useState('');  // used by user option on the NavigationBar
  const [genEdType, setGenEdType] = useState(''); // use by creat my list
  const nothing = [['none',0]];
  const [genEdCount, setGenEdCount] = useState(nothing);  // getting gened data
  const [logInStatus, setLogInStatus] = useState(false);  // checking login session

  const handleCountGenEd = async (event)=>{
    event.preventDefault();
    try{
        //?subject=${searchMessage}&cNumber=${searchNum}
        await axios.get(`http://127.0.0.1:5000/find_type_count?course_type=${genEdType}`) // gened request
          .then(response => {
            // console.log(response)
            if(response.data && !response.data.length){
              return;
            }
            // console.log(response)
            setGenEdCount(response.data); 
            // console.log(response.data)
          });
    }
    catch(error){ // spot invalid gened
        alert("Gened type does not exist! Please Try Again"); 
        console.log(error.message);
    }
  }

  function openForm(state){ // use to switch between components
    setloadForm(state);  // setting the state of the website
  }
  
  function set_request_form(state_string){    // setting the form that user setting is using, this is kinda bad
    set_current_form(state_string);
  }
  
  function handleGenedTypeTyping(msg){  // setting the current gened information
    setGenEdType(msg.target.value);
  }

  function conditionalLoading(){  // base on loadForm state to determine what components 
                                  // need to be loaded
    switch(loadForm){
      case 1:         // use by update course lists or database, may use a separate html page for
                      // this instead of loading everything in one single page
        return (
          logInStatus == true && <div className='update-table-component'>
            <SubNavBar
              set_request_form={set_request_form} // use subnavbar to set the current form for user settings
            />   
            <UserSetting
              current_form={current_form}  // render the form base on the current form selection
            />
          </div>)
      case 2:         // use by search bar
        return <SearchBar/>
                // loadForm={loadForm}
                // setloadForm={setloadForm}
      case 3: 
        return (<div>
          <form onSubmit={handleCountGenEd}> 
            <div>Culture Study Type</div>
            <input type='text' value={genEdType} onChange={handleGenedTypeTyping}></input>
            <div><button type='submit'>Count</button></div>
          </form>
          <h1>Culture Study: {genEdType}</h1>
          <div>Term: {genEdCount[0][0]}</div>  
          <div>Count: {genEdCount[0][1]}</div>
        </div>)
      default: break;
    }
  }
  return (
    <div className="App">
      <NavigationBar          // this is a permanent flow bar in all pages
        openForm = {openForm}
        logInStatus={logInStatus}
        setLogInStatus={setLogInStatus}
      />
      <div className='content'>
        {conditionalLoading()}  
        {loadForm==0 && <h1 style={{lineHeight: 1.5}}>Hello</h1>}
      </div>
    </div>
  )
}

export default App
