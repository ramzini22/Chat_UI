import React, { FC, useCallback, useMemo, useState } from 'react';
import { IMessage } from '../../assets/types';
import avatarMe from './assets/avatar-me.png';
import avatarBot from './assets/avatar-bot.png';
import { useMessage } from '../../context/hooks';

const Message: FC<{
  message: IMessage;
  isMy: boolean;
  showAvatar: boolean;
}> = ({ message, isMy, showAvatar }) => {
  const textMessage = useMemo(
    () => message.message.replaceAll('\n', '<br/>'),
    [message]
  );
  const { stopSendingMessage } = useMessage();
  const [hideButton, setHideButton] = useState<boolean>(false);

  const stopSending = useCallback(() => {
    setHideButton(true);
    stopSendingMessage(message.id);
  }, []);

  return (
    <div className="messageAndButton">
      {!isMy && message.status !== 'done' && !hideButton && (
        <div className="buttonStop">
          <button type="button" onClick={stopSending}>
            Stop request
          </button>
        </div>
      )}
      <div
        className="message"
        style={{ flexDirection: isMy ? 'row-reverse' : 'row' }}
      >
        <div className="avatar">
          {showAvatar && <img src={isMy ? avatarMe : avatarBot} alt="icon" />}
        </div>
        <div className={`messageInput messageInput-${isMy ? 'my' : 'notMy'}`}>
          <div dangerouslySetInnerHTML={{ __html: textMessage }} />
        </div>
      </div>
    </div>
  );
};

export default Message;
