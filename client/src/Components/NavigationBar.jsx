import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './SearchBar';

const NavigationBar = ({openForm}) => {
    
    return(
        <div className='nav-bar'>
            <a className='nav-home-button' onClick={()=>openForm(0)}>Home</a>
            <a className='nav-search-button' onClick={()=>openForm(2)}>Search Course</a>
            <a className='nav-create-button' onClick={()=>openForm(3)}>Create My List</a>
            <a className='nav-search-button' onClick={()=>openForm(1)}>User setting</a>
        </div>);
};

export default NavigationBar;