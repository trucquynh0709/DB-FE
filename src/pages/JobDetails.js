import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchJobById } from '../services/jobService';
import '../styles/JobDetails.css';

const JobDetails = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadJobDetails = async () => {
      try {
        setLoading(true);
        
        // Hardcoded data for testing (remove when backend is ready)
        // Data structure matches actual database schema
        const hardcodedJob = {
          // From job table
          JobID: 1,
          JobName: "Senior UX Designer",
          JD: `Velistar is a Shopify Plus agency, and we partner with brands to help them grow, we also do the same with our people!

Here at Velistar, we don't just make websites, we create exceptional digital experiences that consumers love. Our team of designers, strategists, and creators work together to push brands to the next level. From Platform Migration, User Experience & User Interface Design, to Digital Marketing, we have a proven track record in delivering outstanding eCommerce solutions and driving sales for our clients.

The role will involve translating project specifications into clean, test-driven, easily maintainable code. You will work with the Project and Development teams as well as with the Technical Director, adhering closely to project plans and delivering work that meets functional & non-functional requirements. You will have the opportunity to create new, innovative, secure and scalable features for our clients on the Shopify platform.`,
          JobType: "Onsite",           // From job table
          ContractType: "Fulltime",    // From job table
          Level: "Entry Level",        // From job table
          Quantity: 5,                 // From job table
          SalaryFrom: 100000,          // From job table (INT)
          SalaryTo: 120000,            // From job table (INT)
          RequiredExpYear: 3,          // From job table
          Location: "Dhaka, Bangladesh", // From job table
          PostDate: "2024-11-14",      // From job table (DATE)
          ExpireDate: "2024-12-14",    // From job table (DATE)
          JobStatus: "published",      // From job table
          NumberOfApplicant: 25,       // From job table (INT UNSIGNED)
          EmployerID: 100,             // From job table (FK to employer)
          
          // From company table (joined via employer)
          company: {
            CompanyID: 1,
            CName: "Facebook",                    // Actual field name in DB
            CNationality: "USA",                  // Actual field name in DB
            Website: "https://facebook.com",
            Industry: "Technology",
            CompanySize: 5000,                    // MEDIUMINT in DB
            Logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png",
            Description: "Leading social media platform",
            TaxNumber: 123456789,                 // INT in DB
            EmployerID: 100
          },
          
          // From job_category table via 'in' table
          categories: [
            {
              JCName: "Back-end",
              Specialty: "Backend Development"    // Actual field name in DB
            },
            {
              JCName: "PHP",
              Specialty: "PHP Programming"
            },
            {
              JCName: "Laravel",
              Specialty: "Laravel Framework"
            },
            {
              JCName: "Development",
              Specialty: "Software Development"
            },
            {
              JCName: "Front-end",
              Specialty: "Frontend Development"
            }
          ],
          
          // From skill table via 'require' table
          // Note: require table only has JobID and SkillName (no level or required flag)
          requiredSkills: [
            {
              SkillName: "UX Design",
              Description: "User Experience Design skills"
            },
            {
              SkillName: "Figma",
              Description: "Figma design tool"
            },
            {
              SkillName: "Communication",
              Description: "Communication skills"
            },
            {
              SkillName: "Adobe XD",
              Description: "Adobe XD tool"
            }
          ],
          
          // From user table (employer info)
          employer: {
            ID: 100,
            Username: "hr_facebook",
            Email: "hr@facebook.com",
            FName: "John",
            LName: "Doe",
            PhoneNumber: "0123456789",  // CHAR(10) in DB
            Address: "123 Tech Street, Silicon Valley",
            Profile_Picture: "https://via.placeholder.com/100",
            Bdate: "1990-01-01"
          }
        };

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Use hardcoded data
        setJob(hardcodedJob);
        
        // Uncomment below when backend is ready
        // const response = await fetchJobById(jobId);
        // if (response.success) {
        //   setJob(response.data);
        // } else {
        //   setError('Failed to load job details');
        // }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadJobDetails();
  }, [jobId]);

  if (loading) {
    return (
      <div className="job-details-container">
        <div className="loading">Đang tải...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="job-details-container">
        <div className="error">Lỗi: {error}</div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="job-details-container">
        <div className="not-found">Không tìm thấy công việc</div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const formatSalary = (salaryFrom, salaryTo) => {
    if (!salaryFrom && !salaryTo) return 'Negotiable';
    if (!salaryTo) return `$${salaryFrom.toLocaleString()}+`;
    return `$${salaryFrom.toLocaleString()} - $${salaryTo.toLocaleString()}`;
  };

  const getContractTypeLabel = (type) => {
    switch (type) {
      case 'Fulltime': return 'Toàn thời gian';
      case 'Parttime': return 'Bán thời gian';
      case 'Contract': return 'Hợp đồng';
      case 'Internship': return 'Thực tập';
      default: return type;
    }
  };

  const getJobTypeLabel = (type) => {
    switch (type) {
      case 'Onsite': return 'Tại văn phòng';
      case 'Remote': return 'Từ xa';
      case 'Hybrid': return 'Kết hợp';
      default: return type;
    }
  };

  const copyJobLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="job-details-container">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span onClick={() => navigate('/')} className="breadcrumb-link">Trang chủ</span>
        <span className="breadcrumb-separator">/</span>
        <span onClick={() => navigate('/find-job')} className="breadcrumb-link">Tìm việc</span>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">Chi tiết công việc</span>
      </div>

      {/* Job Header */}
      <div className="job-header">
        <div className="job-header-left">
          <div className="company-logo">
            <img 
              src={job.company?.Logo || 'https://via.placeholder.com/100'} 
              alt={job.company?.CName || 'Company'} 
            />
          </div>
          <div className="job-header-info">
            <h1 className="job-title">{job.JobName}</h1>
            <p className="company-name">at {job.company?.CName || 'Company'}</p>
            <div className="job-badges">
              <span className={`badge badge-${job.ContractType?.toLowerCase()}`}>
                {getContractTypeLabel(job.ContractType)}
              </span>
            </div>
          </div>
        </div>
        <div className="job-header-right">
          <button className="btn-bookmark">
            <i className="icon-bookmark"></i>
          </button>
          <button className="btn-apply" onClick={() => navigate(`/jobs/${jobId}/apply`)}>
            Ứng tuyển ngay
            <i className="icon-arrow-right"></i>
          </button>
        </div>
      </div>

      {/* Job Main Content */}
      <div className="job-main-content">
        {/* Left Column - Job Description */}
        <div className="job-left-column">
          <section className="job-section">
            <h2 className="section-title">Mô tả công việc</h2>
            <div className="job-description">
              {job.JD}
            </div>
          </section>

          {/* Required Skills */}
          {job.requiredSkills && job.requiredSkills.length > 0 && (
            <section className="job-section">
              <h2 className="section-title">Kỹ năng yêu cầu</h2>
              <div className="skills-list">
                {job.requiredSkills.map((skill, index) => (
                  <div key={index} className="skill-item">
                    <div className="skill-name">
                      {skill.SkillName}
                    </div>
                    <div className="skill-description">{skill.Description}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Share this job */}
          <section className="job-section">
            <h2 className="section-title">Chia sẻ công việc:</h2>
            <div className="share-buttons">
              <button onClick={copyJobLink} className="share-btn share-copy">
                <i className="icon-link"></i> Sao chép liên kết
              </button>
              <button className="share-btn share-facebook">
                <i className="icon-facebook"></i>
              </button>
              <button className="share-btn share-twitter">
                <i className="icon-twitter"></i>
              </button>
              <button className="share-btn share-email">
                <i className="icon-email"></i>
              </button>
            </div>
          </section>
 
          {/* Job tags */}
          {job.categories && job.categories.length > 0 && (
            <section className="job-section">
              <h2 className="section-title">Tag:</h2>
              <div className="job-tags">
                {job.categories.map((category, index) => (
                  <span key={index} className="tag">{category.JCName}</span>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column - Job Overview */}
        <div className="job-right-column">
          {/* Salary & Location */}
          <div className="job-info-cards">
            <div className="info-card">
              <div className="info-icon">💰</div>
              <div className="info-content">
                <div className="info-label">Mức lương (USD)</div>
                <div className="info-value">{formatSalary(job.SalaryFrom, job.SalaryTo)}</div>
                <div className="info-sublabel">Lương theo năm</div>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon">📍</div>
              <div className="info-content">
                <div className="info-label">Địa điểm làm việc</div>
                <div className="info-value">{job.Location}</div>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon">💼</div>
              <div className="info-content">
                <div className="info-label">Hình thức làm việc</div>
                <div className="info-value">{getJobTypeLabel(job.JobType)}</div>
              </div>
            </div>
          </div>

          {/* Job Overview */}
          <section className="job-overview">
            <h2 className="section-title">Tổng quan công việc</h2>
            <div className="overview-items">
              <div className="overview-item">
                <div className="overview-icon">📅</div>
                <div className="overview-content">
                  <div className="overview-label">NGÀY ĐĂNG:</div>
                  <div className="overview-value">{formatDate(job.PostDate)}</div>
                </div>
              </div>
              <div className="overview-item">
                <div className="overview-icon">⏰</div>
                <div className="overview-content">
                  <div className="overview-label">HẠN NỘP:</div>
                  <div className="overview-value">{formatDate(job.ExpireDate)}</div>
                </div>
              </div>
              <div className="overview-item">
                <div className="overview-icon">📊</div>
                <div className="overview-content">
                  <div className="overview-label">CẤP BẬC:</div>
                  <div className="overview-value">{job.Level}</div>
                </div>
              </div>
              <div className="overview-item">
                <div className="overview-icon">📄</div>
                <div className="overview-content">
                  <div className="overview-label">KINH NGHIỆM</div>
                  <div className="overview-value">{job.RequireExpYear} Năm</div>
                </div>
              </div>
              <div className="overview-item">
                <div className="overview-icon">🎓</div>
                <div className="overview-content">
                  <div className="overview-label">HỌC VẤN</div>
                  <div className="overview-value">Tốt nghiệp</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
