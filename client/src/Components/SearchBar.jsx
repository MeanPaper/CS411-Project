import React from 'react'


const SearchBar = ({loadForm,setloadForm}) => {
    
    const [searchMessage, setSearchMessage] = React.useState(''); // setting the message of the place
    const [searchNum, setSearchNum] = React.useState('');
    
    const placeholder_txt = 'Search for course';                  // place_holder for the course
    
    const handleDepChange = (msg) =>{ // handle on change in the text box
        msg.preventDefault();
        setSearchMessage(msg.target.value);
        // console.log(searchMessage);
    }

    const handleNumChange = (msg) =>{ // handle on change in the text box
        msg.preventDefault();
        setSearchNum(msg.target.value);
        // console.log(searchMessage);
    }
    const printHello = (event) => { // print the content
        event.preventDefault();     // prevent the page from refreshing
        setloadForm(2);             // force load form to reload the component  
        console.log('hello');      
    }

    return(
        <div className = 'search-bar'>
            <form className = 'search' onSubmit={printHello}>
                <input type='text' 
                    placeholder='Department'
                    onChange={handleDepChange}
                    value={searchMessage}
                    name='search'></input>
                <input type='text'
                    placeholder='Number'
                    onChange={handleNumChange}
                    value={searchNum}></input>
                <button type='submit'> GO </button>
            </form>
        </div>);     
}

export default SearchBar;
