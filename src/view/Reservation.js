import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';

export default function Reservation() {
  const [schedule, setSchedule] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState('');
  const [seats, setSeats] = useState(1);
  const [message, setMessage] = useState('');
  const [userId] = useState(localStorage.getItem('userId'));

  useEffect(() => {
    axios.get('http://localhost:5000/api/schedule/')
      .then(response => setSchedule(response.data))
      .catch(error => console.error('Error fetching schedules', error));
  }, []);

  const handleReserve = () => {
    axios.post('http://localhost:5000/api/reservations/reserve', {
      scheduleId: selectedSchedule,
      userId,
      seatsReserved: seats,
    })
      .then(response => setMessage(response.data.message))
      .catch(error => setMessage(error.response?.data?.message || 'Error occured'));
  };

  return (
    <div style={ {padding: '20px'}}>
      <h1>Reserve Your Seats</h1>
      {message && <p>{message}</p>}

      <div>
        <label>Select Bus Schedule:</label>
        <select value={selectedSchedule} onChange={(e) => setSelectedSchedule(e.target.value)} >
          <option value="">Select a Schedule</option>
          {schedule.map(schedule => (
            <option key={schedule._id} value={schedule._id}>
              {schedule.routeId} - {schedule.routeDate} (Bus: {schedule.busId})
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Number of Seats</label>
        <input type="number" value={seats} onChange={(e) => setSeats(Number(e.target.value))} min="1"/>
      </div>
      <button onClick={handleReserve}>Reserve Seats</button>
    </div>
  )
}
