import React from 'react';

const NavigationBar = ({openForm, logInStatus, setLogInStatus}) => {
    // creating log in interface here
    const[loginInfo, SetLoginInfo] = React.useState({account: "", password: ""});
    const[validPass, SetValidPass] = React.useState(false);
    const logInOrOut = (value) => {
        // console.log(logInStatus);
    
        if(value == false){
            window.location.reload(false);  // refresh the page when log out happens
        }
        else{
            document.getElementById('id01').style.display='block'
        }
        setLogInStatus(value);
    }
    
    const handleChange = (event) =>{
        // console.log(loginInfo); // print loginInfo, info works properly
        // console.log(validPass); 
        // console.log(typeof event.target.value); // the type of this variable is a string
        SetLoginInfo(prev=>{
            if(event.target.name == "password"){    // password validation
                SetValidPass(event.target.value.length >= 6 && event.target.value.length <= 18); // checking password length
            }
            return {...prev ,[event.target.name]: event.target.value}   // setting info object
        });  
    }
    return(
        <>
            <div className='nav-bar'>
                <div className='nav-home-button' onClick={()=>openForm(0)}>Home</div>
                    <div className='nav-search-button' onClick={()=>openForm(2)}>Search Course</div>
                    <div className='nav-create-button' onClick={()=>openForm(3)}>Create My List</div>
                    <div className="nav-user-dropdown">
                        <div className ="user-button"> User </div>
                        <div className ="dropdown-content"> 
                            {logInStatus == true && <div onClick={()=>openForm(1)}>Settings</div>}
                            {logInStatus ? <div onClick={()=>logInOrOut(false)}>Log out</div> 
                                : <div onClick={()=>logInOrOut(true)}>Log in</div>}
                        </div>
                    </div>
            </div>

            <div id="id01" className="modal">
            <form className="modal-content animate">
                <div onClick={()=>{document.getElementById('id01').style.display='none'}}
                className="close" title="Close Modal">&times;</div>
                <div className="imgcontainer">
                    gg
                </div>

                <div className="container">
                <label htmlFor="account"><b>Username</b></label>
                <input type="text" placeholder="Enter Username" name="account" onChange={handleChange} required/>

                <label htmlFor="password"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="password" onChange={handleChange} required/>

                <button type="submit">Login</button>
                <label>
                    <input type="checkbox" checked="checked" name="remember" onChange={handleChange}/> Remember me
                </label>
                </div>

                <div className="container" style={{backgroundColor:"#f1f1f1"}}>
                <button type="button" onClick={()=>{document.getElementById('id01').style.display='none'}} className="cancelbtn">Cancel</button>
                <span className="psw">Forgot <a href="#">password?</a></span>
                </div>
            </form>
            </div>      
        </>
    );
};

export default NavigationBar;
