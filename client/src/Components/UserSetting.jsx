import React from 'react';
import axios from 'axios';
import {Outlet, Link, useNavigate} from 'react-router-dom';


const UserSetting = ({current_form}) => {

    const navigate = useNavigate();
    const[firstData, setfirstData] = React.useState(()=>{
        const item = sessionStorage.getItem('web-temp');
        const parseItem = JSON.parse(item);
        if(!parseItem){
            return '';
        }
        return parseItem.data.length > 0 ? parseItem.data : '';
    });
    const[updateUser, setUpdateUser] = React.useState('');
    const[secondData, setSecondData] = React.useState('');
    
    // console.log(firstData)
    // const[formData, setFormData] = React.useState({});

    React.useEffect(()=>{
        // console.log(firstData + secondData);
        setSecondData('');
        setUpdateUser('');
        // setfirstData('');
    },[current_form])

    const universal_submit_request = (event) => {
        event.preventDefault();
        console.log(`${firstData}, ${secondData}`);
    }

    //delete user
    const deleterUser = async (event) => {
        event.preventDefault();
        if(firstData != updateUser){
            console.log("Please enter the correct email");
            return;
        }
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
        sessionStorage.clear();
        navigate('/');
        window.location.reload(false);  // refresh the page when log out happens
    }

    //update user password
    const updatePassword = async (event) => {
        event.preventDefault();
        if(firstData != updateUser) {
            console.log("Please enter the correct email");
            return;
        }
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
        window.location.reload(false);  // refresh the page when log out happens
        
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
                    <input type="email" placeholder={firstData} id="fname" name="fname" 
                        autoComplete="username email" onChange={(e)=>setUpdateUser(e.target.value)} value={updateUser}/>
                    <div>Password:</div>
                    <input type="password" onChange={handleSecondChange} id="lname" name="lname" value={secondData} 
                        autoComplete="on"required/>
                    <div><button type='submit'> Submit </button></div>
                </form>
            </div>);
    }
    
    const Insert = () => {
        return(<div>
            <h2>Comment Log</h2>
            <form onSubmit={universal_submit_request}>
                <div>Email:</div>
                <input type="email" onChange={handleFirstChange} id="fname" name="fname" value={firstData} required/>
                <div>No.:</div>
                <input type="text" onChange={handleSecondChange} id="lname" name="lname" value={secondData} required/>
                <div><button type='submit'> Submit </button></div>
            </form>
        </div>);
    }
    
    const DeleteUserAcc = () =>{
        return(<div>
            <h2>Delete Current Course</h2>
            <form onSubmit={deleterUser}>
                <div>Please type your email here: </div>
                <input type="email" placeholder={firstData} onChange={(e)=>setUpdateUser(e.target.value)} 
                    id="fname" name="fname" value={updateUser} required/>
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
            // case 'register':
            //     return RegisterUserAcc();
            default: break;
        }
    }
    return(
        <div className='update-form'>
            {set_form(current_form)}
        </div>);
};

export default UserSetting;
