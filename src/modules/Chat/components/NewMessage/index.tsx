import React, { useEffect, useState } from 'react';
import { Textarea } from '@mui/joy';
import icon from '../../assets/images/icon47.png';
import { useMessage } from '../../context/hooks';
import { IMessage } from '../../assets/types';
import { useUser } from '../../../../context/UserContext/hooks';

function NewMessage() {
  const [newMessage, setNewMessage] = useState<string>();

  const { addMessage } = useMessage();
  const {
    user: { id: idFrom },
  } = useUser();
  const SendMessage = () => {
    const messageText = newMessage?.trim();
    if (messageText) {
      const message: IMessage = {
        message: messageText,
        id: Date.now(),
        idFrom,
        status: 'done',
      };
      setNewMessage('');
      addMessage(message);
    }
  };

  useEffect(() => {
    const t = document.getElementById('mainChatWindow');
    t?.scrollTo(0, t?.scrollHeight);
  }, [newMessage]);

  return (
    <div className="newMessageWindow">
      <div className="textMessageWindow">
        <div className="textareaDiv">
          <Textarea
            value={newMessage}
            placeholder="Start typing here..."
            variant="plain"
            style={{ fontSize: '20px', backgroundColor: 'white' }}
            onChange={(e) => setNewMessage(e.target.value)}
          />
        </div>
        <div className="buttonClick">
          <img src={icon} alt="icon" onClick={SendMessage} />
        </div>
      </div>
    </div>
  );
}

export default NewMessage;
