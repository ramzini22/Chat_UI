import React from 'react';
import Chat from './modules/Chat/index';
import UserContext from './context/UserContext';

function App() {
  return (
    <div
      style={{
        width: '50%',
        marginLeft: '25%',
        height: '50vh',
        marginTop: '25vh',
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
