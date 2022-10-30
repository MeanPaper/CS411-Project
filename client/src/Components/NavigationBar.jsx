import React from 'react';
import ReactDOM from 'react-dom';

const NavigationBar = () => {
    return(
        <div className='nav-bar'>
            <a className='nav-home-button'>Home</a>
            <a className='nav-search-button'>Search Course</a>
            <a className='nav-create-button'>Create My List</a>
        </div>);
};

export default NavigationBar;