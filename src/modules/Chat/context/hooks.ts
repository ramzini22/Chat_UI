import { useCallback, useContext } from 'react';
import { ICMessages } from './types';
import { IMessage } from '../assets/types';
import { ContextMessage } from './MessageContext';
import { sendMessage } from '../api/idnex';

export const useMessage = () => {
  return useContext<ICMessages>(ContextMessage);
};
export const useMessageActions = (
  messages: IMessage[],
  setMessages: (message: IMessage[]) => void
) => {
  const changeMessage = useCallback(
    (messageParam: IMessage) => {
      const newArrayMessages = messages.map((message) =>
        message.id === messageParam.id ? messageParam : message
      );
      setMessages(newArrayMessages);
    },
    [messages]
  );

  const deleteMessage = useCallback(
    (id: number) => {
      const newMessagesArray = messages.filter((message) => message.id !== id);
      setMessages(newMessagesArray);
    },
    [messages]
  );
  const addMessage = useCallback(
    async (message: IMessage) => {
      setMessages([...messages, message]);
      let messageString = '';
      const response = await sendMessage(message);
      const reader = response.body
        .pipeThrough(new TextDecoderStream())
        .getReader();
      if (!response.status || !response.body) return;
      setMessages([...messages, { ...message, status: 'done' }]);
      const idNew = Date.now();
      let halfOhChunk: string | null = null;
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const arrayOfChunks = value.replaceAll('}{', '}_*_{').split('_*_');
        const words = arrayOfChunks.map((c) => {
          try {
            if (!halfOhChunk) {
              const letter = JSON.parse(c) as { value: string };
              return letter.value;
            }

            const letter = JSON.parse(halfOhChunk + c) as { value: string };
            halfOhChunk = null;
            return letter.value;
          } catch (e) {
            halfOhChunk = c;
            return '';
          }
        });
        messageString += words.join('');
        setMessages([
          ...messages,
          { ...message, status: 'done' },
          { id: idNew, message: messageString, idFrom: 2, status: 'content' },
        ]);
      }
      setMessages([
        ...messages,
        { ...message, status: 'done' },
        { id: idNew, message: messageString, idFrom: 2, status: 'done' },
      ]);
    },
    [messages]
  );

  return { addMessage, deleteMessage, changeMessage };
};
