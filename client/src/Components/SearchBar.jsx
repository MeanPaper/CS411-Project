import React from 'react'


const SearchBar = () => {
    
    const [searchMessage, setSearchMessage] = React.useState(''); // setting the message of the place
    const placeholder_txt = 'Search for course';
    
    const handleChange = (msg) =>{ // handle on change in the text box
        msg.preventDefault();
        setSearchMessage(msg.target.value);
        console.log(searchMessage);
    }

    const printHello = () => { // print the content
        console.log('hello');    
    }

    return(
        <div className = 'search-bar'>
            <form className = 'search' onSubmit={()=>printHello()}>
                <input type='text' 
                    placeholder={placeholder_txt} 
                    onChange={handleChange}
                    value={searchMessage}
                    name='search'></input>
                <button type='submit'> GO </button>
            </form>
        </div>);     
}

export default SearchBar;
