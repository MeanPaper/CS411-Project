import { useState, useEffect} from 'react'
import reactLogo from './assets/react.svg'
import './Components/NavigationBar'
import './App.css'
import NavigationBar from './Components/NavigationBar'
import UpdateForm from './Components/UpdateForm'
import SearchBar from './Components/SearchBar'
import SubNavBar from './Components/SubNavBar'
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
  const [loadForm, setloadForm] = useState(0); 
  
  function openForm(state){
    setloadForm(state);
  }
  
  function conditionalLoading(){
    switch(loadForm){
      case 1:
        return (
          <div>
            <SubNavBar/> 
            <UpdateForm/>
          </div>)
      case 2:
        return <SearchBar/>
      default: break;
    }
  }
  return (
    <div className="App">
      <NavigationBar 
        openForm = {openForm}
      />
      <div className='content'>
        {conditionalLoading()}
        <h1 style={{lineHeight: 1.5}}>Hello 土狗OwenXu🐶🐶🐶🐶🐶 
        臭傻子 我是你爹，你爹没文化，对不起你。
        你爹跟韩国TA在一起了， Owenxu 是大傻子，他每天都很伤心因为大家都打他，
        他妈Owenxu吃了二十八粒打胎药，没把他打死</h1>

      </div>
    </div>
  )
}

export default App
