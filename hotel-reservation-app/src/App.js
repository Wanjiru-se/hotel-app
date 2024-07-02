import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/login';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    console.log('User logged in:', userData);
  };

  return (
    <Router>
      <div className="App">
        <Header user={user} setUser={setUser} />
        <main>
          <Routes>
            <Route path="/" element={
              <div>
                <section id="home">
                  <h1>Welcome to Los Hermanos Hotel</h1>
                  <p>A place where comfort meets luxury.</p>
                  <button><Link to="/rooms">Book now</Link></button>
                </section>
                <hr />
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
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function Header({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <header className="App-header">
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/rooms">Rooms</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          {user ? (
            <>
              <li>Welcome, {user.username}</li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <li><Link to="/login">Login</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default App;