import React from "react";
import axios from 'axios';
import { nanoid } from "nanoid";

const CreateList = ({genEdType, setGenEdType, genEdCount, setGenEdCount}) => {
  
  const [recommendation, setRecommendation] = React.useState([]);

  const showRecommendation = async () => {
    try{
      await axios.get('http://127.0.0.1:5000/get_recommend_list').then(
        response => {
          setRecommendation(response.data);
        }
      )
    }
    catch(err){
      alert(err);
    }
  }

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
      <button className='show-recommendation' onClick={()=>showRecommendation()}>See Recommendation</button>

      <h1>Culture Study: {genEdType}</h1>
      <div>Term: {genEdCount[0][0]}</div>  
      <div>Count: {genEdCount[0][1]}</div>
      
      {recommendation.length > 0 && <div className="our-recommendation-box">
        <h3>Our Recommandation</h3>
        {recommendation.map(reco => {
          return (
            <div className='subject-row' key={nanoid()}>
              {reco.map(data=>{return <div className='subject-col' key={nanoid()}> {data} </div>})}
            </div>
            )
          })
        }
      </div>}
    </div>);

}

export default CreateList;


