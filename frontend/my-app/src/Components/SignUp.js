import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import Login from './Login';
import styles from '../Styling/SignUp.module.css';

function SignUp(){
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

    const handleSignup = async () => {
        validateEmail();
        validatePassword();
    
        if (emailError || passwordError) {
          return;
        }
    
        try {
          const response = await axios.post('http://localhost:3000/signup', {
            email,
            password,
          });
          console.log(response.data);
          navigate('/login');
        } catch (error) {
          console.log(error.response.data);
        }
      };

    return (
        <div className={styles.container}>
          <h2 className={styles.txt}>Signup</h2>
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
          <button className={styles.btn} onClick={handleSignup}>Signup</button>
          <p className={styles.txt2} >Already Signed up??</p>
          <Link className={styles.btn} to="/login">Login</Link>
        </div>
    );
}

export default SignUp;
