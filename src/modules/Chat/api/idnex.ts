import { IMessage } from '../assets/types';

export const sendMessage = (body: IMessage) => {
  return fetch('http://185.46.8.130/api/v1/chat/send-message', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(body),
  });
};
