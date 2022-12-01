import React from "react"

const Comment = ({logInStatus}) =>{
    return (<div className='comment-section'>
        <div className='comment-area'>
            <div className="comment-title">Comment:</div>
            <div className="user-comment-box" placeholder="What is your comment... "
                contentEditable='true'> </div>
        </div>
        {/* loading all the user comments, and capped the visible comment to 10 most recent post */}
    </div>);   
}

export default Comment;