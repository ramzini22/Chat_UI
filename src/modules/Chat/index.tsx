import React from 'react';
import './assets/styles/style.scss';
import MessageContext from './context/MessageContext';
import Main from './layout/main';

function Chat() {
  return (
    <MessageContext>
      <Main />
    </MessageContext>
  );
}

export default Chat;
