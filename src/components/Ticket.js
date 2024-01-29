import React from 'react';

const Ticket = ({ ticket }) => {
  return (
    <li>
      {ticket.issue_details} (Call ID: {ticket.call_id})
    </li>
  );
};

export default Ticket;