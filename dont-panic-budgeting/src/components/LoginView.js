import React, { useState } from 'react';

//Component for Login View
function LoginView(props){


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send username and password to backend for authentication
    console.log("Username:", username);
    console.log("Password:", password);
  };

    if(props.modalScreen === "login"){
      return(
        <div id="loginView" >
          <form className="" onSubmit={handleSubmit}>
            <label>
              Username:
              <input type="text" value={username} onChange={handleUsernameChange}></input>
            </label>
            <label>
              Password:
              <input type="password" value={password} onChange={handlePasswordChange}></input>
            </label>
            <button type="submit" value="Submit"> </button>
          </form>
          <div id="sign_up">
            <p>Don't have an account? </p>
            <button onClick={props.newLoginNav}>Sign Up</button>
          </div>  
    
        </div>
      )
  }
  else{
    return "";
  }
}
export default LoginView;