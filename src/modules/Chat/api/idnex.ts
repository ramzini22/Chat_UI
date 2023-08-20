import { IMessage } from '../assets/types';
import { envs } from '../../../../envs';

export const sendMessage = (body: IMessage) => {
  return fetch(envs.apiForBot, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(body),
  });
};
