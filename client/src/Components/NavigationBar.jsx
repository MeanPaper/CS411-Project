import React from 'react';
import LoginBox from './LoginBox';

const NavigationBar = ({openForm, logInStatus, setLogInStatus}) => {
    // creating log in interface here
    const[loginInfo, setLoginInfo] = React.useState({account: "", password: ""}); // keeps the login form, the data will be clear if login is good
    const[validPass, setValidPass] = React.useState(false); // password validation
    const logInOrOut = (value) => {
        // console.log(logInStatus);
        if(value == false){
            setLogInStatus(value); // set login to false
            setLoginInfo({account:"", password:""}); // clear password
            setValidPass(false);   // password no long valid
            window.location.reload(false);  // refresh the page when log out happens
        }
        else{
            document.getElementById('id01').style.display='block';
            document.querySelector('#login_form').reset();
        }
    }
    
    // console.log(logInStatus);
    // console.log(loginInfo);
    // console.log(validPass);
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
            <LoginBox 
                validPass={validPass} 
                setValidPass={setValidPass}
                loginInfo={loginInfo}
                setLoginInfo={setLoginInfo}
                setLogInStatus={setLogInStatus}
            />    
        </>
    );
};

export default NavigationBar;
