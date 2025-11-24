import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <img src="/images/ellipse-2.png" alt="" className="footer-circle" />
      
      <div className="footer-container">
        {/* Top border */}
        <div className="footer-border"></div>
        
        {/* Main content */}
        <div className="footer-main">
          {/* Left section */}
          <div className="footer-content">
            <h2 className="footer-title">DB</h2>
            <p className="footer-subtitle">csjbc</p>
          </div>
          
          {/* Right section - Social icons */}
          <div className="footer-socials">
            <a href="#" className="social-icon" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
            <a href="#" className="social-icon" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a href="#" className="social-icon" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
          </div>
        </div>
        
        {/* Student info */}
        <div className="footer-students">
          <p className="students-label">Sinh viên:</p>
          <div className="students-list">
            
            <p>Nguyễn Ngọc Trúc Quỳnh - 2312912</p>
            
          </div>
        </div>
        
        {/* Copyright */}
        <div className="footer-copyright">
          <p>© 2025, Group 1</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;