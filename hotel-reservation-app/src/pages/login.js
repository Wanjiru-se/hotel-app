import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt with:', { username, password });

    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Login response:', data);
      if (data.message === 'Login successful') {
        onLogin({ username });
        navigate('/');
      } else {
        alert('Invalid credentials');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error logging in. Please try again later.');
    });
  };

  const handleCreateAccount = (e) => {
    e.preventDefault();
    console.log('Create account attempt with:', { username, password, email, phoneNumber });

    fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password, email, phoneNumber })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Create account response:', data);
      if (data.id) {
        alert('Account created successfully');
        setIsCreatingAccount(false);
      } else {
        alert('Error creating account');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error creating account. Please try again later.');
    });
  };

  return (
    <div className="login-container">
      {isCreatingAccount ? (
        <form onSubmit={handleCreateAccount}>
          <h2>Create Account</h2>
          <div>
            <label>Username: </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password: </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Email: </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Phone Number: </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <button type="submit">Create Account</button>
          <p>
            Already have an account?{' '}
            <a href="#" onClick={() => setIsCreatingAccount(false)}>
              Login here
            </a>
          </p>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div>
            <label>Username: </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password: </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
          <p>
            Don't have an account?{' '}
            <a href="#" onClick={() => setIsCreatingAccount(true)}>
              Create one here
            </a>
          </p>
        </form>
      )}
    </div>
  );
};

export default LoginPage;