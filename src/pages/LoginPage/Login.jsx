import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPhone, FaLock, FaGoogle, FaFacebook } from 'react-icons/fa';
import './Login.css';
import { useAuth } from '../../app/hooks/useAuth';

// ✅ Configurable Constants
const INITIAL_PHONE = '7292048622';
const INITIAL_PASSWORD = '12345';
const PHONE_REGEX = /^\d{10,15}$/;
const MIN_PASSWORD_LENGTH = 6;
const IMAGE_URL = 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80';

const LOGIN_ROUTE = '/menu';
const FORGOT_PASSWORD_ROUTE = '/forgot-password';
const REGISTER_ROUTE = '/register';

const Login = () => {
  const [phone, setPhone] = useState(INITIAL_PHONE);
  const [password, setPassword] = useState(INITIAL_PASSWORD);
  const [validationError, setValidationError] = useState('');
  const { login, error: authError, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');

    if (!phone || !password) {
      return setValidationError('Please fill in all fields');
    }

    if (!PHONE_REGEX.test(phone)) {
      return setValidationError('Please enter a valid phone number');
    }

    try {
      const result = await login(phone, password);
      if (result.success) {
        navigate(LOGIN_ROUTE);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-container">
      {/* Left Side Image */}
      <div className="login-image-section">
        <img src={IMAGE_URL} alt="Delicious food" className="food-image" />
        <div className="image-overlay">
          <h2>Welcome to Garbji</h2>
          <p>Queue-free pickup for your favorite meals</p>
        </div>
      </div>

      {/* Right Side Form */}
      <div className="login-form-section">
        <div className="form-wrapper">
          <h1>Sign In</h1>
          <p className="subtitle">Access your account with phone number</p>

          {validationError && <div className="error-message">{validationError}</div>}
          {authError && <div className="error-message">Login failed: {authError}</div>}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <label htmlFor="phone">Phone Number</label>
              <div className="input-field">
                <FaPhone className="input-icon" />
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setValidationError('');
                  }}
                  placeholder="Enter your phone number"
                  pattern={PHONE_REGEX.source}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="input-field">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setValidationError('');
                  }}
                  placeholder="Enter your password"
                  minLength={MIN_PASSWORD_LENGTH}
                  required
                />
              </div>
            </div>

            <div className="form-options">
              <div className="remember-me">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <Link to={FORGOT_PASSWORD_ROUTE} className="forgot-password">
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner"></span> Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="divider">
            <span>or continue with</span>
          </div>

          <div className="social-login">
            <button type="button" className="social-btn google-btn" disabled={loading}>
              <FaGoogle className="social-icon" /> Google
            </button>
            <button type="button" className="social-btn facebook-btn" disabled={loading}>
              <FaFacebook className="social-icon" /> Facebook
            </button>
          </div>

          <p className="signup-link">
            Don't have an account? <Link to={REGISTER_ROUTE}>Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
