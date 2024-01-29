import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CallList from './components/CallList';
import TicketList from './components/TicketList';

const API_BASE_URL = 'http://localhost:8000/api';

function App() {
  const [calls, setCalls] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [newCall, setNewCall] = useState({ call_time: '', duration: 0, subject: '' });
  const [newTicket, setNewTicket] = useState({ issue_details: '', call_id: null });
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    // Fetch user role
    axios.get(`${API_BASE_URL}/user`)
      .then(response => setUserRole(response.data.role))
      .catch(error => console.error('Error fetching user role:', error));

    // Fetch calls (only if the user is an agent)
    if (userRole === 'agent') {
      axios.get(`${API_BASE_URL}/calls`)
        .then(response => setCalls(response.data))
        .catch(error => console.error('Error fetching calls:', error));
    }

    // Fetch tickets
    axios.get(`${API_BASE_URL}/tickets`)
      .then(response => setTickets(response.data))
      .catch(error => console.error('Error fetching tickets:', error));
  }, [userRole]); // Include userRole in dependencies to re-fetch calls when the role changes

  const handleCallSubmit = (e) => {
    e.preventDefault();
    axios.post(`${API_BASE_URL}/calls`, newCall)
      .then(response => {
        setCalls([...calls, response.data]);
        setNewCall({ call_time: '', duration: 0, subject: '' });
      })
      .catch(error => console.error('Error creating call:', error));
  };

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    axios.post(`${API_BASE_URL}/tickets`, newTicket)
      .then(response => {
        setTickets([...tickets, response.data]);
        setNewTicket({ issue_details: '', call_id: null });
      })
      .catch(error => console.error('Error creating ticket:', error));
  };

  return (
    <div>
      <h1>Call Center Application</h1>

      {userRole === 'agent' ? (
        // Calls (for Agent)
        <CallList calls={calls} />
      ) : (
        // Calls (for Supervisor)
        <CallList calls={calls} />
      )}

      {/* Create Call Form (only visible for Agents) */}
      {userRole === 'agent' && (
        <form onSubmit={handleCallSubmit}>
          <label>
            Call Time:
            <input
              type="datetime-local"
              value={newCall.call_time}
              onChange={(e) => setNewCall({ ...newCall, call_time: e.target.value })}
              required
            />
          </label>
          <label>
            Duration (mins):
            <input
              type="number"
              value={newCall.duration}
              onChange={(e) => setNewCall({ ...newCall, duration: e.target.value })}
              required
            />
          </label>
          <label>
            Subject:
            <input
              type="text"
              value={newCall.subject}
              onChange={(e) => setNewCall({ ...newCall, subject: e.target.value })}
              required
            />
          </label>
          <button type="submit">Create Call</button>
        </form>
      )}

      {/* Tickets */}
      <TicketList tickets={tickets} />

      {/* Create Ticket Form */}
      <form onSubmit={handleTicketSubmit}>
        <label>
          Issue Details:
          <input
            type="text"
            value={newTicket.issue_details}
            onChange={(e) => setNewTicket({ ...newTicket, issue_details: e.target.value })}
            required
          />
        </label>
        <label>
          Call ID:
          <input
            type="number"
            value={newTicket.call_id}
            onChange={(e) => setNewTicket({ ...newTicket, call_id: e.target.value })}
            required
          />
        </label>
        <button type="submit">Create Ticket</button>
      </form>
    </div>
  );
}

export default App;
