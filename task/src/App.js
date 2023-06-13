
import React, { useState } from 'react';
import './App.css';

function ChatBox({ id, messages, onSendMessage, onClose }) {
  const [newMessage, setNewMessage] = useState('');

  const handleMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = () => {
    onSendMessage(id, newMessage);
    setNewMessage('');
  };

  return (
    <div className="chat-box">
      <div className="message-area">
        {messages.map((message, index) => (
          <p
            key={index}
            className={message.sender === id ? 'self' : 'other'}
          >
            {message.content}
          </p>
        ))}
      </div>
      <div className="input-area">
        <textarea
          value={newMessage}
          onChange={handleMessageChange}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
      <button className="close-button" onClick={() => onClose(id)}>
        Close
      </button>
    </div>
  );
}

function App() {
  const [chatBoxes, setChatBoxes] = useState([]);

  const addChatBox = () => {
    const newChatBox = {
      id: Date.now(),
      messages: [],
    };
    setChatBoxes((prevChatBoxes) => [...prevChatBoxes, newChatBox]);
  };

  const closeChatBox = (id) => {
    setChatBoxes((prevChatBoxes) =>
      prevChatBoxes.filter((chatBox) => chatBox.id !== id)
    );
  };

  const sendMessage = (senderId, message) => {
    setChatBoxes((prevChatBoxes) =>
      prevChatBoxes.map((chatBox) => {
        const newMessage = {
          sender: senderId,
          content: message,
        };
        return {
          ...chatBox,
          messages: [...chatBox.messages, newMessage],
        };
      })
    );
  };

  return (
    <div className="App">
      <button className="add-button" onClick={addChatBox}>
        Add Chat Box
      </button>
      <div className="chat-container">
        {chatBoxes.map((chatBox) => (
          <ChatBox
            key={chatBox.id}
            id={chatBox.id}
            messages={chatBox.messages}
            onSendMessage={sendMessage}
            onClose={closeChatBox}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

