import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight,
  Users,
  CheckCircle2,
  XCircle,
  MoreVertical,
  Rocket,
  Eye,
  Ban,
  Briefcase
} from 'lucide-react';
import EmployerLayout from '../components/EmployerLayout';
// TODO: Uncomment when API is ready
// import { 
//   getEmployerStats, 
//   getEmployerJobs,
//   updateJobStatus 
// } from '../services/employerService';
import '../styles/EmployerDashboard.css';

const EmployerDashboard = () => {
  const [showJobActions, setShowJobActions] = useState(null);
  const [loading, setLoading] = useState(false); // Set to false to show hardcoded data
  const [error, setError] = useState(null);

  // Get employerId from localStorage or context (you should implement proper auth)
  const employerId = parseInt(localStorage.getItem('employerId') || '1'); // Default for testing

  // Load jobs from localStorage (same as MyJob)
  const [recentJobs, setRecentJobs] = useState([]);

  useEffect(() => {
    loadEmployerJobs();
  }, []);

  const loadEmployerJobs = () => {
    try {
      // Load all jobs from localStorage
      const allJobs = JSON.parse(localStorage.getItem('postedJobs') || '[]');
      
      // Filter jobs by current employer and get last 5
      const employerJobs = allJobs
        .filter(job => Number(job.EmployerID) === Number(employerId))
        .sort((a, b) => new Date(b.createdAt || b.PostDate) - new Date(a.createdAt || a.PostDate))
        .slice(0, 5);
      
      setRecentJobs(employerJobs);
      
      // Update stats
      const activeJobs = employerJobs.filter(job => job.JobStatus === 'Active').length;
      setStats(prev => ({
        ...prev,
        NumberOfOpenedJob: activeJobs
      }));
    } catch (error) {
      console.error('Error loading employer jobs:', error);
    }
  };

  // Hardcoded data - replace with API when ready
  // Schema: employer table có NumberOfOpenedJob, follow table cho savedCandidates
  const [stats, setStats] = useState({
    NumberOfOpenedJob: 0,
    totalFollowers: 2517
  });

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
    <EmployerLayout>
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
              <Link to="/employer/my-jobs" className="view-all">
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
      </EmployerLayout>
    );
  };

export default EmployerDashboard;