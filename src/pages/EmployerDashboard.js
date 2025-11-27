import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  User, 
  PlusCircle, 
  Briefcase, 
  Bookmark, 
  CreditCard, 
  Building2, 
  Settings, 
  LogOut,
  Bell,
  Menu,
  X,
  ChevronRight,
  Users,
  CheckCircle2,
  XCircle,
  MoreVertical,
  Rocket,
  Eye,
  Ban
} from 'lucide-react';
// TODO: Uncomment when API is ready
// import { 
//   getEmployerStats, 
//   getEmployerJobs,
//   updateJobStatus 
// } from '../services/employerService';
import PostJob from './PostJob';
import '../styles/EmployerDashboard.css';

const EmployerDashboard = () => {
  const [activeMenu, setActiveMenu] = useState('overview');
  const [showJobActions, setShowJobActions] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Set to false to show hardcoded data
  const [error, setError] = useState(null);

  // Get employerId from localStorage or context (you should implement proper auth)
  const employerId = localStorage.getItem('employerId') || 1; // Default for testing

  // Hardcoded data - replace with API when ready
  // Schema: employer table có NumberOfOpenedJob, follow table cho savedCandidates
  const [stats, setStats] = useState({
    NumberOfOpenedJob: 589,
    totalFollowers: 2517
  });

  const [recentJobs, setRecentJobs] = useState([
    {
      JobID: 1,
      JobName: 'UI/UX Designer',
      JobType: 'Fulltime',
      ContractType: 'Fulltime',
      daysRemaining: 27,
      JobStatus: 'Active',
      NumberOfApplicant: 798,
      PostDate: '01/11/2025',
      Location: 'Hà Nội',
      SalaryFrom: 15000000,
      SalaryTo: 25000000
    },
    {
      JobID: 2,
      JobName: 'Senior UX Designer',
      JobType: 'Hybrid',
      ContractType: 'Fulltime',
      daysRemaining: 8,
      JobStatus: 'Active',
      NumberOfApplicant: 185,
      PostDate: '10/11/2025',
      Location: 'TP. Hồ Chí Minh',
      SalaryFrom: 20000000,
      SalaryTo: 35000000
    },
    {
      JobID: 3,
      JobName: 'Tech Support',
      JobType: 'Parttime',
      ContractType: 'Parttime',
      daysRemaining: 4,
      JobStatus: 'Active',
      NumberOfApplicant: 556,
      PostDate: '15/11/2025',
      Location: 'Đà Nẵng',
      SalaryFrom: 10000000,
      SalaryTo: 18000000
    },
    {
      JobID: 4,
      JobName: 'Junior Designer',
      JobType: 'Onsite',
      ContractType: 'Fulltime',
      daysRemaining: 24,
      JobStatus: 'Active',
      NumberOfApplicant: 583,
      PostDate: '05/11/2025',
      Location: 'Hà Nội',
      SalaryFrom: 8000000,
      SalaryTo: 15000000
    },
    {
      JobID: 5,
      JobName: 'Front End Dev',
      JobType: 'Remote',
      ContractType: 'Fulltime',
      daysRemaining: 0,
      JobStatus: 'Đã đóng',
      NumberOfApplicant: 740,
      ExpireDate: '20/11/2025',
      PostDate: '07/11/2025',
      Location: 'TP. Hồ Chí Minh',
      SalaryFrom: 18000000,
      SalaryTo: 30000000
    }
  ]);

  // TODO: Uncomment when API is ready
  // Fetch dashboard data on component mount
  // useEffect(() => {
  //   const fetchDashboardData = async () => {
  //     try {
  //       setLoading(true);
  //       setError(null);

  //       // Fetch stats and jobs in parallel
  //       const [statsData, jobsData] = await Promise.all([
  //         getEmployerStats(employerId),
  //         getEmployerJobs(employerId, { limit: 5 })
  //       ]);

  //       // Update stats
  //       setStats({
  //         openJobs: statsData.openJobs || statsData.NumberOfOpenedJob || 0,
  //         savedCandidates: statsData.savedCandidates || statsData.totalFollowers || 0
  //       });

  //       // Transform jobs data to match UI format
  //       const transformedJobs = jobsData.jobs?.map(job => {
  //         const today = new Date();
  //         const expireDate = new Date(job.ExpireDate);
  //         const postDate = new Date(job.PostDate);
  //         const daysRemaining = Math.ceil((expireDate - today) / (1000 * 60 * 60 * 24));
  //         const isExpired = job.JobStatus === 'Expired' || daysRemaining < 0;

  //         return {
  //           id: job.JobID,
  //           title: job.JobName,
  //           type: job.JobType,
  //           contractType: job.ContractType,
  //           daysRemaining: daysRemaining > 0 ? daysRemaining : 0,
  //           status: isExpired ? 'Expire' : 'Active',
  //           applications: job.NumberOfApplicant || 0,
  //           expired: isExpired ? expireDate.toLocaleDateString('vi-VN') : null,
  //           postDate: postDate.toLocaleDateString('vi-VN'),
  //           location: job.Location,
  //           salary: `${job.SalaryFrom?.toLocaleString()} - ${job.SalaryTo?.toLocaleString()} VNĐ`
  //         };
  //       }) || [];

  //       setRecentJobs(transformedJobs);
  //     } catch (err) {
  //       console.error('Error fetching dashboard data:', err);
  //       setError('Không thể tải dữ liệu. Vui lòng thử lại sau.');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchDashboardData();
  // }, [employerId]);

  // TODO: Uncomment when API is ready
  const handleMarkAsExpired = async (jobId) => {
    // Hardcoded version - update local state only
    const updatedJobs = recentJobs.map(job => 
      job.JobID === jobId ? { ...job, JobStatus: 'Đã đóng', daysRemaining: 0 } : job
    );
    setRecentJobs(updatedJobs);
    setShowJobActions(null);
    alert('Đã đánh dấu tin tuyển dụng hết hạn (chỉ cập nhật local)');

    // API version - uncomment when ready
    // try {
    //   await updateJobStatus(jobId, 'Đã đóng');
    //   // Refresh jobs list
    //   const jobsData = await getEmployerJobs(employerId, { limit: 5 });
    //   const transformedJobs = jobsData.jobs?.map(job => {
    //     const today = new Date();
    //     const expireDate = new Date(job.ExpireDate);
    //     const daysRemaining = Math.ceil((expireDate - today) / (1000 * 60 * 60 * 24));
    //     const isExpired = job.JobStatus === 'Đã đóng' || daysRemaining < 0;

    //     return {
    //       JobID: job.JobID,
    //       JobName: job.JobName,
    //       JobType: job.JobType,
    //       ContractType: job.ContractType,
    //       daysRemaining: daysRemaining > 0 ? daysRemaining : 0,
    //       JobStatus: isExpired ? 'Đã đóng' : 'Active',
    //       NumberOfApplicant: job.NumberOfApplicant || 0,
    //       ExpireDate: isExpired ? new Date(job.ExpireDate).toLocaleDateString('vi-VN') : null,
    //       PostDate: new Date(job.PostDate).toLocaleDateString('vi-VN'),
    //       Location: job.Location,
    //       SalaryFrom: job.SalaryFrom,
    //       SalaryTo: job.SalaryTo
    //     };
    //   }) || [];
    //   setRecentJobs(transformedJobs);
    //   setShowJobActions(null);
    // } catch (err) {
    //   console.error('Error updating job status:', err);
    //   alert('Không thể cập nhật trạng thái tin tuyển dụng');
    // }
  };

  const toggleJobActions = (jobId) => {
    setShowJobActions(showJobActions === jobId ? null : jobId);
  };

  return (
    <div className="employer-dashboard">
      {/* Sidebar */}
      <aside className={`dashboard-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>BẢNG ĐIỀU KHIỂN</h3>
          <button className="close-sidebar" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>
        <nav className="sidebar-menu">
          <Link 
            to="#" 
            className={`menu-item ${activeMenu === 'overview' ? 'active' : ''}`}
            onClick={() => { setActiveMenu('overview'); setSidebarOpen(false); }}
          >
            <LayoutDashboard size={18} />
            <span>Tổng quan</span>
          </Link>
          <Link 
            to="#" 
            className={`menu-item ${activeMenu === 'profile' ? 'active' : ''}`}
            onClick={() => { setActiveMenu('profile'); setSidebarOpen(false); }}
          >
            <User size={18} />
            <span>Hồ sơ công ty</span>
          </Link>
          <Link 
            to="#" 
            className={`menu-item ${activeMenu === 'post-job' ? 'active' : ''}`}
            onClick={() => { setActiveMenu('post-job'); setSidebarOpen(false); }}
          >
            <PlusCircle size={18} />
            <span>Đăng tin</span>
          </Link>
          <Link 
            to="#" 
            className={`menu-item ${activeMenu === 'my-jobs' ? 'active' : ''}`}
            onClick={() => { setActiveMenu('my-jobs'); setSidebarOpen(false); }}
          >
            <Briefcase size={18} />
            <span>Tin đã đăng</span>
          </Link>
          <Link 
            to="#" 
            className={`menu-item ${activeMenu === 'saved' ? 'active' : ''}`}
            onClick={() => { setActiveMenu('saved'); setSidebarOpen(false); }}
          >
            <Bookmark size={18} />
            <span>Ứng viên</span>
          </Link>
          <Link 
            to="#" 
            className={`menu-item ${activeMenu === 'billing' ? 'active' : ''}`}
            onClick={() => { setActiveMenu('billing'); setSidebarOpen(false); }}
          >
            <CreditCard size={18} />
            <span>Thanh toán</span>
          </Link>
          <Link 
            to="#" 
            className={`menu-item ${activeMenu === 'companies' ? 'active' : ''}`}
            onClick={() => { setActiveMenu('companies'); setSidebarOpen(false); }}
          >
            <Building2 size={18} />
            <span>Công ty</span>
          </Link>
          <Link 
            to="#" 
            className={`menu-item ${activeMenu === 'settings' ? 'active' : ''}`}
            onClick={() => { setActiveMenu('settings'); setSidebarOpen(false); }}
          >
            <Settings size={18} />
            <span>Cài đặt</span>
          </Link>
        </nav>
        <button className="logout-btn">
          <LogOut size={18} />
          <span>Đăng xuất</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-content">
            <div className="header-left">
              <button className="menu-toggle" onClick={() => setSidebarOpen(true)}>
                <Menu size={24} />
              </button>
            </div>
            <div className="header-right">
              <button className="notification-btn">
                <Bell size={20} />
                <span className="notification-badge">1</span>
              </button>
              <button 
                className="post-job-btn"
                onClick={() => setActiveMenu('post-job')}
              >
                <PlusCircle size={18} />
                <span>Đăng tin</span>
              </button>
              <div className="user-profile">
                <User size={20} />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          {loading ? (
            <div className="loading-state">
              <p>Đang tải dữ liệu...</p>
            </div>
          ) : error ? (
            <div className="error-state">
              <p>{error}</p>
              <button onClick={() => window.location.reload()}>Thử lại</button>
            </div>
          ) : activeMenu === 'post-job' ? (
            <PostJob />
          ) : (
            <>
              <div className="greeting">
                <h1>Xin chào, Instagram</h1>
                <p>Đây là hoạt động và ứng tuyển hàng ngày của bạn</p>
              </div>

              {/* Stats Cards */}
              <div className="stats-cards">
            <div className="stat-card">
              <div className="stat-icon">
                <Briefcase size={28} />
              </div>
              <div className="stat-info">
                <h3>{stats.NumberOfOpenedJob}</h3>
                <p>Tin đang tuyển</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <Users size={28} />
              </div>
              <div className="stat-info">
                <h3>{stats.totalFollowers}</h3>
                <p>Ứng viên đã lưu</p>
              </div>
            </div>
          </div>

          {/* Recently Posted Jobs */}
          <div className="recent-jobs-section">
            <div className="section-header">
              <h2>Tin tuyển dụng gần đây</h2>
              <Link to="#" className="view-all">
                Xem tất cả <ChevronRight size={16} />
              </Link>
            </div>

            <div className="jobs-table">
              <div className="table-header">
                <div className="col-job">TIN TUYỂN DỤNG</div>
                <div className="col-status">TRẠNG THÁI</div>
                <div className="col-applications">ỨNG TUYỂN</div>
                <div className="col-actions">HÀNH ĐỘNG</div>
              </div>

              {recentJobs.map((job) => (
                <div key={job.JobID} className={`table-row ${job.JobStatus === 'Đã đóng' ? 'expired' : ''}`}>
                  <div className="col-job">
                    <h4>{job.JobName}</h4>
                    <p className="job-meta">
                      {job.JobType} • {job.JobStatus === 'Đã đóng' ? job.ExpireDate : `${job.daysRemaining} ngày còn lại`}
                    </p>
                  </div>
                  <div className="col-status">
                    <span className={`status-badge ${job.JobStatus === 'Active' ? 'active' : 'expired'}`}>
                      {job.JobStatus === 'Active' ? (
                        <><CheckCircle2 size={14} /> Đang hoạt động</>
                      ) : (
                        <><XCircle size={14} /> Hết hạn</>
                      )}
                    </span>
                  </div>
                  <div className="col-applications">
                    <span className="applications-count">
                      <Users size={16} /> {job.NumberOfApplicant} Ứng tuyển
                    </span>
                  </div>
                  <div className="col-actions">
                    <button 
                      className="view-applications-btn"
                      onClick={() => {}}
                    >
                      Xem ứng tuyển
                    </button>
                    <div className="actions-menu">
                      <button 
                        className="more-btn"
                        onClick={() => toggleJobActions(job.JobID)}
                      >
                        <MoreVertical size={16} />
                      </button>
                      {showJobActions === job.JobID && (
                        <div className="dropdown-menu">
                          <button className="dropdown-item">
                            <Rocket size={14} /> Quảng bá
                          </button>
                          <button className="dropdown-item">
                            <Eye size={14} /> Chi tiết
                          </button>
                          <button 
                            className="dropdown-item"
                            onClick={() => handleMarkAsExpired(job.JobID)}
                          >
                            <Ban size={14} /> Hết hạn
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
            </>
          )}
        </div>

        {/* Footer */}
        <footer className="dashboard-footer">
          <p>© 2021 Jobpilot - Job Board. All rights Reserved</p>
        </footer>
      </main>
    </div>
  );
};

export default EmployerDashboard;
