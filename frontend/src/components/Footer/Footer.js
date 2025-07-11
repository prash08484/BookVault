import React, { useState } from 'react';
import './Footer.css';

const Footer = () => {
  const [bugReport, setBugReport] = useState('');
  const [showBugForm, setShowBugForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleBugReport = async (e) => {
    e.preventDefault();
    if (!bugReport.trim()) return;

    setIsSubmitting(true);
    
    // Create mailto link with bug report
    const subject = encodeURIComponent('Bug Report - BookVault');
    const body = encodeURIComponent(`Bug Report Details:\n\n${bugReport}\n\nReported from: BookVault Application\nDate: ${new Date().toLocaleString()}`);
    const mailtoLink = `mailto:prash08484@gmail.com?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    setSubmitMessage('Email client opened! Thank you for reporting the bug.');
    setBugReport('');
    setShowBugForm(false);
    setIsSubmitting(false);
    
    // Clear message after 3 seconds
    setTimeout(() => setSubmitMessage(''), 3000);
  };

  const handleContactSupport = () => {
    const subject = encodeURIComponent('Support Request - BookVault');
    const body = encodeURIComponent(`Hello,\n\nI need help with BookVault application.\n\nPlease describe your issue here...\n\nBest regards`);
    window.location.href = `mailto:prash08484@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleFeedback = () => {
    const subject = encodeURIComponent('Feedback - BookVault');
    const body = encodeURIComponent(`Hello,\n\nI have feedback about BookVault application.\n\nFeedback:\n\n\nSuggestions:\n\n\nBest regards`);
    window.location.href = `mailto:prash08484@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Company Info */}
          <div className="footer-section">
            <h3 className="footer-title">📚 BookVault</h3>
            <p className="footer-description">
              Your personal digital library to organize, track, and manage your favorite books.
            </p>
            <div className="social-links">
              <a href="https://facebook.com" className="social-link" title="Facebook" target="_blank" rel="noopener noreferrer">📘</a>
              <a href="https://twitter.com" className="social-link" title="Twitter" target="_blank" rel="noopener noreferrer">🐦</a>
              <a href="https://instagram.com" className="social-link" title="Instagram" target="_blank" rel="noopener noreferrer">📷</a>
              <a href="https://linkedin.com" className="social-link" title="LinkedIn" target="_blank" rel="noopener noreferrer">💼</a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-subtitle">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/books">My Books</a></li>
              <li><a href="/add-book">Add Book</a></li>
              <li><a href="/profile">Profile</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-section">
            <h4 className="footer-subtitle">Support</h4>
            <ul className="footer-links">
              <li>
                <button 
                  className="link-button" 
                  onClick={() => setShowBugForm(!showBugForm)}
                >
                  🐛 Report Bug
                </button>
              </li>
              <li>
                <button className="link-button" onClick={handleContactSupport}>
                  💬 Contact Support
                </button>
              </li>
              <li>
                <button className="link-button" onClick={handleFeedback}>
                  💡 Send Feedback
                </button>
              </li>
              <li><a href="#help">📚 Help Center</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-section">
            <h4 className="footer-subtitle">Contact</h4>
            <div className="contact-info">
              <p className="contact-item">
                <span className="contact-icon">📧</span>
                <a href="mailto:prash08484@gmail.com">prash08484@gmail.com</a>
              </p>
              <p className="contact-item">
                <span className="contact-icon">🌐</span>
                <span>www.bookvault.com</span>
              </p>
              <p className="contact-item">
                <span className="contact-icon">📍</span>
                <span>Worldwide Service</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bug Report Form */}
        {showBugForm && (
          <div className="bug-report-form">
            <div className="bug-form-header">
              <h4>🐛 Report a Bug</h4>
              <button 
                className="close-button" 
                onClick={() => setShowBugForm(false)}
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleBugReport}>
              <textarea
                value={bugReport}
                onChange={(e) => setBugReport(e.target.value)}
                placeholder="Please describe the bug you encountered..."
                className="bug-textarea"
                rows="4"
                required
              />
              <div className="bug-form-actions">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowBugForm(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={isSubmitting || !bugReport.trim()}
                >
                  {isSubmitting ? 'Sending...' : 'Send Bug Report'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Success Message */}
        {submitMessage && (
          <div className="submit-message">
            ✅ {submitMessage}
          </div>
        )}

        {/* Copyright */}
        <div className="footer-bottom">
          <div className="copyright">
            <p>&copy; {new Date().getFullYear()} BookVault. All rights reserved.</p>
            <p className="built-with">Built with ❤️ for book lovers worldwide</p>
          </div>
          <div className="footer-links-bottom">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#cookies">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
