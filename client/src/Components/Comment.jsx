import React from "react"
import axios from "axios"
import {nanoid} from "nanoid"

const Comment = ({logInStatus, searchMessage, comments}) =>{
    const maxCharacters = 400;
    const [userComment, setUserComment] = React.useState('');
    const noCommentRef = React.useRef();
    
    React.useEffect(()=>{
        if(logInStatus==true){
            noCommentRef.current.textContent = '';
        }
    },[logInStatus]);

    console.log(comments);

    const handleCommentTyping = (event) =>{
        setUserComment(event.target.value)
        noCommentRef.current.textContent='';
    }
    const handleCommentSubmit = async (event) => {
        /* TODO: need to use axios here  */
        event.preventDefault();
        // console.log(noCommentRef.current);
        if(userComment.length == 0){
            noCommentRef.current.textContent = 'Please make some comments :D';
            return;
        }
        try{

            // request object
            const userAccount = sessionStorage.getItem('web-temp');
            const userAcc = JSON.parse(userAccount);
            // console.log(userAcc);
            const dataObject = {'email': userAcc.data, 
                                'commentID': `${nanoid()}`.substring(0,19), 
                                'content': userComment,
                                'subject': searchMessage.course,    // change this later
                                'cNumber': searchMessage.courseNum};  // change this later
            // console.log(dataObject)

            const response = await axios.put(`http://127.0.0.1:5000/insert_comment`, dataObject);
            console.log(response);
        }
        catch(err){ 
            alert(err);
            console.log(err);
        }
    }

    return (
    <div className="comments">
        <div className='user-comment-section'>
            <div className='comment-area' aria-disabled={logInStatus==false}>
                <form className="comment-form" onSubmit={handleCommentSubmit}>
                    <div className="comment-title"><label htmlFor='comment'>Comment:</label></div>
                    {/* <input type='text' required></input> */}
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
        <div className='other-user-comment-section'>
            <div className='comment-text'>  

                {comments.map((data, index) => {
                    return (
                        <div className='comment-text-box' key={nanoid()}>
                            <div className="other-user-comment">
                                {data}
                            </div>
                        {index != (comments.length - 1) && <hr className="divider-line"/>}
                    </div>);
                })}

                {/* this is the text box for each users comment*/}
                {/* <div className='comment-text-box'>
                    <div className="other-user-comment">
                        
                    </div>
                    <hr className="divider-line"/>
                </div> */}
                {/* */}
            </div>
        </div>
    </div>);   
}

export default Comment;
