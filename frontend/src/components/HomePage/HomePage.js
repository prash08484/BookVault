import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './HomePage.css';

const HomePage = () => {
  const { userAuth } = useSelector(state => state.userAuth);
  const isLoggedIn = userAuth?.token;

  return (
    <div className="homepage">
      <div className="hero-section">
        <div className="container">
          <div className="hero-content fade-in">
            <h1 className="hero-title">
              Welcome to <span className="gradient-text">BookVault</span>
            </h1>
            <p className="hero-subtitle">
              Your personal digital library to organize, track, and manage your favorite books
            </p>
            <p className="hero-description">
              Keep track of your reading journey, organize your collection, and discover new books to read.
            </p>
            
            <div className="hero-actions">
              {isLoggedIn ? (
                <>
                  <Link to="/books" className="btn btn-primary">
                    View My Books
                  </Link>
                  <Link to="/add-book" className="btn btn-secondary">
                    Add New Book
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/register" className="btn btn-primary">
                    Get Started
                  </Link>
                  <Link to="/login" className="btn btn-secondary">
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose BookVault?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3>Organize Your Library</h3>
              <p>Keep all your books organized by category, author, and reading status</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📝</div>
              <h3>Track Your Reading</h3>
              <p>Monitor your reading progress and maintain a history of your literary journey</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Easy Search</h3>
              <p>Quickly find any book in your collection with our powerful search features</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">☁️</div>
              <h3>Cloud Storage</h3>
              <p>Access your library from anywhere with secure cloud synchronization</p>
            </div>
            <div className="feature-card premium-card">
              <div className="feature-icon">👑</div>
              <h3>Premium Features</h3>
              <p>Unlock advanced analytics, unlimited storage, and exclusive book recommendations</p>
              <div className="premium-badge">Premium</div>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3>Smart Recommendations</h3>
              <p>Get personalized book suggestions based on your reading history and preferences</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
