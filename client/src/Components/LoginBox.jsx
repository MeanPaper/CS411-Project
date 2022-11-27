import React from "react"

const LoginBox = ({validPass, setValidPass, loginInfo, setLoginInfo, setLogInStatus}) => {
    
    const [confirmPass, setConfirmPass] = React.useState("");    

    // this will handle the data change of login as well as register
    const handleChange = (event) =>{   
        // console.log(loginInfo); // print loginInfo, info works properly
        // console.log(validPass); 
        // console.log(typeof event.target.value); // the type of this variable is a string
        setLoginInfo(prev=>{
            if(event.target.name == "password"){    // password validation
                setValidPass(event.target.value.length >= 6 && event.target.value.length <= 18); // checking password length
            }
            return {...prev ,[event.target.name]: event.target.value}   // setting info object
        });  
    }


    // re-enter password confirmation handler
    const handleConfirmChange = (event) =>{
        setConfirmPass(event.target.value);
    }
    
    const handleLogin = (event) =>{
        event.preventDefault();
        // process the login request here
        console.log("gogo");    // temp login confirmation
        setLogInStatus(true);
        document.getElementById('id01').style.display='none';
    }

    // register box
    const displayRegisterBox = (value) => {
        setLoginInfo({account: "", password: ""});  // clear the password when the form changes
        setConfirmPass("");
        document.getElementById('id02').style.display=value;    // setting the display of the element
        document.querySelector('#register_form').reset();       // reset the entire register form
     
    }
    

    // this should be async
    const handleRegister = (event) => {
        event.preventDefault(); // this need to be comment because I want the page to refresh upon registering a account
        if(confirmPass != loginInfo.password && 
            passwordLenghtGood() && passwordhasDigit() && passwordhasLetter()){
            console.log("not matching");
        }

        // clean up the password
        setLoginInfo({account: "", password: ""});
        setConfirmPass("");
    }


    const passwordhasDigit = ()=>{
        return loginInfo.password.match(/(?=.*\d)/);
    }
    const passwordhasLetter = ()=>{
        return loginInfo.password.match(/(?=.*[A-Z])(?=.*[a-z])/);
    }
    const passwordLenghtGood = () =>{
        return loginInfo.password.length>=6 && loginInfo.password.length<=18;
    }
    return (
        <>
            <div id="id01" className="modal">
            <form className="modal-content animate" id='login_form' onSubmit={handleLogin}>
                <div className="container">

                    <label htmlFor="account"><b>Email</b></label>
                    <input type="email" placeholder="Enter Email" name="account"
                        onChange={handleChange} autoComplete="on" required/>

                    <label htmlFor="password"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="password"
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
            <form className="modal-content-2 animate" id='register_form' onSubmit={handleRegister}>
                <div className="container">
                    <div className="reg-title"><b>Create New Account</b></div>
                    <label htmlFor="account"><b>Email</b></label>
                    <input type="email" placeholder="Enter Email" name="account"
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
                    <input type="password" placeholder="Enter Password" name="password" 
                        onChange={handleChange}
                        autoComplete='current-password' required/>
                    
                    <label htmlFor="confirm_password"><b>Re-Enter Password</b></label>
                    <input type="password" placeholder="Re-Enter Password" name="confirm_password" 
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
