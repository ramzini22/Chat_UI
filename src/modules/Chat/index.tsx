import React from 'react';
import './assets/styles/style.scss';
import avatarMe from './components/Message/assets/avatar-me.png';
import NewMessage from './components/NewMessage';
import MessageContext from './context/MessageContext';
import MessagesWindow from './components/MessagesWindow';

function Chat() {
  const user = { avatar: avatarMe, id: 1 };

  return (
    <MessageContext>
      <div id="mainChatWindow">
        <MessagesWindow />
        <NewMessage />
      </div>
    </MessageContext>
  );
}

export default Chat;
