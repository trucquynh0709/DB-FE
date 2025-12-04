import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Building2, Users, Briefcase, TrendingUp } from 'lucide-react';
import '../styles/SignInEmployer.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const SignInEmployer = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [stats, setStats] = useState({
    totalCandidates: '2,45,382',
    activeEmployers: '12,847',
    successfulHires: '45,293',
    avgTimeToHire: '14 days'
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/employer-stats`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.log('Using fallback stats');
      }
    };
    fetchStats();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          role: 'employer',
          rememberMe
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Đăng nhập thất bại');
      }

      if (data.success && data.data) {
        const { token, user } = data.data;

        // Store token and user info
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem('token', token);
        storage.setItem('user', JSON.stringify(user));

        navigate('/employer/dashboard');
      } else {
        throw new Error('Dữ liệu trả về không hợp lệ');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Không thể kết nối đến server. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="employer-signin-wrapper">
      {/* LEFT - FORM */}
      <div className="employer-signin-left">
        <div className="employer-signin-card">
          {/* Logo */}
          <div className="employer-logo">
            <span style={{ color: '#0A65CC', fontWeight: 'bold', fontSize: '28px' }}>IT</span>
            <span style={{ color: '#18191C', fontWeight: 'bold', fontSize: '28px' }}>viec</span>
            <span style={{
              marginLeft: '12px',
              fontSize: '14px',
              color: '#767F8C',
              fontWeight: '500'
            }}>for Employers</span>
          </div>

          {/* Heading */}
          <h1>Employer Sign In</h1>
          <p className="employer-signin-subtitle">
            Access your employer dashboard to manage jobs and candidates
          </p>

          {/* Alert for candidates */}
          <div className="info-box">
            <span style={{ fontSize: '14px', color: '#5E6670' }}>
              Looking for a job? <a href="/signin" style={{ color: '#0A65CC', fontWeight: '500', textDecoration: 'none' }}>Sign in as candidate</a>
            </span>
          </div>

          {/* Error Message */}
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="employer-signin-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me</span>
              </label>
              <a href="/employer/forgot-password" className="forgot-link">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="divider">
            <span>or</span>
          </div>

          {/* Social Login */}
          <div className="social-buttons">
            <button className="social-btn google">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M19.8 10.2c0-.7-.1-1.4-.2-2H10v3.8h5.5c-.2 1.2-1 2.2-2 2.9v2.5h3.2c1.9-1.7 3-4.3 3-7.2z" fill="#4285F4" />
                <path d="M10 20c2.7 0 4.9-.9 6.6-2.4l-3.2-2.5c-.9.6-2 .9-3.4.9-2.6 0-4.8-1.8-5.6-4.2H1.1v2.6C2.8 17.7 6.1 20 10 20z" fill="#34A853" />
                <path d="M4.4 11.8c-.4-1.2-.4-2.4 0-3.6V5.6H1.1c-1.3 2.6-1.3 5.6 0 8.2l3.3-2z" fill="#FBBC04" />
                <path d="M10 3.9c1.5 0 2.8.5 3.9 1.5l2.9-2.9C15 .9 12.7 0 10 0 6.1 0 2.8 2.3 1.1 5.6l3.3 2.6C5.2 5.7 7.4 3.9 10 3.9z" fill="#EA4335" />
              </svg>
              Continue with Google
            </button>
            <button className="social-btn linkedin">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M18.5 0h-17C.7 0 0 .7 0 1.5v17c0 .8.7 1.5 1.5 1.5h17c.8 0 1.5-.7 1.5-1.5v-17C20 .7 19.3 0 18.5 0zM6 17H3V8h3v9zM4.5 6.3c-1 0-1.8-.8-1.8-1.8s.8-1.8 1.8-1.8 1.8.8 1.8 1.8-.8 1.8-1.8 1.8zM17 17h-3v-4.4c0-1.1 0-2.5-1.5-2.5s-1.7 1.2-1.7 2.4V17H8V8h2.8v1.2h.1c.4-.8 1.4-1.5 2.8-1.5 3 0 3.6 2 3.6 4.5V17z" fill="#0A66C2" />
              </svg>
              Continue with LinkedIn
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="signup-prompt">
            Don't have an employer account?
            <a href="/register-employer"> Create one now</a>
          </div>
        </div>
      </div>

      {/* RIGHT - BENEFITS & STATS */}
      <div className="employer-signin-right">
        <div className="employer-benefits-content">
          <h2>
            Find the perfect candidates<br />
            for your team
          </h2>

          <div className="benefits-list">
            <div className="benefit-item">
              <div className="benefit-icon">
                <Users size={24} />
              </div>
              <div className="benefit-text">
                <h3>Access to Top Talent</h3>
                <p>Connect with {stats.totalCandidates} qualified candidates</p>
              </div>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon">
                <Briefcase size={24} />
              </div>
              <div className="benefit-text">
                <h3>Easy Job Management</h3>
                <p>Post, edit, and manage all your job listings in one place</p>
              </div>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon">
                <TrendingUp size={24} />
              </div>
              <div className="benefit-text">
                <h3>Faster Hiring Process</h3>
                <p>Average time to hire: {stats.avgTimeToHire}</p>
              </div>
            </div>
          </div>

          <div className="employer-stats-grid">
            <div className="employer-stat-card">
              <div className="stat-number">{stats.totalCandidates}</div>
              <div className="stat-label">Active Candidates</div>
            </div>
            <div className="employer-stat-card">
              <div className="stat-number">{stats.activeEmployers}</div>
              <div className="stat-label">Active Employers</div>
            </div>
            <div className="employer-stat-card">
              <div className="stat-number">{stats.successfulHires}</div>
              <div className="stat-label">Successful Hires</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInEmployer;