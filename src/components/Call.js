import React from 'react';

const Call = ({ call }) => {
  return (
    <li>
      <strong>{call.subject}</strong> - {call.call_time} ({call.duration} mins)
    </li>
  );
};
export default Call;