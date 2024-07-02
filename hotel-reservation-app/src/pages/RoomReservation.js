import React, { useState } from 'react';

const RoomReservation = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    checkInDate: '',
    checkOutDate: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);

    // Send form data to the backend
    fetch('http://localhost:5000/rooms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      setFormData({
        name: '',
        email: '',
        checkInDate: '',
        checkOutDate: ''
      });
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <section id="room-reservation">
      <form onSubmit={handleSubmit}>
      <h2>Room Reservation</h2>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="checkInDate">Check-In Date: </label>
          <input
            type="date"
            name="checkInDate"
            value={formData.checkInDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="checkOutDate">Check-Out Date: </label>
          <input
            type="date"
            name="checkOutDate"
            value={formData.checkOutDate}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Book Room</button>
      </form>
    </section>
  );
};

export default RoomReservation;
