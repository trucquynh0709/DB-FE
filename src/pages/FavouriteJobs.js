// FavoriteJobs.jsx
import React, { useState, useEffect } from 'react';
import { Briefcase, Bookmark, Bell, Settings,Layers2, LogOut, MapPin, DollarSign, Clock, ArrowRight, ChevronLeft, ChevronRight, Layers, Calendar } from 'lucide-react';
import '../styles/FavouriteJobs.css';
import '../styles/CandidateDashboard.css';
import { Link } from 'react-router-dom';

// Fallback data
 const handleLogout = () => {
    console.log('Logout');
    // Handle logout logic
  };
  
const FALLBACK_DATA = {
  jobs: [
    {
      id: 1,
      title: 'Chuyên gia Hỗ trợ Kỹ thuật',
      type: 'Full Time',
      company: 'Google',
      logo: 'https://ui-avatars.com/api/?name=GO&background=4285F4&color=fff&size=80',
      location: 'Idaho, USA',
      salary: '$15k-$20k',
      status: 'expired',
      daysRemaining: 0,
      bookmarked: true
    },
    {
      id: 2,
      title: 'Thiết kế UI/UX',
      type: 'Full Time',
      company: 'YouTube',
      logo: 'https://ui-avatars.com/api/?name=YT&background=FF0000&color=fff&size=80',
      location: 'Minnesota, USA',
      salary: '$10k-$15k',
      status: 'remaining',
      daysRemaining: 4,
      bookmarked: true
    },
    {
      id: 3,
      title: 'Thiết kế UX Cao cấp',
      type: 'Full Time',
      company: 'Slack',
      logo: 'https://ui-avatars.com/api/?name=SL&background=4A154B&color=fff&size=80',
      location: 'United Kingdom of Great Britain',
      salary: '$30k-$35k',
      status: 'remaining',
      daysRemaining: 4,
      bookmarked: true
    },
    {
      id: 4,
      title: 'Thiết kế Đồ họa Junior',
      type: 'Full Time',
      company: 'Facebook',
      logo: 'https://ui-avatars.com/api/?name=FB&background=1877F2&color=fff&size=80',
      location: 'Mymensingh, Bangladesh',
      salary: '$40k-$50k',
      status: 'remaining',
      daysRemaining: 4,
      bookmarked: true
    },
    {
      id: 5,
      title: 'Chuyên gia Hỗ trợ Kỹ thuật',
      type: 'Full Time',
      company: 'Google',
      logo: 'https://ui-avatars.com/api/?name=GO&background=4285F4&color=fff&size=80',
      location: 'Idaho, USA',
      salary: '$15k-$20k',
      status: 'expired',
      daysRemaining: 0,
      bookmarked: true
    },
    {
      id: 6,
      title: 'Thiết kế Sản phẩm',
      type: 'Full Time',
      company: 'Twitter',
      logo: 'https://ui-avatars.com/api/?name=TW&background=1DA1F2&color=fff&size=80',
      location: 'Sivas, Turkey',
      salary: '$50k-$70k',
      status: 'remaining',
      daysRemaining: 4,
      bookmarked: true
    },
    {
      id: 7,
      title: 'Quản lý Dự án',
      type: 'Full Time',
      company: 'Laravel',
      logo: 'https://ui-avatars.com/api/?name=LV&background=FF2D20&color=fff&size=80',
      location: 'Ohio, USA',
      salary: '$50k-$80k',
      status: 'remaining',
      daysRemaining: 4,
      bookmarked: true
    },
    {
      id: 8,
      title: 'Chuyên gia Hỗ trợ Kỹ thuật',
      type: 'Full Time',
      company: 'Google',
      logo: 'https://ui-avatars.com/api/?name=GO&background=4285F4&color=fff&size=80',
      location: 'Idaho, USA',
      salary: '$15k-$20k',
      status: 'expired',
      daysRemaining: 0,
      bookmarked: true
    },
    {
      id: 9,
      title: 'Quản lý Marketing',
      type: 'Temporary',
      company: 'Microsoft',
      logo: 'https://ui-avatars.com/api/?name=MS&background=0078D4&color=fff&size=80',
      location: 'Konya, Turkey',
      salary: '$20k-$25k',
      status: 'remaining',
      daysRemaining: 4,
      bookmarked: true
    },
    {
      id: 10,
      title: 'Thiết kế Trực quan',
      type: 'Part Time',
      company: 'Apple',
      logo: 'https://ui-avatars.com/api/?name=AP&background=000000&color=fff&size=80',
      location: 'Washington, USA',
      salary: '$10k-$15k',
      status: 'remaining',
      daysRemaining: 4,
      bookmarked: true
    },
    {
      id: 11,
      title: 'Thiết kế Tương tác',
      type: 'Remote',
      company: 'Figma',
      logo: 'https://ui-avatars.com/api/?name=FI&background=F24E1E&color=fff&size=80',
      location: 'Perm, USA',
      salary: '$35k-$40k',
      status: 'remaining',
      daysRemaining: 4,
      bookmarked: true
    },
    {
      id: 12,
      title: 'Thiết kế UX Cao cấp',
      type: 'Contract Base',
      company: 'Upwork',
      logo: 'https://ui-avatars.com/api/?name=UP&background=6FDA44&color=fff&size=80',
      location: 'Sylhet, Bangladesh',
      salary: '$30k-$35k',
      status: 'remaining',
      daysRemaining: 4,
      bookmarked: true
    }
  ],
  totalJobs: 17,
  currentPage: 1,
  totalPages: 5
};

export default function FavouriteJobs() {
  const [data, setData] = useState(FALLBACK_DATA);
  const [loading, setLoading] = useState(true);
  const [activeMenu, setActiveMenu] = useState('favourite');
  const [currentPage, setCurrentPage] = useState(1);

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchFavoriteJobs(currentPage);
  }, [currentPage]);

  const fetchFavoriteJobs = async (page) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/candidate/favorite-jobs?page=${page}`);
      
      if (!response.ok) throw new Error('Failed to fetch favorite jobs');
      
      const apiData = await response.json();
      setData(apiData);
    } catch (error) {
      console.error('Error fetching favorite jobs:', error);
      setData(FALLBACK_DATA);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleBookmark = async (jobId) => {
    try {
      await fetch(`${API_BASE_URL}/candidate/bookmark/${jobId}`, {
        method: 'DELETE'
      });
      
      // Remove job from list
      setData(prevData => ({
        ...prevData,
        jobs: prevData.jobs.filter(job => job.id !== jobId),
        totalJobs: prevData.totalJobs - 1
      }));
    } catch (error) {
      console.error('Error removing bookmark:', error);
    }
  };

  const handleApplyNow = (jobId) => {
    console.log('Apply for job:', jobId);
    // navigate(`/jobs/${jobId}/apply`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getJobTypeClass = (type) => {
    const typeMap = {
      'Remote': 'remote',
      'Full Time': 'fulltime',
      'Temporary': 'temporary',
      'Contract Base': 'contract',
      'Part Time': 'parttime'
    };
    return typeMap[type] || 'fulltime';
  };

  const renderPagination = () => {
    const { currentPage, totalPages } = data;
    const pages = [];
    
    for (let i = 1; i <= Math.min(totalPages, 5); i++) {
      pages.push(i);
    }

    return (
      
      <div className="pagination">
        <button
          className="pagination-arrow"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={18} />
        </button>

        {pages.map((page) => (
          <button
            key={page}
            className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
            onClick={() => handlePageChange(page)}
          >
            {page < 10 ? `0${page}` : page}
          </button>
        ))}

        <button
          className="pagination-arrow"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    );
  };

  return (
    <div className="favorite-jobs-container">
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
      <main className="favorite-jobs-main">
        {/* Page Header */}
        <div className="f-page-header">
          <h1 className="f-page-title">
            Việc yêu thích <span className="f-page-title-count">({data.totalJobs})</span>
          </h1>
        </div>

        {/* Favorite Jobs Grid */}
        <div className="favorite-jobs-grid">
          {data.jobs.map((job) => (
            <div key={job.id} className="favorite-job-card">
              {/* Card Header */}
              <div className="f-job-card-header">
                <div className="f-company-info">
                  <img src={job.logo} alt={job.company} className="f-company-logo" />
                  <div className="f-company-details">
                    <h3>{job.title}</h3>
                    <span className={`f-job-type-badge ${getJobTypeClass(job.type)}`}>
                      {job.type}
                    </span>
                  </div>
                </div>
                <button
                  className={`f-bookmark-btn ${job.bookmarked ? 'bookmarked' : ''}`}
                  onClick={() => handleToggleBookmark(job.id)}
                >
                  <Bookmark size={18} />
                </button>
              </div>

              {/* Job Meta */}
              <div className="f-job-card-meta">
                <div className="f-job-meta-row">
                  <MapPin size={16} />
                  <span>{job.location}</span>
                </div>
                <div className="f-job-meta-row">
                  <DollarSign size={16} />
                  <span>{job.salary}</span>
                </div>
              </div>

              {/* Job Status & Action */}
              <div className="f-job-status-row">
                {job.status === 'expired' ? (
                  <>
                    <div className="f-job-status expired">
                      <Calendar size={16} />
                      <span className="f-job-status-text">Hết hạn</span>
                    </div>
                    <button className="deadline-expired-btn">
                      Hết hạn ứng tuyển
                    </button>
                  </>
                ) : (
                  <>
                    <div className="f-job-status remaining">
                      <Clock size={16} />
                      <span className="f-job-status-text">{job.daysRemaining} ngày còn lại</span>
                    </div>
                    <button
                      className="apply-now-btn"
                      onClick={() => handleApplyNow(job.id)}
                    >
                      Ứng tuyển ngay
                      <ArrowRight size={16} />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {renderPagination()}
      </main>
    </div>
  );
}