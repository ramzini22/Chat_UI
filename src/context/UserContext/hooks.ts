import { useContext } from 'react';
import { ContextUser } from './index';
import { IUser } from './types';

export const useUser = () => {
  return useContext<{ user: IUser }>(ContextUser);
};
