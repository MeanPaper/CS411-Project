import React from "react"

const Comment = ({logInStatus}) =>{
    const maxCharacters = 400;
    const [userComment, setUserComment] = React.useState('');

    const handleCommentSubmit = (event) => {
        event.preventDefault();
        console.log(commentRef.current.value);
    }
    return (<div className='comment-section'>
            <div className='comment-area'>
                <form className="comment-form" onSubmit={handleCommentSubmit}>
                    <label htmlFor='comment' className="comment-title">Comment:</label>
                    <textarea className="user-comment-box"
                        name="comment"
                        maxLength={maxCharacters}
                        onChange={(e)=>{setUserComment(e.target.value)}}
                        placeholder="What is your comment... "></textarea>
                </form>
                <p>{userComment.length} / 400 characters</p>
                <button type="submit">Post</button>
                
            </div>
        {/* loading all the user comments, and capped the visible comment to 10 most recent post */}
    </div>);   
}

export default Comment;