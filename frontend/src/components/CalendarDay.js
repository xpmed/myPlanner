import React from 'react';

const CalendarDay = ({ day, date, activities, handleDayClick }) => {
  const dayKey = new Date(date.getFullYear(), date.getMonth(), day).toISOString().split('T')[0];

  const renderActivities = () => {
    return activities[dayKey] ? activities[dayKey].map((act, idx) => <li key={idx}>{act}</li>) : null;
  };

  return (
    <div className="calendar-day" onClick={() => handleDayClick(day)}>
      <div className="day-number">{day}</div>
      <ul className="activities">
        {renderActivities()}
      </ul>
    </div>
  );
};

export default CalendarDay;
