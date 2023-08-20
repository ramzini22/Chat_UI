type IEnv = {
  port: number;
  host: string;
  apiForBot: string;
  messageForTextingBot: string;
  messageForCancelTextingBot: string;
};
export const envs: IEnv = {
  port: Number(process.env.REACT_APP_PORT) || 3000,
  host: process.env.REACT_APP_HOST || '0.0.0.0',
  apiForBot:
    process.env.REACT_APP_API_FOR_BOT ||
    'http://185.46.8.130/api/v1/chat/send-message',
  messageForTextingBot:
    process.env.REACT_APP_MESSAGE_FOR_TEXTING_BOT || '...texting',
  messageForCancelTextingBot:
    process.env.REACT_APP_MESSAGE_FOR_CANCEL_WAITING || 'canceled.',
};
