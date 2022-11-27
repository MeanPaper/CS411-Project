import React from "react";

import Comment from "./Comment";
import SearchBar from "./SearchBar";

const CourseReview = ({logInStatus}) => {
    
    return (
    <>
        <SearchBar />
        <Comment logInStatus = {logInStatus}/>
    </>
    );
}

export default CourseReview;