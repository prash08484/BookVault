import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/actions/users/userActions';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { userAuth, loading, error } = useSelector(state => state.userAuth);

  useEffect(() => {
    if (userAuth?.token) {
      setShowSuccess(true);
      // Show success message for 1.5 seconds before redirecting
      setTimeout(() => {
        navigate('/books');
      }, 1500);
    }
  }, [userAuth, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(loginUser(formData.email, formData.password));
    }
  };

  return (
    <div className="auth-container">
      <div className="container">
        <div className="auth-card fade-in">
          <div className="auth-header">
            <h2>Welcome Back</h2>
            <p>Sign in to your BookVault account</p>
          </div>
          
          <form onSubmit={handleSubmit} className="auth-form">
            {showSuccess && (
              <div className="alert alert-success">
                ✅ Login successful! Redirecting to your dashboard...
              </div>
            )}
            
            {error && (
              <div className="alert alert-error">
                {error}
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`form-control ${errors.email ? 'error' : ''}`}
                placeholder="Enter your email"
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`form-control ${errors.password ? 'error' : ''}`}
                placeholder="Enter your password"
              />
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary auth-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="spinner-small"></div>
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
          
          <div className="auth-footer">
            <p>
              Don't have an account?{' '}
              <Link to="/register" className="auth-link">
                Create one here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
