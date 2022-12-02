import React from "react";

import Comment from "./Comment";
import SearchBar from "./SearchBar";

const CourseReview = ({logInStatus}) => {

    const [result, setResult] = React.useState([]);
    const [searchMessage, setSearchMessage] = React.useState({course:"", courseNum:""}); // setting the message of the place
    const [comments, setComments] = React.useState([]);
    return (
    <div className="course-review-section">
        <SearchBar result={result} setResult={setResult} 
            searchMessage={searchMessage} setSearchMessage={setSearchMessage}
            comments={comments} setComments={setComments}/>
        {result.length > 0 && <Comment logInStatus = {logInStatus} searchMessage={searchMessage} comments={comments} setComments={setComments}/>}
    </div>
    );
}

export default CourseReview;
