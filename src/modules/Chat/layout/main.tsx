import React, { useEffect, useMemo } from 'react';
import MessagesWindow from '../components/MessagesWindow';
import NewMessage from '../components/NewMessage';
import { useMessage } from '../context/hooks';
import mp3 from '../assets/mp3/send-message.mp3';

function Main() {
  const { messages, countSended } = useMessage();
  const audio = useMemo(() => new Audio(mp3), []);
  useEffect(() => {
    if (countSended !== 0) audio.play();
  }, [countSended]);

  useEffect(() => {
    const t = document.getElementById('mainChatWindow');
    t?.scrollTo(0, t?.scrollHeight);
  }, [messages, countSended]);

  return (
    <div id="mainChatWindow">
      <MessagesWindow />
      <NewMessage />
    </div>
  );
}

export default Main;
