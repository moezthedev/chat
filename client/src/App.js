import "./App.css";
import io from "socket.io-client";
import Login from "./components/Login"
import Chat from "./components/Chat";

import { useState } from "react";
const socket = io.connect("http://localhost:3001");

function App() {
  const [user,setUser] = useState("")
  const [room,setRoom] = useState("")
  const [showLogin,setShowLogin] = useState(true)
  const joinRoom=()=>{
    socket.emit("joinRoom",room)
    setShowLogin(false)
  }
  
  return (
    <div >
    
    {showLogin?<Login setUser={setUser} setRoom={setRoom} joinRoom={joinRoom} setShowLogin={setShowLogin} />:<Chat username={user} room={room} socket={socket} setShowLogin={setShowLogin}/>}

    </div>
  );
}

export default App;