import React from "react";

import Comment from "./Comment";
import SearchBar from "./SearchBar";

const CourseReview = ({logInStatus}) => {

    const [result, setResult] = React.useState([[1]]);
    
    return (
    <div className="course-review-section">
        <SearchBar result={result} setResult={setResult}/>
        {result.length > 0 && <Comment logInStatus = {logInStatus} />}
    </div>
    );
}

export default CourseReview;
