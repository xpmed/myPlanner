import React from 'react';

const ReservationList = () => {
  // Możesz to zamienić na fetchowanie danych z API
  const reservations = [
    { id: 1, name: 'Jan Kowalski', date: '2024-12-09', time: '14:00' },
    { id: 2, name: 'Anna Nowak', date: '2024-12-10', time: '10:00' },
  ];

  return (
    <div className="reservation-list-container">
      <h2>Lista Rezerwacji</h2>
      <ul>
        {reservations.map((reservation) => (
          <li key={reservation.id}>
            <strong>{reservation.name}</strong> - {reservation.date} - {reservation.time}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservationList;
