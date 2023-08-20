import React from 'react';
import Chat from './modules/Chat/index';
import UserContext from './context/UserContext';

function App() {
  return (
    <div
      style={{
        width: '50%',
        marginLeft: '25%',
        height: '90vh',
        marginTop: '0',
        backgroundColor: 'blue',
        padding: '10px',
      }}
    >
      <UserContext>
        <Chat />
      </UserContext>
    </div>
  );
}
export default App;
