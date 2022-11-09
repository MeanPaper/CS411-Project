import React from 'react';
import ReactDOM from 'react-dom';

const Update = () => {
    const universal_submit_request = (event) => {
        event.preventDefault();
    }
    return(<div>
            <h2>Update Current Course</h2>
                <form onSubmit={universal_submit_request}>
                <label>First name:</label>
                <input type="text" id="fname" name="fname"/>
                <label>Last name:</label>
                <input type="text" id="lname" name="lname"/>
                <button type='submit'> Submit </button>
            </form>
        </div>);
}

const Insert = () => {
    const universal_submit_request = (event) => {
        event.preventDefault();
    }
    return(<div>
        <h2>Insert New Course</h2>
            <form onSubmit={universal_submit_request}>
            <label>First name:</label>
            <input type="text" id="fname" name="fname"/>
            <label>Last name:</label>
            <input type="text" id="lname" name="lname"/>
            <button type='submit'> Submit </button>
        </form>
    </div>);
}

const Delete = () =>{
    const universal_submit_request = (event) => {
        event.preventDefault();
    }
    return(<div>
        <h2>Delete Current Course</h2>
        <form onSubmit={universal_submit_request}>
            <label>First name:</label>
            <input type="text" id="fname" name="fname"/>
            <label>Last name:</label>
            <input type="text" id="lname" name="lname"/>
            <button type='submit'> Submit </button>
        </form>
    </div>);
}

const UpdateForm = ({current_form}) => {
    function set_form(current_form){
        switch(current_form){
            case 'update':
                return Update();
            case 'delete':
                return Delete();
            case 'insert':
                return Insert();
            default: break;
        }
    }
    return(
        <div className='update-form'>
            {set_form(current_form)}
        </div>);
};

export default UpdateForm;