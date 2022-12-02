import React from "react"
import { nanoid } from "nanoid";
import axios from 'axios';

const LoginBox = ({setToken, loginInfo, setLoginInfo, setLogInStatus}) => {
    
    const [confirmPass, setConfirmPass] = React.useState("");   
    const existErr = React.useRef();
    const loginErr = React.useRef();

    // this will handle the data change of login as well as register
    const handleChange = (event) =>{   
        existErr.current.textContent = '';
        loginErr.current.textContent = '';
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
    
    const handleLogin = async (event) =>{
        event.preventDefault();
        // console.log(loginInfo);
        try{
            // console.log(loginInfo);
            const res = await axios.post(`http://127.0.0.1:5000/login`,{
                email: loginInfo.account,
                password: loginInfo.password
            })
            
            if(res.data == 'User Not Exists'){
                loginErr.current.textContent = 'User does not exists, please register';
                return;
            }
            else if (res.data == 'Wrong Password'){
                loginErr.current.textContent = 'Wrong password';
                return;
            }
            // console.log(response.data);
        }
        catch(error){
            console.log(error);
            alert(error);
            return;
        }
        
        // console.log("gogo");    // temp login confirmation
        setToken({'token':nanoid()}); // setting login section status, use a random number generator for this
        sessionStorage.setItem('web-temp', JSON.stringify({'data': (loginInfo.account)}));   // setting account for the current session
        setLogInStatus(true);
        loginErr.current.textContent = '';
        document.getElementById('id01').style.display='none';
        setLoginInfo({account: "", password:""});
    }

    // register box
    const displayRegisterBox = (value) => {
        setLoginInfo({account: "", password: ""});  // clear the password when the form changes
        setConfirmPass("");
        existErr.current.textContent='';
        document.getElementById('id02').style.display=value;    // setting the display of the element
        document.querySelector('#register_form').reset();       // reset the entire register form
     
    }
    const displayLoginBox = () => {
        loginErr.current.textContent = '';
        document.getElementById('id01').style.display='none';
    }

    // this should be async
    const handleRegister =  async (event) => {
        event.preventDefault(); // this need to be comment because I want the page to refresh upon registering a account
        if(confirmPass != loginInfo.password){
            document.getElementById('register_form').reset();
            alert("Password does not match");
        }
        
        try{
            const response = await axios.post(`http://127.0.0.1:5000/register`,{
                email: loginInfo.account,
                password: loginInfo.password
            })
   
            if(response.data == 'User Exists'){
                setLoginInfo({account: "", password: ""});
                existErr.current.textContent = 'User exists, please log in';
                document.querySelector('#register_form').reset();       // reset the entire register form
                return;
            }
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
                    <div className='login-error-message' ref={loginErr} style={{color:'red'}}></div>
                    <button className="login-button" type="submit">Login</button>
                    <button className="cancelbtn" type="button" onClick={()=>displayLoginBox()}>Cancel</button>
                </div>
            </form>
            </div> 
            
            <div id="id02" className="modal">
            <form className="modal-content-2 animate login-register-box" id='register_form' onSubmit={handleRegister}>
                <div className="container">
                    <div className="reg-title"><b>Create New Account</b></div>
                    <div ref={existErr} className='user-exist-message' style={{color: 'red'}}></div>
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
