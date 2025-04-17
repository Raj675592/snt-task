import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const Login = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('attendee');
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
   

    if (role === 'organizer' && code !== '1234') {
      alert('Invalid code for organizer role');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const userData = { name, email, password, role, code: role === 'organizer' ? code : undefined };

    try {
      const response = await fetch('https://snt-task-2.onrender.com/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (response.ok) {
        alert('User registered successfully');
        navigate(role === 'attendee' ? '/user' : '/organizer');
      } else {
        alert(data.error || 'Failed to register user');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      alert('An error occurred while registering the user');
    }
  };

  return (
    <div className="login-container">
      <h2>Register as an Attendee or Organizer</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <label htmlFor="role">Role</label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="attendee">Attendee</option>
          <option value="organizer">Organizer</option>
        </select>
        {role === 'organizer' && (
          <div>
            <label htmlFor="code">Organizer Code</label>
            <input
              type="text"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter Code: 1234 (use this to login as an organizer)"
              required
            />
          </div>
        )}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Login;
