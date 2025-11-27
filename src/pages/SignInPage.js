import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Briefcase, Building2, FileText } from 'lucide-react';
import '../styles/SignIn.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const SignIn = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [stats, setStats] = useState({
    liveJobs: '1,75,324',
    companies: '97,354',
    newJobs: '7,532'
  });
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/stats`);
        if (!res.ok) throw new Error();
        const data = await res.json();

        setStats({
          liveJobs: data.find(s => s.label === 'Live Job')?.number || '1,75,324',
          companies: data.find(s => s.label.includes('Compan'))?.number || '97,354',
          newJobs: data.find(s => s.label.includes('New Job'))?.number || '7,532'
        });
      } catch (err) {
        console.log('Dùng fallback stats');
      } finally {
        setLoadingStats(false);
      }
    };
    fetchStats();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Đăng nhập:', { email, password, rememberMe });
    // Xử lý login ở đây
  };

  return (
    <div className="signin-wrapper">
      {/* LEFT - FORM */}
      <div className="signin-left">
        <div className="signin-card">
          <div className="signin-logo">
            <span style={{ color: '#0A65CC', fontWeight: 'bold', fontSize: '24px' }}>IT</span>
            <span style={{ color: '#18191C', fontWeight: 'bold', fontSize: '24px' }}>viec</span>
          </div>

          <h1>Sign in</h1>
          <p className="signin-subtitle">
            Don't have account <a href="/signup">Create Account</a>
          </p>

          <form onSubmit={handleSubmit} className="signin-form">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input full-width"
              required
            />

            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
              <label className="checkbox-label" style={{ margin: 0 }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me</span>
              </label>
              <a href="/forgot-password" style={{ 
                color: '#0A65CC', 
                textDecoration: 'none', 
                fontSize: '14px',
                fontWeight: '500'
              }}>
                Forgot password?
              </a>
            </div>

            <button type="submit" className="submit-btn">
              Sign in
            </button>
          </form>

          <div className="divider">
            <span>or</span>
          </div>

          <div className="social-buttons">
            <button className="social-btn facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              Sign in with Facebook
            </button>
            <button className="social-btn google">
              <svg width="20" height="20" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              Sign in with Google
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT - STATS */}
      <div className="login-right">
        <div className="login-stats-overlay">
          <h2>
            Over {loadingStats ? '1,75,324' : stats.liveJobs} candidates<br />
            waiting for good employees.
          </h2>

          <div className="login-stats-grid">
            <div className="login-stat-card">
              <div className="login-stat-icon">
                <Briefcase size={24} color="#ffffff" />
              </div>
              <div className="login-stat-number">
                {loadingStats ? '1,75,324' : stats.liveJobs}
              </div>
              <div className="login-stat-label">Live Job</div>
            </div>
            
            <div className="login-stat-card">
              <div className="login-stat-icon">
                <Building2 size={24} color="#ffffff" />
              </div>
              <div className="login-stat-number">
                {loadingStats ? '97,354' : stats.companies}
              </div>
              <div className="login-stat-label">Companies</div>
            </div>
            
            <div className="login-stat-card">
              <div className="login-stat-icon">
                <FileText size={24} color="#ffffff" />
              </div>
              <div className="login-stat-number">
                {loadingStats ? '7,532' : stats.newJobs}
              </div>
              <div className="login-stat-label">New Jobs</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;