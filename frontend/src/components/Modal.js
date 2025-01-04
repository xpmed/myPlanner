import React from 'react';

const Modal = ({ activityData, handleInputChange, handleSubmit, handleModalClose }) => {
  return (
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
  );
};

export default Modal;
