import React from 'react';
import CalendarDay from './CalendarDay';  // Zakładając, że CalendarDay jest innym komponentem odpowiedzialnym za wyświetlanie poszczególnych dni

const CalendarDays = ({ date, activities, handleDayClick }) => {
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const generateCalendar = () => {
    const daysInMonth = getDaysInMonth(date.getMonth(), date.getFullYear());
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    
    let daysArray = Array(daysInMonth).fill(null).map((_, idx) => idx + 1);
    const emptyDays = Array(firstDay === 0 ? 6 : firstDay - 1).fill(null);

    return [...emptyDays, ...daysArray];
  };

  return (
    <div className="calendar">
      {generateCalendar().map((day, idx) => (
        day ? (
          <CalendarDay 
            key={idx} 
            day={day} 
            date={date} 
            activities={activities} 
            handleDayClick={handleDayClick} 
          />
        ) : (
          <div key={idx} className="empty-day"></div>
        )
      ))}
    </div>
  );
};

export default CalendarDays;
