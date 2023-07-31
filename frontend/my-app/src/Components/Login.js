import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import SignUp from './SignUp';
import styles from '../Styling/SignUp.module.css';
import BlogList from './BlogList';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email is required');
    } else if (!emailRegex.test(email)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
};

const validatePassword = () => {
    if (!password) {
      setPasswordError('Password is required');
    } else if (password.length < 6) {
      setPasswordError('Password should be at least 6 characters long');
    } else {
      setPasswordError('');
    }
};

  const handleLogin = async (e) => {
    validateEmail();
    validatePassword();
    e.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('token', token); 
        console.log('Login successful');
        navigate('/home');
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.txt}>Login</h2>
      <input className={styles.ip}
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        onBlur={validateEmail}
      />
      {emailError && <div className={styles.error}>{emailError}</div>}
      <input className={styles.ip}
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        onBlur={validatePassword}
      />
      {passwordError && <div className={styles.error}>{passwordError}</div>}
      <button className={styles.btn} onClick={handleLogin}>Login</button>
      <p className={styles.txt2}>Already Signed up??</p>
      <Link className={styles.btn} to="/signup">Signup</Link>
      
    </div>
  );
}

export default Login;
