import React from "react";

const CreateList = ({genEdType, setGenEdType, genEdCount, setGenEdCount}) => {
    const handleCountGenEd = async (event)=>{
    event.preventDefault();
    try{
            //?subject=${searchMessage}&cNumber=${searchNum}
            await axios.get(`http://127.0.0.1:5000/find_type_count?course_type=${genEdType}`) // gened request
                .then(response => {
                // console.log(response)
                if(response.data && !response.data.length){
                    return;
                }
                // console.log(response)
                setGenEdCount(response.data); 
                // console.log(response.data)
                });
        }
        catch(error){ // spot invalid gened
            alert("Gened type does not exist! Please Try Again"); 
            console.log(error.message);
        }
    }

    function handleGenedTypeTyping(msg){  // setting the current gened information
        setGenEdType(msg.target.value);
    }
    
    return (<div>
        <form onSubmit={handleCountGenEd}> 
          <label htmlFor="gened-entry">Culture Study Type</label>
          <input type='text' value={genEdType} onChange={handleGenedTypeTyping} name='gened-entry' 
            title="Please type the gened abbreviation"
          required></input>
          <div><button type='submit'>Count</button></div>
        </form>
        <h1>Culture Study: {genEdType}</h1>
        <div>Term: {genEdCount[0][0]}</div>  
        <div>Count: {genEdCount[0][1]}</div>
      </div>);

}

export default CreateList;
