import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      {/* Hiệu ứng hình tròn nền */}
      <img src="/images/ellipse-2.png" alt="" className="footer-circle" />

      <div className="footer-container">
        {/* Đường viền trên */}
        <div className="footer-top-border"></div>

        {/* Phần chính */}
        <div className="footer-main">
          {/* Logo + tên nhóm */}
          <div className="footer-brand">
            <h2 className="footer-logo">DB</h2>
            <p className="footer-tagline">Bài tập lớn môn Cơ sở dữ liệu</p>
          </div>

          {/* Icon mạng xã hội (có thể để link thật sau) */}
          <div className="footer-socials">
            <a href="#" className="social-link" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a href="#" className="social-link" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a href="#" className="social-link" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Danh sách sinh viên - ĐÃ ĐỦ 5 BẠN */}
        <div className="footer-students">
          <p className="students-title">Nhóm 1 - Thành viên:</p>
          <div className="students-grid">
            <div className="student-item">
              <span className="student-name">Nguyễn Ngọc Trúc Quỳnh</span>
              <span className="student-id">2312912</span>
            </div>
            <div className="student-item">
              <span className="student-name">Nguyễn Thị Thảo Nguyên</span>
              <span className="student-id">2312371</span>
            </div>
            <div className="student-item">
              <span className="student-name">Giang Huy Tuấn</span>
              <span className="student-id">2313729</span>
            </div>
            <div className="student-item">
              <span className="student-name">Lương Trí Thịnh</span>
              <span className="student-id">2314057</span>
            </div>
            <div className="student-item">
              <span className="student-name">Nguyễn Đức Thịnh</span>
              <span className="student-id">2313284</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-copyright">
          <p>© 2025 Group 1 - Bài tập lớn 2 môn Cơ sở dữ liệu. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;