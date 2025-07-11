import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserProfile } from '../../redux/actions/users/userActions';
import './Profile.css';

const Profile = () => {
  const dispatch = useDispatch();
  const { userAuth } = useSelector(state => state.userAuth);
  const { loading, error, success } = useSelector(state => state.userUpdate);

  const [formData, setFormData] = useState({
    name: userAuth?.name || '',
    email: userAuth?.email || ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

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
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(updateUserProfile(formData));
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setFormData({
      name: userAuth?.name || '',
      email: userAuth?.email || ''
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: userAuth?.name || '',
      email: userAuth?.email || ''
    });
    setErrors({});
  };

  return (
    <div className="profile-container fade-in">
      <div className="container">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              {userAuth?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <h2>My Profile</h2>
            <p>Manage your personal information</p>
          </div>
          
          <div className="profile-content">
            {success && (
              <div className="alert alert-success">
                Profile updated successfully!
              </div>
            )}
            
            {error && (
              <div className="alert alert-error">
                {error}
              </div>
            )}
            
            {!isEditing ? (
              <div className="profile-view">
                <div className="profile-field">
                  <label className="profile-label">Full Name</label>
                  <div className="profile-value">{userAuth?.name}</div>
                </div>
                
                <div className="profile-field">
                  <label className="profile-label">Email Address</label>
                  <div className="profile-value">{userAuth?.email}</div>
                </div>
                
                <div className="profile-field">
                  <label className="profile-label">Member Since</label>
                  <div className="profile-value">
                    {new Date(userAuth?.createdAt || Date.now()).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="profile-actions">
                  <button 
                    onClick={handleEdit}
                    className="btn btn-primary"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="profile-form">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`form-control ${errors.name ? 'error' : ''}`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && <span className="error-text">{errors.name}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email Address *</label>
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
                
                <div className="form-actions">
                  <button 
                    type="button" 
                    onClick={handleCancel}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <div className="spinner-small"></div>
                        Updating...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Additional Profile Stats */}
        <div className="profile-stats">
          <h3>Account Statistics</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📚</div>
              <div className="stat-value">0</div>
              <div className="stat-label">Total Books</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📖</div>
              <div className="stat-value">0</div>
              <div className="stat-label">Books Read</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⭐</div>
              <div className="stat-value">0</div>
              <div className="stat-label">Favorites</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🎯</div>
              <div className="stat-value">0%</div>
              <div className="stat-label">Reading Goal</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
