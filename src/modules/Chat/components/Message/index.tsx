import React, { FC, useMemo } from 'react';
import { IMessage } from '../../assets/types';
import avatarMe from './assets/avatar-me.png';
import avatarBot from './assets/avatar-bot.png';

const Message: FC<{
  message: IMessage;
  isMy: boolean;
  showAvatar: boolean;
}> = ({ message, isMy, showAvatar }) => {
  const textMessage = useMemo(
    () => message.message.replaceAll('\n', '<br/>'),
    [message]
  );
  return (
    <div id="message" style={{ flexDirection: isMy ? 'row-reverse' : 'row' }}>
      <div id="avatar">
        {showAvatar && <img src={isMy ? avatarMe : avatarBot} alt="icon" />}
      </div>
      <div className={`messageInput messageInput-${isMy ? 'my' : 'notMy'}`}>
        <div dangerouslySetInnerHTML={{ __html: textMessage }} />
      </div>
    </div>
  );
};

export default Message;
