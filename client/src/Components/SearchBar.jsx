import React from 'react'
import axios from 'axios'
import {nanoid} from 'nanoid'


const columnNames = ["Professor","Department","Number","Title","Section","Term","A-Rate"];

const SearchBar = () => {
    
    const [searchMessage, setSearchMessage] = React.useState({course:"", courseNum:""}); // setting the message of the place
    // const [searchNum, setSearchNum] = React.useState('');
    const [result, setResult] = React.useState([]);
    const [previousResult, setPreviousResult] = React.useState({course:"", courseNum:""});
    
    // saving the previous message
    React.useEffect(()=>{
        setPreviousResult(searchMessage);
    },[result]);

    // const handleDepChange = (msg) =>{ // handle on change in the text box
    //     msg.preventDefault();
    //     setSearchMessage(msg.target.value);
    //     // console.log(searchMessage);
    // }

    // const handleNumChange = (msg) =>{ // handle on change in the text box
    //     msg.preventDefault();
    //     setSearchNum(msg.target.value);
    //     // console.log(searchMessage);
    // }
    
    const handleSearchMessage = (event) => {
        // event.preventDefault();
        setSearchMessage(prev=>{
            return {...prev, [event.target.name]: event.target.value}
        });
    }
    
    // console.log(searchMessage)
    // handle search requests
    const handleSearchSubmit = async (event)=>{
        event.preventDefault();
        try{
            
            if(previousResult.course.toUpperCase() == searchMessage.course.toUpperCase() && 
                previousResult.courseNum == searchMessage.courseNum){
               return  
            }
            // console.log("reach")
            // //?subject=${searchMessage}&cNumber=${searchNum}
            // if(searchMessage === '' || searchNum === '' || !(/^\d+$/.test(searchNum))){
            //     return
            // }
            // console.log('get')
            let Course = searchMessage.course.toUpperCase();
            let CourseNum = searchMessage.courseNum;
            await axios.get(`http://127.0.0.1:5000/search_course?subject=${Course}&cNumber=${CourseNum}`)
                        .then(response => {
                            if(response.data && !response.data.length){
                                return
                            }
                            setResult(response.data)
                            // console.log(response.data)
                        });
        }
        catch(error){
            console.log(error.message);
        }
    }
    // render the following component on screen
    return(
        <div>
        <div className = 'search-bar'>
            <form className = 'search' onSubmit={handleSearchSubmit}>
                <input type='text' 
                    title="Course Department, need to letters and abbreviations"
                    name='course'
                    placeholder='Department'
                    pattern='[A-Za-z]{2,}'
                    onChange={handleSearchMessage}
                    value={searchMessage.course} required></input>

                <input type='text'
                    title="Course Number"
                    name='courseNum'
                    placeholder='Number'
                    pattern='[0-9]{3,}'
                    onChange={handleSearchMessage}
                    value={searchMessage.courseNum} required></input>
                <button type='submit'> GO </button>
            </form>
        </div>
        <div className='result-title-block'>
            {result.length > 0 &&  
                columnNames.map(data => {
                    return <div key={nanoid()} className={`${data}-col`}>{(data=='A-Rate')?'A Rate':data}</div>})
            }
        </div>
        {result.length > 0 && result.map(data => <div className='subject-row'
            key={nanoid()}>{
                data.map(res => <div className='subject-col' style={(res=='ONL')?{color: '#FF0000'}:{color: 'inherit'}} key = {nanoid()}>
                    {res}
                </div>)
            }</div>)}



        </div>);     
}

export default SearchBar;
