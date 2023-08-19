import { useCallback, useContext } from 'react';
import { ICMessages } from './types';
import { IMessage } from '../assets/types';
import { ContextMessage } from './MessageContext';

export const useMessage = () => {
  return useContext<ICMessages>(ContextMessage);
};
export const useMessageActions = (
  messages: IMessage[],
  setMessages: (message: IMessage[]) => void
) => {
  const addMessage = useCallback(
    (message: IMessage) => {
      setMessages([...messages, message]);
    },
    [messages]
  );

  const changeMessage = useCallback(
    (messageParam: IMessage) => {
      return messages.map((message) =>
        message.id === messageParam.id ? messageParam : message
      );
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

  return { addMessage, deleteMessage, changeMessage };
};
