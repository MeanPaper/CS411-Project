import React from 'react';
import ReactDOM from 'react-dom';

const NavigationBar = ({openForm}) => {
    
    return(
        <div className='nav-bar'>
            <div className='nav-home-button' onClick={()=>openForm(0)}>Home</div>
            <div className='nav-search-button' onClick={()=>openForm(2)}>Search Course</div>
            <div className='nav-create-button' onClick={()=>openForm(3)}>Create My List</div>
            <div className='nav-user-button' onClick={()=>openForm(1)}>User Setting</div>
        </div>);
};

export default NavigationBar;