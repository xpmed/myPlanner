import React from 'react';

const CalendarNavigation = ({ date, handlePrevMonth, handleNextMonth, monthNames }) => {
  return (
    <div className="calendar-navigation">
      <button onClick={handlePrevMonth}>Poprzedni</button>
      <h2>{monthNames[date.getMonth()]} {date.getFullYear()}</h2>
      <button onClick={handleNextMonth}>Następny</button>
    </div>
  );
};

export default CalendarNavigation;
