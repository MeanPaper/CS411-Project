import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const UserSetting = ({current_form}) => {
    const[firstData, setfirstData] = React.useState('');
    const[secondData, setSecondData] = React.useState('');

    React.useEffect(()=>{
        setSecondData('')
        setfirstData('')
    },[current_form])

    const universal_submit_request = (event) => {
        event.preventDefault();
        console.log(`${firstData}, ${secondData}`);
    }

    // register user
    const registerUser = async (event) => {
        event.preventDefault();
        try{
            console.log('register');
            const response = await axios.post(`http://127.0.0.1:5000/register`,{
                email: firstData,
                password: secondData
            })
            console.log(response.data);
        }
        catch(error){
            alert(error);
            console.log("POST Failed");
        }
    }

    //delete user
    const deleterUser = async (event) => {
        event.preventDefault();
        try{
            console.log('delete');
            const response = await axios.delete(`http://127.0.0.1:5000/delete_user`,{ data:{
                email: firstData}
            })
            console.log(response.data);
        }
        catch(error){
            alert(error);
            console.log("Delete Failed");
        }
    }

    //update user password
    const updatePassword = async (event) => {
        event.preventDefault();
        try{
            console.log('update password');
            const response = await axios.put(`http://127.0.0.1:5000/update_password`,{
                    email: firstData,
                    password: secondData
                }
            )
            console.log(response.data);
        }
        catch(error){
            alert(error);
            console.log("Update Failed");
        }
    }

    // on change handler
    const handleFirstChange = (msg) => {
        setfirstData(msg.target.value);
        // console.log(data);
    }
    const handleSecondChange = (msg) => {
        setSecondData(msg.target.value);
        // console.log(secondData);
    }
    
    const UpdateUserAcc = () => {
        return(<div>
                <h2>Update Password</h2>
                    <form onSubmit={updatePassword}>
                    <div>Email:</div>
                    <input type="text" onChange={handleFirstChange} id="fname" name="fname"/>
                    <div>Password:</div>
                    <input type="text" onChange={handleSecondChange} id="lname" name="lname"/>
                    <div><button type='submit'> Submit </button></div>
                </form>
            </div>);
    }
    
    const RegisterUserAcc = () => {
        return(<div>
            <h2>Register User</h2>
            <form onSubmit={registerUser}>
                <div>Email:</div>
                <input type="text" onChange={handleFirstChange} id="fname" name="fname"/>
                <div>Password:</div>
                <input type="text" onChange={handleSecondChange} id="lname" name="lname"/>
                <div><button type='submit'> Register </button></div>
            </form>
        </div>);
    }

    const Insert = () => {
        return(<div>
            <h2>Comment Log</h2>
            <form onSubmit={universal_submit_request}>
                <div>Email:</div>
                <input type="text" onChange={handleFirstChange} id="fname" name="fname"/>
                <div>No.:</div>
                <input type="text" onChange={handleSecondChange} id="lname" name="lname"/>
                <div><button type='submit'> Submit </button></div>
            </form>
        </div>);
    }
    
    const DeleteUserAcc = () =>{
        return(<div>
            <h2>Delete Current Course</h2>
            <form onSubmit={deleterUser}>
                <div>Email:</div>
                <input type="text" onChange={handleFirstChange} id="fname" name="fname"/>
                <div><button type='submit'> Delete </button></div>
            </form>
        </div>);
    }

    function set_form(current_form){
        switch(current_form){
            case 'update':
                return UpdateUserAcc();
            case 'delete':
                return DeleteUserAcc();
            case 'insert':
                return Insert();
            case 'register':
                return RegisterUserAcc();
            default: break;
        }
    }
    return(
        <div className='update-form'>
            {set_form(current_form)}
        </div>);
};

export default UserSetting;