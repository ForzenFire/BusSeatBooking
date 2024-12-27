import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';

export default function Reservation() {
  const [schedule, setSchedule] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState('');
  const [seats, setSeats] = useState(1);
  const [message, setMessage] = useState('');
  const [userId] = useState(localStorage.getItem('userId'));
  const [heldReservationId, setHeldReservationId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/schedule/')
      .then(response => setSchedule(response.data))
      .catch(error => console.error('Error fetching schedules', error));
  }, []);

  const handleReserve = () => {

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token missing from localStorage');
    }

    axios.post('http://localhost:5000/api/reservations/reserve', {
      scheduleId: selectedSchedule,
      // userId,
      seatsReserved: seats,
    },
    {
      headers: { Authorization: `Bearer ${token}`},
    })
      .then((response) => {
        setMessage(response.data.message);
        setHeldReservationId(response.data.heldReservation?._id); 
      })
      .catch(error => setMessage(error.response?.data?.message || 'Error occured'));
  };

  const handleConfirm = () => {
    
    if (!heldReservationId) {
      setMessage('No reservation to confirm');
      return;
    }

    const token = localStorage.getItem('token');
    axios.post('http://localhost:5000/api/reservations/confirm',
      {reservationId: heldReservationId},
      {headers: {Authorization: `Bearer ${token}`} }
    )
    .then(response => setMessage(response.data.message))
    .catch(error => setMessage(error.response?.data?.message || 'Error while confirming reservations'));
  };

  return (
    <div style={ {padding: '20px'}}>
      <h1>Reserve Your Seats</h1>
      {message && <p>{message}</p>}

      <div>
        <label>Select Bus Schedule:</label>
        {schedule.length === 0 ? (
          <p>No schedules availble. Please try again later.</p>
        ) : (
        <select value={selectedSchedule} onChange={(e) => setSelectedSchedule(e.target.value)} >
          <option value="">Select a Schedule</option>
          {schedule.map(schedule => (
            <option key={schedule._id} value={schedule._id}>
              {schedule.routeId.origin} to {schedule.routeId.destination} - {new Date(schedule.routeDate).toLocaleDateString()} 
                    (Bus: {schedule.busId.busNumber})
            </option>
          ))}
        </select>
        )}
      </div>
      <div>
        <label>Number of Seats</label>
        <input type="number" value={seats} onChange={(e) => setSeats(Number(e.target.value))} min="1"/>
      </div>
      <button onClick={handleReserve}>Reserve Seats</button>
      <button onClick={handleConfirm}>Confirm</button>
    </div>
  )
}
