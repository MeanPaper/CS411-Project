import { useState, useEffect} from 'react'
import axios from "axios"
// import reactLogo from './assets/react.svg'

import NavigationBar from './Components/NavigationBar'
import UserSetting from './Components/UserSetting'
import SearchBar from './Components/SearchBar'
import SubNavBar from './Components/SubNavBar'
import './App.css'

// import '../../.env';


// const url = "http://127.0.0.1:5000"

function App() {
  // const [count, setCount] = useState(0)
  // const [message, setMessage] = useState(null);
  // useEffect(()=>{
  //   // fetch(`${url}/prof`)
  //   // .then((response) => {
  //   //   console.log(response)
  //   //   return response.json()
  //   // })
  //   // .then((data)=>{setMessage(data)});
  //   axios.get(`${url}/prof`).then(response => {
  //     console.log(response);
  //     setMessage(response.data);
  //   }).catch(error=>{
  //     console.log(error.toJSON());
  //   })
  // },[]);
  
  const [loadForm, setloadForm] = useState(0);  // determine what component to be display
  const [current_form, set_current_form] = useState('');
  const [genEdType, setGenEdType] = useState('');
  const nothing = [['none',0]]
  const [genEdCount, setGenEdCount] = useState(nothing);

  const handleCountGenEd = async (event)=>{
    event.preventDefault();
    try{
        //?subject=${searchMessage}&cNumber=${searchNum}
        await axios.get(`http://127.0.0.1:5000/find_type_count?course_type=${genEdType}`)
          .then(response => {
            // console.log(response)
            if(response.data && !response.data.length){
              return;
            }
            // console.log(response)
            setGenEdCount(response.data)
            // console.log(response.data)
          });
    }
    catch(error){
        alert("Gened type does not exist! Please Try Again")
        console.log(error.message);
    }
  }

  function openForm(state){
    setloadForm(state);  // setting the state of the website
  }
  
  function set_request_form(state_string){
    set_current_form(state_string);
  }
  
  function handleGenedTypeTyping(msg){
    setGenEdType(msg.target.value);
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
            <UserSetting
              current_form={current_form}
            />
          </div>)
      case 2:         // use by search bar
        return <SearchBar
                loadForm={loadForm}
                setloadForm={setloadForm}
                />
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
      />
      <div className='content'>
        {conditionalLoading()}  
        {loadForm==0 && <h1 style={{lineHeight: 1.5}}>Hello</h1>}

      </div>
    </div>
  )
}

export default App
