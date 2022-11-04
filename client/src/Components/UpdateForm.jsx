import React from 'react';
import ReactDOM from 'react-dom';

const UpdateForm = () => {
    return(
        <div className='update-form'>
            <h2>Update the Course</h2>
            <form>
            <label>First name:</label>
            <input type="text" id="fname" name="fname"/>
            <label>Last name:</label>
            <input type="text" id="lname" name="lname"/>
            </form>

<p>Note that the form itself is not visible.</p>

<p>Also note that the default width of text input fields is 20 characters.</p>
        </div>);
};

export default UpdateForm;