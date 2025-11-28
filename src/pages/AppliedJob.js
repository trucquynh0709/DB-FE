// CandidateDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Briefcase, Bookmark, Bell, Settings, LogOut, ArrowRight, MapPin, DollarSign, CheckCircle, Layers2 } from 'lucide-react';
import '../styles/CandidateDashboard.css';
import '../styles/AppliedJob.css'
import { Link } from 'react-router-dom';

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


export default function AppliedJobs() {
  const [data, setData] = useState(FALLBACK_DATA);
  const [loading, setLoading] = useState(true);
  const [activeMenu, setActiveMenu] = useState('overview');

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  useEffect(() => {
  setActiveMenu('applied');  // Đặt menu "applied" là active khi vào trang này
  fetchDashboardData();
}, []);

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
    <div className="candidate-dashboard-container">
      {/* Sidebar */}
      <aside className="candidate-dashboard-sidebar">
        <div className="db-sidebar-header">
          <span className="db-sidebar-title">BẢNG ĐIỀU KHIỂN ỨNG VIÊN</span>
        </div>

        <nav className="db-sidebar-nav">
                  <Link 
          to="/candidate-dashboard" 
          className={`db-nav-item ${activeMenu === 'overview' ? 'active' : ''}`}
        >
          <Layers2 size={20} />
          <span>Tổng quan</span>
        </Link>
                <Link 
          to="/candidate-dashboard/applied-jobs" 
          className={`db-nav-item ${activeMenu === 'applied' ? 'active' : ''}`}
        >
          <Briefcase size={20} />
          <span>Việc đã ứng tuyển</span>
        </Link>
        
                  <Link 
          to="/candidate-dashboard/favourite-jobs" 
          className={`db-nav-item ${activeMenu === 'favourite' ? 'active' : ''}`}
        >
          <Bookmark size={20} />
          <span>Việc yêu thích</span>
        </Link>
        
                  <Link 
          to="/candidate-dashboard/notifications" 
          className={`db-nav-item ${activeMenu === 'alerts' ? 'active' : ''}`}
        >
          <Bell size={20} />
          <span>Thông báo việc làm</span>
        </Link>
        
                  <Link 
          to="/candidate-dashboard/setting" 
          className={`db-nav-item ${activeMenu === 'setting' ? 'active' : ''}`}
        >
          <Settings size={20} />
          <span>Cài đặt</span>
        </Link>
                </nav>

        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={18} />
          <span>Đăng xuất</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="dashboard-candidate">

        {/* Recently Applied Section */}
        <div className="db-recent-section">
          <div className="db-section-header">
            <h2 className="db-section-title">Đã ứng tuyển gần đây</h2>
            <button className="db-view-all-btn">
              Xem tất cả
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Table Header */}
          <div className="candidate-table-header">
            <div>Công việc</div>
            <div>Ngày ứng tuyển</div>
            <div>Trạng thái</div>
            <div>Hành động</div>
          </div>

          {/* Job List */}
          <div className="db-job-list">
            {data.recentApplications.map((job) => (
              <div key={job.id} className="db-job-card">
                <div className="db-job-info">
                  <img src={job.logo} alt={job.company} className="db-company-logo" />
                  <div>
                    <div className="db-job-header">
                      <h3 className="db-job-title">{job.title}</h3>
                      <span className={`db-job-type ${getJobTypeClass(job.type)}`}>
                        {job.type}
                      </span>
                    </div>
                    <div className="db-job-meta">
                      <span className="db-meta-item">
                        <MapPin size={14} />
                        {job.location}
                      </span>
                      <span className="db-meta-item">
                        <DollarSign size={14} />
                        {job.salary}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="db-job-date">
                  {job.dateApplied}
                </div>

                <div className="db-job-status">
                  <CheckCircle size={16} />
                  <span>Đang hoạt động</span>
                </div>

                <div className="db-job-actions">
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
          <div className="pagination">
      <button className="page-btn">←</button>
      <button className="page-btn active">01</button>
      <button className="page-btn">02</button>
      <button className="page-btn">03</button>
      <button className="page-btn">04</button>
      <button className="page-btn">05</button>
      <button className="page-btn">→</button>
    </div>
        </div>
      </main>
    </div>
  );
}