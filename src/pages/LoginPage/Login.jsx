import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '../../app/hooks/useAuth';
import { useDispatch } from 'react-redux';
import { clearError } from '../../app/slices/authSlice';
import { useGoogleAuth } from './useGoogleAuth';

// ✅ Configurable Constants
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;
const IMAGE_URL = 'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg';

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
  const { isProcessing, initiateGoogleLogin } = useGoogleAuth("/login");

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
    <div className="min-h-screen flex">
      {/* Left Side Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img 
          src={IMAGE_URL} 
          alt="Delicious food" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
        <div className="relative z-10 flex flex-col justify-end p-12 text-white">
          <div className="max-w-md space-y-6">
            <h2 className="text-5xl font-bold leading-tight">
              Welcome to <span className="text-orange-400">BlinkFeast</span>
            </h2>
            <p className="text-xl text-gray-100">
              Queue-free pickup for your favorite meals
            </p>
            <div className="flex items-center gap-8 mt-8">
              <div className="text-center">
                <div className="text-4xl font-bold">500+</div>
                <div className="text-sm text-gray-300">Restaurants</div>
              </div>
              <div className="w-px h-12 bg-white/30"></div>
              <div className="text-center">
                <div className="text-4xl font-bold">10K+</div>
                <div className="text-sm text-gray-300">Happy Users</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side Form */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 p-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold text-gray-900">Sign In</h1>
              <p className="text-gray-600">Welcome back! Please sign in to your account</p>
            </div>

            {/* Error Message */}
            {(validationError || authError) && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start gap-3">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">{validationError || authError || 'An error occurred. Please try again.'}</span>
              </div>
            )}

            {isProcessing ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
                <p className="text-gray-600">Signing you in...</p>
              </div>
            ) : (
              <>
                {/* Google Sign-In Button */}
                <button
                  onClick={initiateGoogleLogin}
                  type="button"
                  className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 rounded-lg py-3 px-4 font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm"
                >
                  <FcGoogle className="text-2xl" />
                  Sign in with Google
                </button>

                {/* OR Divider */}
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-px bg-gray-300"></div>
                  <span className="text-sm text-gray-500 font-medium">OR</span>
                  <div className="flex-1 h-px bg-gray-300"></div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Input */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="h-5 w-5 text-gray-400" />
                  </div>
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
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400" />
                  </div>
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
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <Link 
                  to={FORGOT_PASSWORD_ROUTE} 
                  className="text-sm font-medium text-orange-600 hover:text-orange-500 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-orange-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
                </form>
              </>
            )}

            {/* Sign Up Link */}
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link 
                to={REGISTER_ROUTE} 
                className="font-semibold text-orange-600 hover:text-orange-500 transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>

          {/* Mobile Logo */}
          <div className="lg:hidden text-center mt-8">
            <p className="text-gray-600">
              <span className="font-bold text-orange-600">BlinkFeast</span> - Queue-free pickup
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
