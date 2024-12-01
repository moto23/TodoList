import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './../context/UserContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './css/Login.css';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Ensure this is used

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'email') {
      setEmailError(value.includes('@') ? '' : 'Enter a valid email');
    }

    if (name === 'password') {
      setPasswordError(value.length >= 6 ? '' : 'Enter a valid password');
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState); // Correct usage of setShowPassword
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (emailError || passwordError) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email: formData.email,
        password: formData.password,
      });

      const userData = response.data?.data || response.data?.user || response.data;
      setUser(userData); // Set the user context
      navigate('/'); // Redirect to the Main page
    } catch (error) {
      setError(error.response?.data?.error || error.message || 'Something went wrong');
    }
  };

  return (
    <div className="login-container">
      <div className="login-image">
        <img
          src="https://www.shutterstock.com/image-vector/male-personage-concentrated-working-project-600nw-1896311938.jpg"
          alt="Form"
        />
      </div>
      <div className="login-form">
        <h2>Login</h2>
        <p>
          Don't have an account yet? <Link to="/register">Sign Up</Link>
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              required
              onChange={handleChange}
            />
            {emailError && <p className="error">{emailError}</p>}
          </div>
          <div className="form-group">
            <label>Password</label>
            <div className="password-input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter 6 characters or more"
                required
                onChange={handleChange}
              />
              <span className="password-toggle-icon" onClick={toggleShowPassword}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {passwordError && <p className="error">{passwordError}</p>}
            <Link to="/forgot-password" className="forgot-password">
              Forgot Password?
            </Link>
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="login-button">LOGIN</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
