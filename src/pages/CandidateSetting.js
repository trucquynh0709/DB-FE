// CandidateDashboard.jsx
import React, { useState, useEffect } from 'react';
import { User, Briefcase, Link2, Settings,ArrowRight, MapPin,DollarSign,CheckCircle,Bell, Bookmark, Layers, Upload, MoreVertical, Pencil, Trash2, FileText, LogOut } from 'lucide-react';
import '../styles/CandidateDashboard.css';
import '../styles/CandidateSetting.css'
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


export default function CandidateSetting() {
  const [data, setData] = useState(FALLBACK_DATA);
  const [loading, setLoading] = useState(true);
  const [activeMenu, setActiveMenu] = useState('overview');

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  useEffect(() => {
  setActiveMenu('setting');  // Đặt menu "applied" là active khi vào trang này
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

      </main>
    </div>
  );
}