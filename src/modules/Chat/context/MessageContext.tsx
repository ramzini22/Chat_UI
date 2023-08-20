import React, { FC, useState } from 'react';
import { ICProps } from './types';
import { IMessage } from '../assets/types';
import { useMessageActions } from './hooks';

export const ContextMessage = React.createContext<any>(null);
const MessageContext: FC<ICProps> = ({ children }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const {
    addMessage,
    deleteMessage,
    changeMessage,
    stopSendingMessage,
    countSended,
  } = useMessageActions(messages, setMessages);

  return (
    <ContextMessage.Provider
      value={{
        messages,
        addMessage,
        changeMessage,
        deleteMessage,
        stopSendingMessage,
        countSended,
      }}
    >
      {children}
    </ContextMessage.Provider>
  );
};
export default MessageContext;
