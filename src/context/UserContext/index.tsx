import React, { FC } from 'react';
import { ICProps, IUser } from './types';

export const ContextUser = React.createContext<any>(null);

const UserContext: FC<ICProps> = ({ children }) => {
  const initUser: IUser = { id: 1 };
  return (
    <ContextUser.Provider value={{ user: initUser }}>
      {children}
    </ContextUser.Provider>
  );
};

export default UserContext;
