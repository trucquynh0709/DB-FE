// CandidateDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Briefcase, Bookmark, Bell, Settings, LogOut, ArrowRight, MapPin, DollarSign, CheckCircle } from 'lucide-react';
import '../styles/CandidateDashboard.css';

// Fallback data
const FALLBACK_DATA = {
  user: {
    name: 'Nguyễn Văn A',
    avatar: 'https://ui-avatars.com/api/?name=Nguyen+Van+A&background=0A65CC&color=fff&size=128'
  },
  stats: {
    appliedJobs: 589,
    favoriteJobs: 238,
    jobAlerts: 574
  },
  recentApplications: [
    {
      id: 1,
      title: 'Kỹ sư Mạng',
      type: 'Remote',
      company: 'TechViet',
      logo: 'https://ui-avatars.com/api/?name=TV&background=84CC16&color=fff&size=80',
      location: 'Hà Nội',
      salary: '$50k-80k/tháng',
      dateApplied: 'Feb 2, 2019 19:28',
      status: 'active'
    },
    {
      id: 2,
      title: 'Thiết kế Sản phẩm',
      type: 'Full Time',
      company: 'DesignHub',
      logo: 'https://ui-avatars.com/api/?name=DH&background=EC4899&color=fff&size=80',
      location: 'TP.HCM',
      salary: '$50k-80k/tháng',
      dateApplied: 'Dec 7, 2019 23:26',
      status: 'active'
    },
    {
      id: 3,
      title: 'Thiết kế Đồ họa Junior',
      type: 'Temporary',
      company: 'Apple Inc',
      logo: 'https://ui-avatars.com/api/?name=AI&background=000000&color=fff&size=80',
      location: 'Brazil',
      salary: '$52k-80k/tháng',
      dateApplied: 'Feb 2, 2019 19:28',
      status: 'active'
    },
    {
      id: 4,
      title: 'Thiết kế Trực quan',
      type: 'Contract Base',
      company: 'Microsoft',
      logo: 'https://ui-avatars.com/api/?name=MS&background=0078D4&color=fff&size=80',
      location: 'Wisconsin',
      salary: '$50k-80k/tháng',
      dateApplied: 'Dec 7, 2019 23:26',
      status: 'active'
    }
  ]
};

export default function CandidateDashboard() {
  const [data, setData] = useState(FALLBACK_DATA);
  const [loading, setLoading] = useState(true);
  const [activeMenu, setActiveMenu] = useState('overview');

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/candidate/dashboard`);
      
      if (!response.ok) throw new Error('Failed to fetch dashboard data');
      
      const apiData = await response.json();
      setData(apiData);
    } catch (error) {
      console.error('Error fetching dashboard:', error);
      setData(FALLBACK_DATA);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (jobId) => {
    console.log('View details for job:', jobId);
    // navigate(`/jobs/${jobId}`);
  };

  const handleEditProfile = () => {
    console.log('Edit profile');
    // navigate('/profile/edit');
  };

  const handleLogout = () => {
    console.log('Logout');
    // Handle logout logic
  };

  const getJobTypeClass = (type) => {
    const typeMap = {
      'Remote': 'remote',
      'Full Time': 'fulltime',
      'Temporary': 'temporary',
      'Contract Base': 'contract'
    };
    return typeMap[type] || '';
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <span className="sidebar-title">BẢNG ĐIỀU KHIỂN ỨNG VIÊN</span>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeMenu === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveMenu('overview')}
          >
            <Briefcase size={20} />
            <span>Tổng quan</span>
          </button>

          <button
            className={`nav-item ${activeMenu === 'applied' ? 'active' : ''}`}
            onClick={() => setActiveMenu('applied')}
          >
            <Briefcase size={20} />
            <span>Việc đã ứng tuyển</span>
          </button>

          <button
            className={`nav-item ${activeMenu === 'favorite' ? 'active' : ''}`}
            onClick={() => setActiveMenu('favorite')}
          >
            <Bookmark size={20} />
            <span>Việc yêu thích</span>
          </button>

          <button
            className={`nav-item ${activeMenu === 'alerts' ? 'active' : ''}`}
            onClick={() => setActiveMenu('alerts')}
          >
            <Bell size={20} />
            <span>Thông báo việc làm</span>
            <span className="nav-badge">09</span>
          </button>

          <button
            className={`nav-item ${activeMenu === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveMenu('settings')}
          >
            <Settings size={20} />
            <span>Cài đặt</span>
          </button>
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={18} />
          <span>Đăng xuất</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Welcome Section */}
        <div className="welcome-section">
          <h1 className="welcome-title">Xin chào, {data.user.name}</h1>
          <p className="welcome-subtitle">Đây là hoạt động hàng ngày và thông báo việc làm của bạn</p>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card blue">
            <div className="stat-content">
              <div>
                <div className="stat-number">{data.stats.appliedJobs}</div>
                <div className="stat-label">Việc đã ứng tuyển</div>
              </div>
              <div className="stat-icon blue">
                <Briefcase size={28} color="#0A65CC" />
              </div>
            </div>
          </div>

          <div className="stat-card yellow">
            <div className="stat-content">
              <div>
                <div className="stat-number">{data.stats.favoriteJobs}</div>
                <div className="stat-label">Việc yêu thích</div>
              </div>
              <div className="stat-icon yellow">
                <Bookmark size={28} color="#F59E0B" />
              </div>
            </div>
          </div>

          <div className="stat-card green">
            <div className="stat-content">
              <div>
                <div className="stat-number">{data.stats.jobAlerts}</div>
                <div className="stat-label">Thông báo việc làm</div>
              </div>
              <div className="stat-icon green">
                <Bell size={28} color="#10B981" />
              </div>
            </div>
          </div>
        </div>

        {/* Profile Alert */}
        <div className="profile-alert">
          <div className="profile-alert-content">
            <img 
              src={data.user.avatar} 
              alt="Avatar" 
              className="profile-avatar"
            />
            <div>
              <div className="profile-alert-title">Hồ sơ của bạn chưa hoàn tất.</div>
              <div className="profile-alert-text">Hoàn thành chỉnh sửa hồ sơ và xây dựng CV tùy chỉnh của bạn</div>
            </div>
          </div>
          <button className="edit-profile-btn" onClick={handleEditProfile}>
            Chỉnh sửa hồ sơ
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Recently Applied Section */}
        <div className="recent-section">
          <div className="section-header">
            <h2 className="section-title">Đã ứng tuyển gần đây</h2>
            <button className="view-all-btn">
              Xem tất cả
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Table Header */}
          <div className="table-header">
            <div>Công việc</div>
            <div>Ngày ứng tuyển</div>
            <div>Trạng thái</div>
            <div>Hành động</div>
          </div>

          {/* Job List */}
          <div className="job-list">
            {data.recentApplications.map((job) => (
              <div key={job.id} className="job-card">
                <div className="job-info">
                  <img src={job.logo} alt={job.company} className="company-logo" />
                  <div>
                    <div className="job-header">
                      <h3 className="job-title">{job.title}</h3>
                      <span className={`job-type ${getJobTypeClass(job.type)}`}>
                        {job.type}
                      </span>
                    </div>
                    <div className="job-meta">
                      <span className="meta-item">
                        <MapPin size={14} />
                        {job.location}
                      </span>
                      <span className="meta-item">
                        <DollarSign size={14} />
                        {job.salary}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="job-date">
                  {job.dateApplied}
                </div>

                <div className="job-status">
                  <CheckCircle size={16} />
                  <span>Đang hoạt động</span>
                </div>

                <div className="job-actions">
                  <button 
                    className="details-btn"
                    onClick={() => handleViewDetails(job.id)}
                  >
                    Xem chi tiết
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}