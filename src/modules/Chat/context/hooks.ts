import { useCallback, useContext, useEffect, useState } from 'react';
import { ICMessages } from './types';
import { IMessage, IStatus } from '../assets/types';
import { ContextMessage } from './MessageContext';
import { sendMessage } from '../api/idnex';
import { envs } from '../../../../envs';

let stopMessageId: number | null = null;
let stopChangeMessage = false;
export const useMessage = () => {
  return useContext<ICMessages>(ContextMessage);
};
export const useMessageActions = (
  messages: IMessage[],
  setMessages: (message: IMessage[]) => void
) => {
  const [countSended, setCountSended] = useState<number>(0);

  useEffect(() => {
    if (messages.length !== 0 && countSended !== messages.length) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.status === 'done') {
        setCountSended(countSended + 1);
      }
    }
  }, [messages]);

  const stopSendingMessage = useCallback(
    (id: number) => {
      stopChangeMessage = true;
      stopMessageId = id;
    },
    [messages]
  );

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

  const addMessage = async (message: IMessage) => {
    let messageString = '';
    const idNew = Date.now() + 500;
    const changeMessages = (
      messageLast: string = messageString,
      statusLast: IStatus = 'content'
    ) => {
      if (stopMessageId === message.id + 500) {
        setMessages([
          ...messages,
          message,
          {
            id: idNew,
            message: `${messageLast}...${envs.messageForCancelTextingBot}`,
            idFrom: 2,
            status: 'done',
          },
        ]);
        if (statusLast === 'done') stopMessageId = null;
      } else {
        setMessages([
          ...messages,
          message,
          { id: idNew, message: messageLast, idFrom: 2, status: statusLast },
        ]);
      }
    };
    setMessages([...messages, message]);

    setTimeout(() => changeMessages(envs.messageForTextingBot), 500);

    const response = await sendMessage(message);
    const reader = response.body
      ?.pipeThrough(new TextDecoderStream())
      .getReader();
    if (!response.status || !response.body) return;

    let halfOhChunk: string | null = null;

    while (true) {
      if (!reader) return;
      const { value, done } = await reader.read();
      if (done || stopChangeMessage) break;
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
      changeMessages();
    }
    stopChangeMessage = false;
    changeMessages(messageString, 'done');
  };

  return {
    addMessage,
    deleteMessage,
    changeMessage,
    stopSendingMessage,
    countSended,
  };
};
