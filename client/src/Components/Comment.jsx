import React from "react"
import axios from "axios"

const Comment = ({logInStatus}) =>{
    const maxCharacters = 400;
    const [userComment, setUserComment] = React.useState('');
    const noCommentRef = React.useRef();
    
    React.useEffect(()=>{
        if(logInStatus==true){
            noCommentRef.current.textContent = '';
        }
    },[logInStatus]);

    const handleCommentTyping = (event) =>{
        setUserComment(event.target.value)
        noCommentRef.current.textContent='';
    }
    const handleCommentSubmit = (event) => {
        /* TODO: need to use axios here  */
        event.preventDefault();
        // console.log(noCommentRef.current);
        if(userComment.length == 0){
            noCommentRef.current.textContent = 'Please make some comments :D';
            return;
        }
    }

    return (
    <div className="comments">
        <div className='user-comment-section'>
            <div className='comment-area' aria-disabled={logInStatus==false}>
                <form className="comment-form" onSubmit={handleCommentSubmit}>
                    <div className="comment-title"><label htmlFor='comment'>Comment:</label></div>
                    <textarea className="user-comment-box"
                        name="comment"
                        maxLength={maxCharacters}
                        onChange={handleCommentTyping}
                        placeholder="What is your comment... "
                        disabled={logInStatus==false}></textarea> 
                        {/* if the ref does not work, I will use required for this text area */}

                    {logInStatus && <div className="comment-control">
                        <div className="character-limit">{userComment.length} / 400 characters</div>
                        <div ref={noCommentRef} style={{fontSize: '13px', color: 'green'}}></div>
                        <button className='comment-submit-button' type="submit">Post</button>
                    </div>}
                </form>
            </div>
        </div>
        <div className='other-user-comment'>
            <div className='comment-text'></div>
        </div>
    </div>);   
}

export default Comment;
