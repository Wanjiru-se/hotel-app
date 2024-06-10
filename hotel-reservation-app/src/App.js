import React from 'react';
import './App.css'; // Ensure this imports your CSS file

  
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#rooms">Rooms</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </nav>
        <main>
          <section id="home">
            <h1>Welcome Los Hermanos Hotel</h1>
            <p>A place where comfort meets luxury.</p>
            <button>Book Now</button>
          </section>
          <section id="introduction">
            <h2>What is Los Hermanos?</h2>
            <p>Discover our luxurious accommodations, exceptional service, and unique amenities designed to make your stay unforgettable.</p>
          </section>
          <section id="contact">
            <h2>Contact Us</h2>
            {/* Placeholder for the contact form */}
            <form>
              <input type="text" placeholder="Name" required />
              <input type="email" placeholder="Email" required />
              <textarea placeholder="Message" required></textarea>
              <button type="submit">Send Message</button>
            </form>
          </section>
          {/* Add more sections as needed */}
        </main>
      </header>
    </div>
  );
}

export default App;
