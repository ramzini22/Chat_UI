import React from 'react';
import { useMessage } from '../../context/hooks';
import { useUser } from '../../../../context/UserContext/hooks';
import Message from '../Message';

function MessagesWindow() {
  const { messages } = useMessage();
  const {
    user: { id: idUser },
  } = useUser();

  return (
    <div className="messagesWindow">
      {messages?.map((m, index) => (
        <Message
          message={m}
          isMy={m.idFrom === idUser}
          key={m.id}
          showAvatar={index === 0 || messages[index - 1].idFrom !== m.idFrom}
        />
      ))}
    </div>
  );
}

export default MessagesWindow;
