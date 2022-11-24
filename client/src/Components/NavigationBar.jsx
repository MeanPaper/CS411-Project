import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


const NavigationBar = ({openForm, logInStatus, setLogInStatus}) => {
    // creating log in interface here
    const logInOrOut = (value) => {
        // console.log(logInStatus);
        if(value == false){
            window.location.reload(false);  // refresh the page when log out happens
        }
        setLogInStatus(value);
    }
    
    return(
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
    );
};

export default NavigationBar;
