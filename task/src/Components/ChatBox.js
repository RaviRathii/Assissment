import React from 'react';


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

  export default ChatBox;