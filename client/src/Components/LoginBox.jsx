import React from "react"
import { nanoid } from "nanoid";
import axios from 'axios';

const LoginBox = ({setToken, loginInfo, setLoginInfo, setLogInStatus}) => {
    
    const [confirmPass, setConfirmPass] = React.useState("");    

    // this will handle the data change of login as well as register
    const handleChange = (event) =>{   
        // console.log(loginInfo); // print loginInfo, info works properly
        // console.log(validPass); 
        // console.log(typeof event.target.value); // the type of this variable is a string
        setLoginInfo(prev=>{
            return {...prev ,[event.target.name]: event.target.value}   // setting info object
        });  
    }

    // re-enter password confirmation handler
    const handleConfirmChange = (event) =>{
        setConfirmPass(event.target.value);
    }
    
    const handleLogin = (event) =>{
        event.preventDefault();

        // try{
        //     console.log('login');
        //     const response = await axios.post(`http://127.0.0.1:5000/login`,{
        //         email: loginInfo.account,
        //         password: loginInfo.password
        //     })
        //     console.log(response.data);
        // }
        // catch(error){
        //     alert(error);
        //     console.log("POST Failed");
        //     if(loginInfo.account=="dl35@illinois.edu"){
        //          alert("Account does not exist, please register")
        //          return;
        //     }
        //     alert(password incorrect);
        // }
        console.log("gogo");    // temp login confirmation
        setToken({'token':nanoid()}); // setting login section status, use a random number generator for this
        sessionStorage.setItem('web-temp', JSON.stringify({'data': (loginInfo.account)}));   // setting account for the current session
        setLogInStatus(true);
        document.getElementById('id01').style.display='none';
        setLoginInfo({account: "", password:""});
    }

    // register box
    const displayRegisterBox = (value) => {
        setLoginInfo({account: "", password: ""});  // clear the password when the form changes
        setConfirmPass("");
        document.getElementById('id02').style.display=value;    // setting the display of the element
        document.querySelector('#register_form').reset();       // reset the entire register form
     
    }
    
    // this should be async
    const handleRegister =  async (event) => {
        event.preventDefault(); // this need to be comment because I want the page to refresh upon registering a account
        if(confirmPass != loginInfo.password){
            document.getElementById('register_form').reset();
            alert("Password does not match");
        }
        
        try{
            console.log('register');
            const response = await axios.post(`http://127.0.0.1:5000/register`,{
                email: loginInfo.account,
                password: loginInfo.password
            })
            // if(loginInfo.account=="dl35@illinois.edu"){
            //      alert("Account exists, please login")
            //      return;
            // }
            console.log(response.data);
           
        }
        catch(error){
            alert(error);
            console.log("POST Failed");
        }

        // clean up the password
        setLoginInfo({account: "", password: ""});
        setConfirmPass("");
        window.location.reload(false);  // refresh the page when log out happens
    }


    const passwordhasDigit = ()=>{
        return (/(?=.*\d)/).test(loginInfo.password); // check if the password has digit
    }
    const passwordhasLetter = ()=>{ // check if the password contains upper and lowercase letter
        return (/(?=.*[A-Z])(?=.*[a-z])/).test(loginInfo.password);
    }
    const passwordLenghtGood = () =>{   //validate the password length
        return loginInfo.password.length>=6 && loginInfo.password.length<=18;
    }
    return (
        <>
            <div id="id01" className="modal">
            <form className="modal-content animate login-register-box" id='login_form' onSubmit={handleLogin}>
                <div className="container">

                    <label htmlFor="account"><b>Email</b></label>
                    <input className="login-box-input" type="email" placeholder="Enter Email" name="account"
                        onChange={handleChange} autoComplete="on" required/>

                    <label htmlFor="password"><b>Password</b></label>
                    <input className="login-box-input" type="password" placeholder="Enter Password" name="password"
                        onChange={handleChange} autoComplete='current-password' required/>
                    <div className='create-account'>
                        <span>Don't have a account?</span>
                        <span className='register-acc' onClick={() => displayRegisterBox('block')}>Register</span>
                    </div>
                    <button className="login-button" type="submit">Login</button>
                    <button className="cancelbtn" type="button" onClick={()=>{document.getElementById('id01').style.display='none'}}>Cancel</button>
                </div>
            </form>
            </div> 
            
            <div id="id02" className="modal">
            <form className="modal-content-2 animate login-register-box" id='register_form' onSubmit={handleRegister}>
                <div className="container">
                    <div className="reg-title"><b>Create New Account</b></div>
                    <label htmlFor="account"><b>Email</b></label>
                    <input className="register-box-input" type="email" placeholder="Enter Email" name="account"
                        onChange={handleChange} autoComplete='on' required/>

                    <div className="require_rule"> 
                        <div className='rule_title'><b>Password required:</b></div>
                        <div className={passwordhasDigit() ? 'valid' : 'invalid'}>
                            <span className='condition-indicate'> 
                                { passwordhasDigit() ? <>&#x2713;</> : <b>&times; </b>}
                            </span>
                            Contains 0-9
                        </div>
                        <div className={passwordhasLetter() ? 'valid' : 'invalid'}>
                            <span className='condition-indicate'> 
                                {passwordhasLetter() ? <>&#x2713;</> : <b>&times; </b>} 
                            </span>
                            Contains A-Z and a-z
                        </div>
                        <div className={passwordLenghtGood() ? 'valid' : 'invalid'}>
                            <span className='condition-indicate'> 
                            { passwordLenghtGood() ? <>&#x2713;</> : <b>&times; </b>}</span>
                                Password length: 6-18
                        </div>
                    </div>

                    <label htmlFor="password"><b>Password</b></label>
                    <input className="register-box-input" type="password" placeholder="Enter Password" name="password" 
                        onChange={handleChange}
                        pattern="[0-9a-zA-Z]{6,18}"
                        title="Must contain lower-case letters, upper-case letters, digits, and 6 to 18 characters"
                        autoComplete='new-password' required/>
                    
                    <label htmlFor="confirm_password"><b>Re-Enter Password</b></label>
                    <input className="register-box-input" type="password" placeholder="Re-Enter Password" name="confirm_password" 
                        autoComplete='on' onChange={handleConfirmChange} required></input>
                    {(confirmPass != loginInfo.password && confirmPass.length > 0) && <div id='not_match_password'>Re-entered password does not match</div>}

                    <button className="login-button" type="submit">Register</button>
                    <button className="cancelbtn" type="button" onClick={()=>displayRegisterBox('none')}>Cancel</button>
                    
                </div>
            </form>
            </div> 
            
        </>         
    )
};

export default LoginBox;
