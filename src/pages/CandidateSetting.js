// CandidateDashboard.jsx
import React, { useState, useEffect } from 'react';
import { User, Briefcase, Link2, Settings,SettingsIcon, PlusCircle, ArrowRight, MapPin, DollarSign, CheckCircle, Bell, Bookmark, Layers, Upload, MoreVertical, Pencil, Trash2, FileText, LogOut, Clock, Globe } from 'lucide-react';
import '../styles/CandidateDashboard.css';
import '../styles/CandidateSetting.css'
import PersonalTab from '../components/Settings/PersonalTab';
import ProfileTab from '../components/Settings/ProfileTab';
import SocialLinksTab from '../components/Settings/SocialLinksTab';
import AccountSettingTab from '../components/Settings/AccountSettingTab';
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
  const [activeMenu, setActiveMenu] = useState('setting');
  const [activeTab, setActiveTab] = useState('personal');
  const [showResumeModal, setShowResumeModal] = useState(false);


  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  useEffect(() => {
  
}, []);

  const [resumes, setResumes] = useState([
    { id: 1, name: 'Professional Resume', size: '3.5 MB' },
    { id: 2, name: 'Product Designer', size: '4.7 MB' },
    { id: 3, name: 'Visual Designer', size: '1.3 MB' }
  ]);
  const [socialLinks, setSocialLinks] = useState([
    { id: 1, platform: 'facebook', url: '' },
    { id: 2, platform: 'twitter', url: '' },
    { id: 3, platform: 'instagram', url: '' },
    { id: 4, platform: 'youtube', url: '' }
  ]);
  const [profilePublic, setProfilePublic] = useState(true);
  const [resumePublic, setResumePublic] = useState(false);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const handleAddResume = () => {
    setShowResumeModal(true);
  };

  const handleDeleteResume = (id) => {
    setResumes(resumes.filter(resume => resume.id !== id));
  };

  const handleAddSocialLink = () => {
    const newId = socialLinks.length + 1;
    setSocialLinks([...socialLinks, { id: newId, platform: 'facebook', url: '' }]);
  };

  const handleRemoveSocialLink = (id) => {
    setSocialLinks(socialLinks.filter(link => link.id !== id));
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
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
      
      <div className="jobpilot-settings-page">
      <div className="jobpilot-settings-container">
        <h1 className="jobpilot-settings-title">Settings</h1>

        <div className="jobpilot-settings-tabs">
          <button 
            className={`jobpilot-settings-tab ${activeTab === 'personal' ? 'jobpilot-settings-tab-active' : ''}`}
            onClick={() => setActiveTab('personal')}
          >
            <User size={20} />
            Personal
          </button>

          <button 
            className={`jobpilot-settings-tab ${activeTab === 'profile' ? 'jobpilot-settings-tab-active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <Clock size={20} />
            Profile
          </button>

          <button 
            className={`jobpilot-settings-tab ${activeTab === 'social' ? 'jobpilot-settings-tab-active' : ''}`}
            onClick={() => setActiveTab('social')}
          >
            <Globe size={20} />
            Social Links
          </button>

          <button 
            className={`jobpilot-settings-tab ${activeTab === 'account' ? 'jobpilot-settings-tab-active' : ''}`}
            onClick={() => setActiveTab('account')}
          >
            <SettingsIcon size={20} />
            Account Setting
          </button>
        </div>

        <div className="jobpilot-settings-content">
          {activeTab === 'personal' && <PersonalTab />}
          {activeTab === 'profile' && <ProfileTab />}
          {activeTab === 'social' && <SocialLinksTab />}
          {activeTab === 'account' && <AccountSettingTab />}
        </div>
      </div>
    </div>

      </main>
    </div>
  );
}