import React, { useState, useEffect } from "react";
import "./AccountForm.css";

const AccountForm = ({ accessToken }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    postalCode: "",
    city: "",
    subscribeNewsletter: false,
    age: "",
    gender: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
  
    if (!accessToken) {
      console.error('Brak tokena! Użytkownik nie jest zalogowany.');
      return;
    }
  
    fetch("/api/account/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(`Error: ${response.status} - ${response.statusText}. Response: ${text}`);
          });
        }
        return response.json();
      })
      .then((data) => {
        setFormData(data);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);
  

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    fetch("/api/account/", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          setSuccessMessage("Dane zostały zaktualizowane.");
        } else {
          throw new Error("Nie udało się zaktualizować danych.");
        }
      })
      .catch((error) => console.error("Error updating user data:", error));
  };
  return (
    <div className="account-form">
      <h2>Moje Konto</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="half-width">
            <label>
              Imię:
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="half-width">
            <label>
              Nazwisko:
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </label>
          </div>
        </div>
  
        <label>
          Adres:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </label>
  
        <div className="form-row">
          <div className="half-width">
            <label>
              Kod pocztowy:
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="half-width">
            <label>
              Miasto:
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
              />
            </label>
          </div>
        </div>
  
        <div className="form-row">
          <div className="half-width">
            <label>
              Wiek:
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="half-width">
            <label>
              Płeć:
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
              >
                <option value="">Wybierz...</option>
                <option value="male">Mężczyzna</option>
                <option value="female">Kobieta</option>
                <option value="other">Inne</option>
              </select>
            </label>
          </div>
        </div>
  
        <div className="form-row">
          <div className="half-width">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="newsletter-checkbox">
            <input
              type="checkbox"
              name="subscribeNewsletter"
              checked={formData.subscribeNewsletter}
              onChange={handleInputChange}
            />
            <span>Zapisz się do newslettera</span>
          </div>
        </div>
  
        <button type="submit">Zapisz</button>
      </form>
    </div>
  );
};

export default AccountForm;
