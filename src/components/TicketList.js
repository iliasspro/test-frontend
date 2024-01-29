import React from 'react';
import Ticket from './Ticket';

const TicketList = ({ tickets }) => {
  return (
    <>
      <h2>Tickets</h2>
      <ul>
        {tickets.map(ticket => <Ticket key={ticket.id} ticket={ticket} />)}
      </ul>
    </>
  );
};

export default TicketList;
