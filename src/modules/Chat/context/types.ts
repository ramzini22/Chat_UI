import React from 'react';
import { IMessage } from '../assets/types';

export type ICProps = {
  children: React.ReactNode | React.ReactNode[];
};

export type ICMessages = {
  messages: IMessage[];
  addMessage: (message: IMessage) => void;
  changeMessage: (message: IMessage) => void;
  deleteMessage: (message: IMessage) => void;
};
