import React, { useState } from 'react';

const RoomReservation = () => {
  const [formData, setFormData] = useState({
    member_id: '',
    room_id: '',
    check_in_date: '',
    check_out_date: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);

    fetch('http://localhost:5000/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        setErrorMessage(data.error);
        setSuccessMessage('');
      } else {
        console.log('Success:', data);
        setFormData({
          member_id: '',
          room_id: '',
          check_in_date: '',
          check_out_date: ''
        });
        setErrorMessage('');
        setSuccessMessage('Reservation made successfully');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      setErrorMessage('An error occurred while making the reservation.');
      setSuccessMessage('');
    });
  };

  return (
    <section id="room-reservation">
      <form onSubmit={handleSubmit}>
        <h2>Room Reservation</h2>
        {errorMessage && <p className="error">{errorMessage}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
        <div>
          <label htmlFor="member_id">Member ID: </label>
          <input
            type="text"
            name="member_id"
            placeholder="Member ID"
            value={formData.member_id}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="room_id">Room ID: </label>
          <input
            type="text"
            name="room_id"
            placeholder="Room ID"
            value={formData.room_id}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="check_in_date">Check-In Date: </label>
          <input
            type="date"
            name="check_in_date"
            value={formData.check_in_date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="check_out_date">Check-Out Date: </label>
          <input
            type="date"
            name="check_out_date"
            value={formData.check_out_date}
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
