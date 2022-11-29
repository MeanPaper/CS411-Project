import React from "react"

const Comment = ({logInStatus}) =>{
    return (<div>
        This is a comment
        <div>
            <textarea maxLength="300" disabled={logInStatus==false}></textarea>
        </div>
        {/* loading all the user comments, and capped the visible comment to 10 most recent post */}
    </div>);   
}

export default Comment;