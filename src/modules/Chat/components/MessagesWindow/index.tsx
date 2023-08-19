import React, { useEffect, useMemo } from 'react';
import { useMessage } from '../../context/hooks';
import { useUser } from '../../../../context/UserContext/hooks';
import Message from '../Message';
import mp3 from '../../assets/mp3/send-message.mp3';

function MessagesWindow() {
  const { messages } = useMessage();
  const audio = useMemo(() => new Audio(mp3), []);
  const {
    user: { id: idUser },
  } = useUser();

  useEffect(() => {
    const t = document.getElementById('mainChatWindow');
    t?.scrollTo(0, t?.scrollHeight);
    audio.play();
  }, [messages]);

  return (
    <div id="messagesWindow">
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
