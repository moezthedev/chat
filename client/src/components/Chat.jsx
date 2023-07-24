import React, { useEffect, useState,useRef,useMemo } from 'react';
import '../Chat.css'; // You can create this CSS file to style the chat.

const Chat = ({socket,username,room}) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
const [receivedData,setReceivedData] = useState([]);
const chatContainerRef = useRef();

 
  const handleInputChange = (event) => {
    setInputText(event.target.value);

  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputText.trim() !== '') {
      // Add the new message to the messages state
      setMessages([
        ...messages,
        { text: inputText, sender: username, time: new Date().toLocaleTimeString() },
      ]);
      setInputText('');
    }
  };
  //Client
  const handleSend = async ()=>{
    if(inputText!==""){
      const messageText = {
        room:room,
        username:username,
        message:inputText,
time: new Date().toLocaleTimeString()

            }

await socket.emit("sendMessage",messageText)
setReceivedData((olddata)=>[...olddata,messageText])

    }
  }
//Received from server
useEffect(() => {
  socket.on('receiveMessage', (data) => {
    console.log(data, 'received');
    setReceivedData((oldData) => [...oldData, data]);
  });
 
  return () => {
    socket.off('receiveMessage');
  };
}, [socket]);


const memoizedReceivedData = useMemo(() => receivedData, [receivedData]);

  return (
    <div className="chat-container">
      <h1>Chat Web App</h1>
      <div className="message-container" ref={chatContainerRef}>
        {memoizedReceivedData.map((message, index) => (
          <div
            key={index}
            className={`message ${message.username === 'user' ? 'user-message' : 'other-message'}`}
          >
            
            <div className="message-sender">{message.username}</div>
            <div className="message-text">{message.message}</div>
            <div className="message-time">{message.time}</div>
          </div>
        ))}
      </div>
      
        
        
      <form className="input-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Type your message..."
        />
        <button type="submit" onClick={handleSend}>Send</button>
      </form>
    </div>
  );
};

export default Chat;
