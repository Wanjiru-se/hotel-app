import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css'; // Ensure this imports your CSS file
import LoginPage from './pages/login';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/rooms">Rooms</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={
              <div>
                <section id="home">
                  <h1>Welcome to Los Hermanos Hotel</h1>
                  <p>A place where comfort meets luxury.</p>
                  <button>Book Now</button>
                </section>
                <section id="introduction">
                  <h2>What is Los Hermanos?</h2>
                  <p>Discover our luxurious accommodations, exceptional service, and unique amenities designed to make your stay unforgettable.</p>
                </section>
              </div>
            } />
            <Route path="/rooms" element={<div>{/* Add content for rooms */}</div>} />
            <Route path="/contact" element={
              <section id="contact">
                <form>
                <h2>Contact Us</h2>
                  <input type="text" placeholder="Name" required />
                  <input type="email" placeholder="Email" required />
                  <textarea placeholder="Message" required></textarea>
                  <button type="submit">Send Message</button>
                </form>
              </section>
            } />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
