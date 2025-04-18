import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaLock } from 'react-icons/fa';
import './Register.css';
import { useRegister } from '../../app/hooks/useRegister';

// -----------------------------
// Configurables
// -----------------------------
const IMAGE_URL = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80';

const PLACEHOLDERS = {
  name: 'John Doe',
  email: 'you@example.com',
  phone: 'Enter 10-digit phone number',
  password: 'At least 6 characters',
  confirmPassword: 'Confirm your password',
};

const VALIDATIONS = {
  phone: /^\d{10,15}$/,
};

const MESSAGES = {
  passwordMismatch: 'Passwords do not match',
  invalidPhone: 'Please enter a valid phone number',
};

const Register = () => {
  const [formData, setFormData] = useState({
    name: 'Aman Bisht',
    email: '',
    phone: '8738383923',
    password: 'test',
    confirmPassword: 'test'
  });

  const { register, loading, error } = useRegister();  // Use the custom hook
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError(MESSAGES.passwordMismatch);
      return;
    }

    if (!VALIDATIONS.phone.test(formData.phone)) {
      setError(MESSAGES.invalidPhone);
      return;
    }

    const response = await register(formData);
    if (response.success) {
      navigate('/');
    }
  };

  return (
    <div className="register-container">
      {/* Image Section */}
      <div className="register-image-section">
        <img src={IMAGE_URL} alt="Healthy food" className="food-image" />
        <div className="image-overlay">
          <h2>Join Garbji</h2>
          <p>Queue-free pickup for your favorite meals</p>
        </div>
      </div>

      {/* Form Section */}
      <div className="register-form-section">
        <div className="form-wrapper">
          <h1>Create Account</h1>
          <p className="subtitle">Get started with queue-free food pickup</p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="register-form">
            <div className="input-group">
              <label htmlFor="name">Full Name</label>
              <div className="input-field">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={PLACEHOLDERS.name}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="email">Email Address <span className="optional">(optional)</span></label>
              <div className="input-field">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={PLACEHOLDERS.email}
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="phone">Phone Number</label>
              <div className="input-field">
                <FaPhone className="input-icon" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={PLACEHOLDERS.phone}
                  pattern="[0-9]{10,15}"
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={PLACEHOLDERS.password}
                  minLength="6"
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-field">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder={PLACEHOLDERS.confirmPassword}
                  minLength="6"
                  required
                />
              </div>
            </div>

            <div className="terms-agreement">
              <input
                type="checkbox"
                id="terms"
                required
                className="terms-checkbox"
              />
              <label htmlFor="terms" className="terms-label">
                I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>
              </label>
            </div>

            <button type="submit" className="register-button" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="login-link">
            Already have an account? <Link to="/login">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
