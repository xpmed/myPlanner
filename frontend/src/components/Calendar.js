import React, { useState, useEffect } from 'react';
import API from './api';

const Calendar = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await API.get('/reservations/');
        setReservations(response.data);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    fetchReservations();
  }, []);

  return (
    <div>
      <h2>Calendar</h2>
      <ul>
        {reservations.map((reservation) => (
          <li key={reservation.id}>
            {reservation.date} - {reservation.user}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Calendar;
