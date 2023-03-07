import React, { useState } from "react";
import WP_API from '../models/wp_api';

function CreateCredentials(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send username and password to backend for authentication
    const api = new WP_API("https://www.jessecorkill.com");    
    const data = api.addUser("budgetapp", "dHFtQDG99H5GoVyObvNwlKLF", '{"username":"'+ username +'","password":"'+ password +'","email":"'+ email +'"}')
    console.log("Username:", username);
    console.log("Password:", password);
  };

  

  if(props.modalScreen === "newLogin"){
    return (
        <form onSubmit={handleSubmit}>
        <label>
            Email:
            <input
            type="text"
            value={email}
            onChange={handleEmailChange}
            />
        </label>
        <br />
        <label>
            Username:
            <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            />
        </label>
        <br />
        <label>
            Password:
            <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            />
        </label>
        <br />
        <button type="submit">Create Account</button>
        </form>
    );
  }
}

export default CreateCredentials;
