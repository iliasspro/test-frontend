import React from 'react';
import Call from './Call';

const CallList = ({ calls }) => {
  return (
    <>
      <h2>Calls</h2>
      <ul>
        {calls.map(call => <Call key={call.id} call={call} />)}
      </ul>
    </>
  );
};

export default CallList;
