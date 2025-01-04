import React, { useState } from 'react';
import './Calendar.css';
import CalendarDays from './CalendarDays';  // Importujemy komponent CalendarDays

const CalendarView = ({ activities, addActivity }) => {
  const [date, setDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [activityData, setActivityData] = useState({ description: '', time: '', category: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const monthNames = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", 
    "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
    
  const weekDays = ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Ndz"];

  const handleDayClick = (day) => {
    const dayKey = new Date(date.getFullYear(), date.getMonth(), day).toISOString().split('T')[0];
    setSelectedDay(dayKey);
    setActivityData({ description: '', time: '', category: '' });
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setActivityData({ ...activityData, [name]: value });
  };

  const handleSubmit = () => {
    if (!activityData.description || !activityData.time || !activityData.category) {
      alert("Proszę wypełnić wszystkie pola!");
      return;
    }

    addActivity(selectedDay, `${activityData.description} - ${activityData.time} - ${activityData.category}`);
    setIsModalOpen(false);
  };

  const handlePrevMonth = () => {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() - 1);
    setDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() + 1);
    setDate(newDate);
  };

  return (
    <div className="calendar-container">
      <div className="calendar-navigation">
        <button onClick={handlePrevMonth}>Poprzedni</button>
        <h2>{monthNames[date.getMonth()]} {date.getFullYear()}</h2>
        <button onClick={handleNextMonth}>Następny</button>
      </div>
      
      <div className="calendar-weekdays">
        {weekDays.map((day, idx) => (
          <div key={idx} className="calendar-weekday">{day}</div>
        ))}
      </div>

      <CalendarDays 
        date={date} 
        activities={activities} 
        handleDayClick={handleDayClick} 
      />

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3 className="modal-header">Dodaj aktywność</h3>
            <form>
              <div>
                <label>Opis:</label>
                <input
                  type="text"
                  name="description"
                  value={activityData.description}
                  onChange={handleInputChange}
                  placeholder="Opis aktywności"
                />
              </div>
              <div>
                <label>Godzina:</label>
                <input
                  type="time"
                  name="time"
                  value={activityData.time}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Kategoria:</label>
                <select
                  name="category"
                  value={activityData.category}
                  onChange={handleInputChange}
                >
                  <option value="">Wybierz kategorię</option>
                  <option value="Praca">Praca</option>
                  <option value="Hobby">Hobby</option>
                  <option value="Sport">Sport</option>
                  <option value="Spotkanie">Spotkanie</option>
                </select>
              </div>
              <button type="button" onClick={handleSubmit}>Dodaj</button>
              <button type="button" onClick={handleModalClose}>Anuluj</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarView;
