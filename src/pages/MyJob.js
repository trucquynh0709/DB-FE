import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, MapPin, DollarSign, Calendar, Eye, Trash2, Edit, Users } from 'lucide-react';
import { getEmployerJobs, deleteJob as deleteJobAPI } from '../services/employerService';
import EmployerLayout from '../components/EmployerLayout';
import '../styles/MyJob.css';

const MyJob = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all'); // all, active, expired
  const [error, setError] = useState(null);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      // Get current employer ID (default to 5 for testing)
      const currentEmployerId = localStorage.getItem('employerId') || '11';
      
      console.log('Loading jobs for employer:', currentEmployerId);
      
      // Call API to get jobs from backend
      const response = await getEmployerJobs(currentEmployerId, {
        page: 1,
        limit: 100, // Get all jobs
        status: 'all'
      });
      
      console.log('API Response:', response);
      
      if (response.success) {
        const jobsData = response.data?.jobs || [];
        console.log('Jobs loaded:', jobsData);
        setJobs(jobsData);
      } else {
        throw new Error(response.message || 'Failed to load jobs');
      }
    } catch (error) {
      console.error('Error loading jobs:', error);
      setError(error.message || 'Không thể tải danh sách tin đăng');
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tin tuyển dụng này?')) {
      try {
        // Call API to delete job
        const response = await deleteJobAPI(jobId);
        
        if (response.success) {
          // Update local state after successful deletion
          const updatedEmployerJobs = jobs.filter(job => job.JobID !== jobId);
          setJobs(updatedEmployerJobs);
          
          alert('Đã xóa tin tuyển dụng thành công!');
        } else {
          throw new Error(response.message || 'Không thể xóa tin tuyển dụng');
        }
      } catch (error) {
        console.error('Error deleting job:', error);
        alert('Lỗi: ' + (error.message || 'Không thể xóa tin tuyển dụng'));
      }
    }
  };

  const handleViewJob = (jobId) => {
    navigate(`/jobs/${jobId}`);
  };

  const handleEditJob = (jobId) => {
    // TODO: Implement edit functionality
    alert('Tính năng chỉnh sửa đang được phát triển!');
  };

  // Format VND
  const formatVND = (amount) => {
    if (!amount) return '0';
    const millions = amount / 1000000;
    if (millions >= 1) {
      return `${millions.toFixed(0)} triệu`;
    }
    return `${(amount / 1000).toFixed(0)}k`;
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  // Check if job is expired
  const isJobExpired = (expireDate) => {
    if (!expireDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to midnight for date comparison
    const expire = new Date(expireDate);
    expire.setHours(0, 0, 0, 0);
    return expire < today;
  };

  // Check if job is active (not expired and status is Open/Active)
  const isJobActive = (job) => {
    const notExpired = !isJobExpired(job.ExpireDate);
    const statusOpen = job.JobStatus === 'Open' || job.JobStatus === 'Active';
    return notExpired && statusOpen;
  };

  // Filter jobs based on active tab
  const filteredJobs = jobs.filter(job => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return isJobActive(job);
    if (activeTab === 'expired') return !isJobActive(job);
    return true;
  });

  return (
    <EmployerLayout>
      <div className="my-job-container">
      {/* Header */}
      <div className="my-job-header">
        <div className="header-content">
          <h1>Tin đã đăng</h1>
        </div>
        <button className="btn-post-new" onClick={() => navigate('/employer/post-job')}>
          + Đăng tin mới
        </button>
      </div>

      {/* Tabs */}
      <div className="job-tabs">
        <button 
          className={`tab ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          Tất cả ({jobs.length})
        </button>
        <button 
          className={`tab ${activeTab === 'active' ? 'active' : ''}`}
          onClick={() => setActiveTab('active')}
        >
          Đang hoạt động ({jobs.filter(j => isJobActive(j)).length})
        </button>
        <button 
          className={`tab ${activeTab === 'expired' ? 'active' : ''}`}
          onClick={() => setActiveTab('expired')}
        >
          Đã hết hạn ({jobs.filter(j => !isJobActive(j)).length})
        </button>
      </div>

      {/* Jobs List */}
      <div className="jobs-list">
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Đang tải tin đăng...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="empty-state">
            <Briefcase size={64} color="#d1d5db" />
            <h3>Chưa có tin tuyển dụng nào</h3>
            <p>Bắt đầu đăng tin tuyển dụng đầu tiên của bạn</p>
            <button className="btn-post-first" onClick={() => navigate('/employer/post-job')}>
              Đăng tin ngay
            </button>
          </div>
        ) : (
          filteredJobs.map(job => (
            <div key={job.JobID} className={`job-card ${!isJobActive(job) ? 'expired' : ''}`}>
              <div className="job-card-header">
                <div className="job-title-section">
                  <h3 className="job-title">{job.JobName}</h3>
                  <div className="job-meta">
                    <span className="meta-item">
                      <MapPin size={16} />
                      {job.Location}
                    </span>
                    <span className="meta-item">
                      <DollarSign size={16} />
                      {formatVND(job.SalaryFrom)} - {formatVND(job.SalaryTo)} VNĐ
                    </span>
                    <span className="meta-item">
                      <Calendar size={16} />
                      Hết hạn: {formatDate(job.ExpireDate)}
                    </span>
                  </div>
                </div>
                <div className="job-badges">
                  <span className={`badge ${job.JobType?.toLowerCase()}`}>
                    {job.JobType === 'Onsite' ? 'Tại văn phòng' : 
                     job.JobType === 'Remote' ? 'Từ xa' : 
                     job.JobType === 'Hybrid' ? 'Kết hợp' : job.JobType}
                  </span>
                  <span className={`badge ${job.ContractType?.toLowerCase()}`}>
                    {job.ContractType === 'Fulltime' ? 'Toàn thời gian' :
                     job.ContractType === 'Parttime' ? 'Bán thời gian' :
                     job.ContractType === 'Internship' ? 'Thực tập' : 
                     job.ContractType === 'Freelance' ? 'Tự do' : job.ContractType}
                  </span>
                  {!isJobActive(job) && (
                    <span className="badge expired-badge">
                      {isJobExpired(job.ExpireDate) ? 'Đã hết hạn' : 
                       (job.JobStatus === 'Closed' || job.JobStatus === 'Đã đóng') ? 'Đã đóng' : 'Không hoạt động'}
                    </span>
                  )}
                </div>
              </div>

              <div className="job-card-body">
                <p className="job-description">{job.JD}</p>
                
                <div className="job-stats">
                  <div className="stat-item">
                    <Users size={18} />
                    <span>{job.NumberOfApplicant || 0} ứng viên</span>
                  </div>
                  <div className="stat-item">
                    <Briefcase size={18} />
                    <span>Cấp bậc: {job.Level}</span>
                  </div>
                  <div className="stat-item">
                    <Calendar size={18} />
                    <span>Đăng: {formatDate(job.PostDate)}</span>
                  </div>
                </div>

                {job.skills && job.skills.length > 0 && (
                  <div className="job-skills">
                    <strong>Kỹ năng:</strong>
                    <div className="skills-list">
                      {job.skills.map((skill, index) => (
                        <span key={index} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="job-card-footer">
                <button className="btn-action view" onClick={() => handleViewJob(job.JobID)}>
                  <Eye size={18} />
                  Xem chi tiết
                </button>
                <button className="btn-action edit" onClick={() => handleEditJob(job.JobID)}>
                  <Edit size={18} />
                  Chỉnh sửa
                </button>
                <button className="btn-action delete" onClick={() => handleDeleteJob(job.JobID)}>
                  <Trash2 size={18} />
                  Xóa
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    </EmployerLayout>
  );
};

export default MyJob;