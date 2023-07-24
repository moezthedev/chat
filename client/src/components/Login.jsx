import React from 'react';
import '../App.css';

const LoginForm = ({setUser,setRoom,joinRoom}) => {

  const handleSubmit = (event) => {
    event.preventDefault();
  
 
joinRoom()

  };


  return (
    <div className="login-container">
        <h1> Chat Web App</h1>
      <h1>Join a Chat</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" placeholder="Enter your username" required  onChange={(event)=>{setUser(event.target.value)}}/>
        </div>
        <div className="form-group">
          <label htmlFor="roomId">Room Id</label>
          <input type="password" id="roomId" placeholder="Enter room Id" required  onChange={(event)=>{setRoom(event.target.value)}}/>
        </div>
        <button type="submit" id="login-button">Join</button>
      </form>
      <div className="all-rights-reserved">
        All rights reserved by Moez Ahsan &copy; 2023 - 2025
      </div>
    </div>
  );
};

export default LoginForm;
