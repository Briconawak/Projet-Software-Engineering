import React, { useEffect } from 'react';
import Input from './FormInput/FormInput';

import './ChatContent.css';
import Message from './Message/Message';

export default function ChatContent({ channel, onSubmit }) {

  const [time, setTime] = React.useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 30 * 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  
  const renderMessages = () => {
    return channel.messages.map((message, index) => {
      return (
        <Message key={index} {...message} now={time}/>
      );
    });
  }

  if (channel == null) {
    return (
      <p>Nothing to display</p>
    )
  }

  return (
    <div className="chat-content-container">
      <div className="chat-content">
        <div className="chat-content-header">
          <h3 className="chat-content-title">
            <span className="chat-content-slash-icon">/</span>
            <span>{channel.path}</span>
          </h3>
        </div>
        <div className="chat-content-messages">
          {renderMessages()}
        </div>
        <div className="chat-content-footer-input">
          <Input onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
}