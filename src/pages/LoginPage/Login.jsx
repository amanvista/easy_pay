import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import './Login.css';
import { useAuth } from '../../app/hooks/useAuth';
import { useDispatch } from 'react-redux';
import { clearError } from '../../app/slices/authSlice';

// ✅ Configurable Constants
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;
const IMAGE_URL = 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80';

const FORGOT_PASSWORD_ROUTE = '/forgot-password';
const REGISTER_ROUTE = '/register';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState('');
  const { login, error: authError, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // Clear auth errors when component mounts or when user starts typing
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      // Redirect to the page user was trying to access, or home
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  // Get redirect path from location state or default to home
  const getRedirectPath = () => {
    return location.state?.from?.pathname || '/';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');

    // Validate email format
    if (!email || !password) {
      return setValidationError('Please fill in all fields');
    }

    if (!EMAIL_REGEX.test(email)) {
      return setValidationError('Please enter a valid email address');
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      return setValidationError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters`);
    }

    try {
      const result = await login(email, password);
      if (result.success) {
        // Redirect to the intended page or home
        const redirectPath = getRedirectPath();
        navigate(redirectPath, { replace: true });
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
          <h2>Welcome to BlinkFeast</h2>
          <p>Queue-free pickup for your favorite meals</p>
        </div>
      </div>

      {/* Right Side Form */}
      <div className="login-form-section">
        <div className="form-wrapper">
          <h1>Sign In</h1>
          <p className="subtitle">Welcome back! Please sign in to your account</p>

          {(validationError || authError) && (
            <div className="error-message">
              {validationError || authError || 'An error occurred. Please try again.'}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-field">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setValidationError('');
                    if (authError) dispatch(clearError());
                  }}
                  placeholder="Enter your email address"
                  required
                  autoComplete="email"
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
                    if (authError) dispatch(clearError());
                  }}
                  placeholder="Enter your password"
                  minLength={MIN_PASSWORD_LENGTH}
                  required
                  autoComplete="current-password"
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

          <p className="signup-link">
            Don't have an account? <Link to={REGISTER_ROUTE}>Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
