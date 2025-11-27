import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import '../styles/FindJobPage.css';
import { 
  Briefcase,
  MapPin, 
  Clock,
} from 'lucide-react';

// SVG Icons components
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"></circle>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35"></path>
  </svg>
);

// const MapPinIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path>
//     <circle cx="12" cy="10" r="3"></circle>
//   </svg>
// );

const FilterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
  </svg>
);

const BookmarkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
  </svg>
);

const BriefcaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
    <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"></path>
  </svg>
);

// Hàm ngăn scroll khi dùng wheel trên range slider - Di chuyển ra ngoài component
const preventWheelScroll = (e) => {
  e.preventDefault();
};

// Component FilterSidebar - Tách ra ngoài để tối ưu performance
const FilterSidebar = ({ 
  showFilters, 
  setShowFilters, 
  filters, 
  toggleFilter, 
  handleSalaryRangeChange,
  setQuickSalaryRange,
  applyFilters, 
  clearFilters,
  searchTerm,
  setSearchTerm,
  location,
  setLocation,
  hasFilterChanges
}) => {
  // Tính toán % để vẽ thanh màu xanh
  const maxLimit = 200000;
  const getPercent = (value) => Math.round(((value) / maxLimit) * 100);
  const minPercent = getPercent(filters.salaryRange.min);
  const maxPercent = getPercent(filters.salaryRange.max);

  // Kiểm tra salary range có hợp lệ không
  const isSalaryRangeValid = () => {
    if (filters.salaryRange.max === 0) return true; // Chưa điền thì OK
    return filters.salaryRange.min < filters.salaryRange.max;
  };

  // Kiểm tra có thể apply không
  const canApply = hasFilterChanges && isSalaryRangeValid();

  // Helper render Active Filter Tag
  const renderActiveTag = (label, onRemove, prefix = '') => (
    <div className="filter-tag" key={label}>
      {prefix && <span>{prefix}</span>}
      {label}
      <span className="remove-tag" onClick={onRemove}>×</span>
    </div>
  );

  return (
    <div className={`filter-sidebar ${showFilters ? 'show' : ''}`}>
      {/* Header cố định ở trên */}
      <div className="filter-header">
        <h3>Bộ lọc</h3>
        <button 
          className="close-filters"
          onClick={() => setShowFilters(false)}
        >
          ×
        </button>
      </div>

      {/* Vùng cuộn chứa tất cả các filter sections */}
      <div className="filter-scroll-area">
        
        {/* --- 1. ACTIVE FILTERS SECTION --- */}
        {(searchTerm || location || filters.industry.length > 0 || filters.jobType.length > 0 || filters.level.length > 0) && (
          <div className="active-filters-section">
            <div className="active-filters-header">
              <span>Bộ lọc đang áp dụng:</span>
            </div>
            <div className="active-tags">
              {searchTerm && renderActiveTag(searchTerm, () => setSearchTerm(''), 'Tìm kiếm:')}
              {location && renderActiveTag(location, () => setLocation(''), 'Vị trí:')}
              {filters.industry.map(item => renderActiveTag(item, () => toggleFilter('industry', item)))}
              {filters.jobType.map(item => renderActiveTag(item, () => toggleFilter('jobType', item)))}
              {filters.level.map(item => renderActiveTag(item, () => toggleFilter('level', item)))}
            </div>
          </div>
        )}
        
        <div className="filter-section">
          <h4>Ngành nghề</h4>
          <div className="filter-options">
            {['Development', 'Business', 'Finance & Accounting', 'IT & Software', 'Office Productivity', 'Personal Development', 'Design', 'Marketing', 'Photography & Video'].map(industry => (
              <label key={industry} className="filter-option">
                <input 
                  type="checkbox" 
                  checked={filters.industry.includes(industry)}
                  onChange={() => toggleFilter('industry', industry)}
                />
                <span className="checkmark"></span>
                <span>{industry}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <h4>Hình thức làm việc</h4>
          <div className="filter-options">
            {[
              { value: 'Onsite', label: 'Tại văn phòng' },
              { value: 'Remote', label: 'Làm việc từ xa' },
              { value: 'Hybrid', label: 'Kết hợp' }
            ].map(type => (
              <label key={type.value} className="filter-option">
                <input 
                  type="checkbox" 
                  checked={filters.jobType.includes(type.value)}
                  onChange={() => toggleFilter('jobType', type.value)}
                />
                <span className="checkmark"></span>
                <span>{type.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <h4>Loại hợp đồng</h4>
          <div className="filter-options">
            {[
              { value: 'Fulltime', label: 'Toàn thời gian' },
              { value: 'Parttime', label: 'Bán thời gian' },
              { value: 'Internship', label: 'Thực tập' },
              { value: 'Contract', label: 'Theo hợp đồng' }
            ].map(type => (
              <label key={type.value} className="filter-option">
                <input 
                  type="checkbox" 
                  checked={filters.contractType.includes(type.value)}
                  onChange={() => toggleFilter('contractType', type.value)}
                />
                <span className="checkmark"></span>
                <span>{type.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <h4>Cấp độ kinh nghiệm</h4>
          <div className="filter-options">
            {[
              { value: 'Fresher', label: 'Mới tốt nghiệp' },
              { value: 'Junior', label: 'Nhân viên' },
              { value: 'Mid', label: 'Trung cấp' },
              { value: 'Senior', label: 'Cao cấp' },
              { value: 'Manager', label: 'Quản lý' }
            ].map(level => (
              <label key={level.value} className="filter-option">
                <input 
                  type="checkbox" 
                  checked={filters.level.includes(level.value)}
                  onChange={() => toggleFilter('level', level.value)}
                />
                <span className="checkmark"></span>
                <span>{level.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Salary Range Section */}
        <div className="filter-section">
          <h4>Mức lương (năm)</h4>
          
          {/* Quick Select Buttons */}
          <div className="salary-quick-select">
            <button 
              className="quick-btn"
              onClick={() => setQuickSalaryRange(0, 30000)}
            >
              &lt; $30k
            </button>
            <button 
              className="quick-btn"
              onClick={() => setQuickSalaryRange(30000, 50000)}
            >
              $30k - $50k
            </button>
            <button 
              className="quick-btn"
              onClick={() => setQuickSalaryRange(50000, 80000)}
            >
              $50k - $80k
            </button>
            <button 
              className="quick-btn"
              onClick={() => setQuickSalaryRange(80000, 120000)}
            >
              $80k - $120k
            </button>
            <button 
              className="quick-btn"
              onClick={() => setQuickSalaryRange(120000, 200000)}
            >
              $120k+
            </button>
          </div>

          {/* Custom Range Inputs */}
          <div className="salary-simple-container">
            <div className="salary-simple-inputs">
              <input 
                type="number" 
                min="0"
                placeholder="Tối thiểu"
                value={filters.salaryRange.min || ''}
                onChange={(e) => handleSalaryRangeChange('min', e.target.value)}
                className="salary-simple-input"
              />
              <span className="salary-separator">-</span>
              <input 
                type="number" 
                min="0"
                placeholder="Tối đa"
                value={filters.salaryRange.max || ''}
                onChange={(e) => handleSalaryRangeChange('max', e.target.value)}
                className="salary-simple-input"
              />
              <span className="salary-unit">USD</span>
            </div>
          </div>
        </div>
        
        {/* Khoảng trống ở cuối */}
        <div style={{ height: '40px' }}></div>

      </div>
      {/* Kết thúc filter-scroll-area */}

      {/* Footer actions cố định ở dưới */}
      <div className="filter-actions">
        <button 
          className="btn-apply" 
          onClick={applyFilters}
          disabled={!canApply}
          style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}
        >
          <span>Áp dụng bộ lọc</span>
        </button>
        <button className="btn-clear" onClick={clearFilters}>
          Xóa tất cả
        </button>
      </div>
    </div>
  );
};

const FindJobPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [jobData, setJobData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Filter states
  const [showFilters, setShowFilters] = useState(false);
  const initialFilters = {
    industry: [],
    jobType: [],
    contractType: [],
    level: [],
    salaryRange: {
      min: 0,
      max: 200000
    },
    remoteJob: false
  };
  const [filters, setFilters] = useState(initialFilters);
  const [hasFilterChanges, setHasFilterChanges] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hoveredJob, setHoveredJob] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [jobDetails, setJobDetails] = useState({});
  const [tooltipLoading, setTooltipLoading] = useState(false);
  const [bookmarkedJobs, setBookmarkedJobs] = useState(new Set());
  const [loadingJobIds, setLoadingJobIds] = useState(new Set());
  
  // Ref để lưu scroll position
  const scrollPositionRef = useRef(0);

  // API endpoint
  const API_BASE_URL = 'http://localhost:3001/api';

  // Fetch job details from backend
  const fetchJobDetails = async (jobId) => {
    if (jobDetails[jobId]) {
      return jobDetails[jobId];
    }

    if (loadingJobIds.has(jobId)) {
      return;
    }

    setLoadingJobIds(prev => new Set([...prev, jobId]));
    try {
      const response = await fetch(`${API_BASE_URL}/jobs/${jobId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      setJobDetails(prev => ({
        ...prev,
        [jobId]: data
      }));
      
      return data;
      
    } catch (err) {
      console.error('Error fetching job details:', err);
      
      const fallbackData = {
        id: jobId,
        description: "Quản lý, đào tạo và theo dõi hiệu quả bán hàng của nhóm và của từng NVKD; Hoàn thành chỉ tiêu bán hàng do BLD giao; Tham gia trực tiếp tìm kiếm, tư vấn, hỗ trợ, chăm sóc khách hàng về thông tin các sản phẩm Bất động sản cao cấp của Công ty; Xây dựng hình ảnh và tác phong chuyên nghiệp cho Phòng Kinh doanh; Tuyển dung, đào tạo, hướng dẫn, hỗ trợ đội ngũ kinh doanh để đảm bảo đầy đủ nguồn nhân lực cho kế hoạch bán hàng.",
        requirements: [
          "Tốt nghiệp Đại học các chuyên ngành liên quan",
          "Ít nhất 3 năm kinh nghiệm trong lĩnh vực bán hàng/kinh doanh",
          "Kỹ năng giao tiếp và thuyết phục tốt",
          "Khả năng làm việc nhóm và quản lý đội nhóm"
        ],
        benefits: [
          "Lương cơ bản + thưởng theo KPI",
          "Bảo hiểm xã hội đầy đủ",
          "Môi trường làm việc chuyên nghiệp",
          "Cơ hội thăng tiến và phát triển"
        ],
        applicationDeadline: "Còn 29 ngày",
        experience: "3 năm",
        workLocation: "Hồ Chí Minh & 2 nơi khác",
        skills: ["JavaScript", "React", "Node.js", "Database Management"],
        contactEmail: "hr@company.com",
        applicationLink: "/jobs/apply/" + jobId
      };
      
      setJobDetails(prev => ({
        ...prev,
        [jobId]: fallbackData
      }));
      
      return fallbackData;
    } finally {
      setLoadingJobIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(jobId);
        return newSet;
      });
    }
  };

  // Handle filter changes - Tối ưu với useCallback
  const toggleFilter = useCallback((filterType, value) => {
    setFilters(prev => {
      const currentArray = prev[filterType];
      const isSelected = currentArray.includes(value);
      
      return {
        ...prev,
        [filterType]: isSelected
          ? currentArray.filter(item => item !== value)
          : [...currentArray, value]
      };
    });
    setHasFilterChanges(true);
  }, []);

  const handleSalaryRangeChange = useCallback((type, value) => {
    setFilters(prev => ({
      ...prev,
      salaryRange: {
        ...prev.salaryRange,
        [type]: parseInt(value) || 0
      }
    }));
    setHasFilterChanges(true);
  }, []);

  const setQuickSalaryRange = useCallback((min, max) => {
    setFilters(prev => ({
      ...prev,
      salaryRange: { min, max }
    }));
    setHasFilterChanges(true);
  }, []);

  const handlePresetClick = useCallback((min, max) => {
    setFilters(prev => ({
      ...prev,
      salaryRange: { min, max }
    }));
  }, []);

  const applyFilters = useCallback(() => {
    // Validate salary range
    if (filters.salaryRange.min >= filters.salaryRange.max && filters.salaryRange.max > 0) {
      alert('Khoảng lương tối đa phải lớn hơn khoảng lương tối thiểu!');
      return;
    }
    
    setCurrentPage(1);
    setShowFilters(false);
    setHasFilterChanges(false);
    fetchJobs({ 
      search: searchTerm, 
      location: location,
      ...filters 
    });
  }, [searchTerm, location, filters]);

  const clearFilters = useCallback(() => {
    setFilters(initialFilters);
    setCurrentPage(1);
    setHasFilterChanges(false);
    fetchJobs({ search: searchTerm, location: location });
  }, [searchTerm, location]);

  // Fetch jobs from backend
  const fetchJobs = async (searchParams = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      // Xây dựng query parameters
      const queryParams = new URLSearchParams({
        page: currentPage,
        limit: 9, // số jobs per page
        ...searchParams
      });
      
      if (searchTerm) queryParams.append('search', searchTerm);
      if (location) queryParams.append('location', location);

      const response = await fetch(`${API_BASE_URL}/jobs?${queryParams}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      setJobData(data.jobs || []);
      setTotalPages(data.totalPages || 1);
      
    } catch (err) {
      setError('Không thể tải dữ liệu công việc. Vui lòng thử lại.');
      console.error('Error fetching jobs:', err);
      
      // Fallback data nếu API lỗi - tổng cộng 18 jobs để test pagination
      let allFallbackJobs = [
        { JobID: 1, JobName: 'Technical Support Specialist', JobType: 'Parttime', ContractType: 'Parttime', Salary: '$20,000 - $25,000', CompanyName: 'Google Inc.', CompanyLogo: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg', Location: 'Dhaka, Bangladesh', Level: 'Junior', RequireExpYear: 1, featured: false, urgent: false, JobStatus: 'published', Industry: 'IT & Software' },
        { JobID: 2, JobName: 'Senior UX Designer', JobType: 'Onsite', ContractType: 'Fulltime', Salary: '$25,000 - $30,000', CompanyName: 'Google Inc.', CompanyLogo: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg', Location: 'Dhaka, Bangladesh', Level: 'Senior', RequireExpYear: 3, featured: true, urgent: false, JobStatus: 'published', Industry: 'Design' },
        { JobID: 3, JobName: 'Marketing Officer', JobType: 'Hybrid', ContractType: 'Internship', Salary: '$15,000 - $20,000', CompanyName: 'Google Inc.', CompanyLogo: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg', Location: 'Dhaka, Bangladesh', Level: 'Fresher', RequireExpYear: 0, featured: false, urgent: true, JobStatus: 'published', Industry: 'Marketing' },
        { JobID: 4, JobName: 'Junior Graphic Designer', JobType: 'Remote', ContractType: 'Internship', Salary: '$18,000 - $22,000', CompanyName: 'Google Inc.', CompanyLogo: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg', Location: 'Dhaka, Bangladesh', Level: 'Junior', RequireExpYear: 1, featured: false, urgent: false, JobStatus: 'published', Industry: 'Design' },
        { JobID: 5, JobName: 'Interaction Designer', JobType: 'Remote', ContractType: 'Parttime', Salary: '$22,000 - $26,000', CompanyName: 'Google Inc.', CompanyLogo: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg', Location: 'Dhaka, Bangladesh', Level: 'Mid', RequireExpYear: 2, featured: false, urgent: false, JobStatus: 'published', Industry: 'Design' },
        { JobID: 6, JobName: 'Project Manager', JobType: 'Onsite', ContractType: 'Fulltime', Salary: '$35,000 - $40,000', CompanyName: 'Google Inc.', CompanyLogo: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg', Location: 'Dhaka, Bangladesh', Level: 'Manager', RequireExpYear: 5, featured: true, urgent: false, JobStatus: 'published', Industry: 'Business' },
        { JobID: 7, JobName: 'Software Engineer', JobType: 'Hybrid', ContractType: 'Fulltime', Salary: '$30,000 - $35,000', CompanyName: 'Google Inc.', CompanyLogo: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg', Location: 'Dhaka, Bangladesh', Level: 'Mid', RequireExpYear: 3, featured: false, urgent: false, JobStatus: 'published', Industry: 'Development' },
        { JobID: 8, JobName: 'Visual Designer', JobType: 'Onsite', ContractType: 'Fulltime', Salary: '$28,000 - $32,000', CompanyName: 'Google Inc.', CompanyLogo: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg', Location: 'Dhaka, Bangladesh', Level: 'Mid', RequireExpYear: 2, featured: false, urgent: false, JobStatus: 'published', Industry: 'Design' },
        { JobID: 9, JobName: 'UI/UX Designer', JobType: 'Remote', ContractType: 'Fulltime', Salary: '$26,000 - $30,000', CompanyName: 'Google Inc.', CompanyLogo: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg', Location: 'Dhaka, Bangladesh', Level: 'Mid', RequireExpYear: 2, featured: false, urgent: false, JobStatus: 'published', Industry: 'Design' },
        { JobID: 10, JobName: 'Product Designer', JobType: 'Hybrid', ContractType: 'Fulltime', Salary: '$30,000 - $35,000', CompanyName: 'Microsoft Corp.', CompanyLogo: 'https://cdn.example.com/logos/microsoft.png', Location: 'Seattle, USA', Level: 'Senior', RequireExpYear: 4, featured: false, urgent: false, JobStatus: 'published', Industry: 'Design' },
        { JobID: 11, JobName: 'Networking Engineer', JobType: 'Onsite', ContractType: 'Internship', Salary: '$25,000 - $30,000', CompanyName: 'Amazon Inc.', CompanyLogo: 'https://cdn.example.com/logos/amazon.png', Location: 'Austin, USA', Level: 'Junior', RequireExpYear: 1, featured: false, urgent: false, JobStatus: 'published', Industry: 'IT & Software' },
        { JobID: 12, JobName: 'Frontend Developer', JobType: 'Remote', ContractType: 'Fulltime', Salary: '$35,000 - $40,000', CompanyName: 'Meta Inc.', CompanyLogo: 'https://cdn.example.com/logos/meta.png', Location: 'New York, USA', Level: 'Senior', RequireExpYear: 3, featured: false, urgent: false, JobStatus: 'published', Industry: 'Development' },
        { JobID: 13, JobName: 'Backend Developer', JobType: 'Hybrid', ContractType: 'Fulltime', Salary: '$40,000 - $45,000', CompanyName: 'Apple Inc.', CompanyLogo: 'https://cdn.example.com/logos/apple.png', Location: 'California, USA', Level: 'Senior', RequireExpYear: 4, featured: true, urgent: false, JobStatus: 'published', Industry: 'Development' },
        { JobID: 14, JobName: 'Data Scientist', JobType: 'Remote', ContractType: 'Parttime', Salary: '$32,000 - $38,000', CompanyName: 'Tesla Inc.', CompanyLogo: 'https://cdn.example.com/logos/tesla.png', Location: 'Texas, USA', Level: 'Mid', RequireExpYear: 3, featured: false, urgent: false, JobStatus: 'published', Industry: 'IT & Software' },
        { JobID: 15, JobName: 'DevOps Engineer', JobType: 'Onsite', ContractType: 'Fulltime', Salary: '$38,000 - $42,000', CompanyName: 'Netflix Inc.', CompanyLogo: 'https://cdn.example.com/logos/netflix.png', Location: 'Los Angeles, USA', Level: 'Senior', RequireExpYear: 5, featured: false, urgent: false, JobStatus: 'published', Industry: 'Development' },
        { JobID: 16, JobName: 'Mobile Developer', JobType: 'Remote', ContractType: 'Internship', Salary: '$18,000 - $22,000', CompanyName: 'Adobe Inc.', CompanyLogo: 'https://cdn.example.com/logos/adobe.png', Location: 'San Jose, USA', Level: 'Fresher', RequireExpYear: 0, featured: false, urgent: false, JobStatus: 'published', Industry: 'Development' },
        { JobID: 17, JobName: 'QA Engineer', JobType: 'Hybrid', ContractType: 'Parttime', Salary: '$22,000 - $28,000', CompanyName: 'Spotify Inc.', CompanyLogo: 'https://cdn.example.com/logos/spotify.png', Location: 'Stockholm, Sweden', Level: 'Junior', RequireExpYear: 1, featured: false, urgent: false, JobStatus: 'published', Industry: 'IT & Software' },
        { JobID: 18, JobName: 'System Administrator', JobType: 'Onsite', ContractType: 'Fulltime', Salary: '$28,000 - $32,000', CompanyName: 'LinkedIn Corp.', CompanyLogo: 'https://cdn.example.com/logos/linkedin.png', Location: 'San Francisco, USA', Level: 'Mid', RequireExpYear: 3, featured: false, urgent: false, JobStatus: 'published', Industry: 'IT & Software' }
      ];

      // Apply filters to fallback data
      if (searchParams.search) {
        allFallbackJobs = allFallbackJobs.filter(job => 
          job.JobName.toLowerCase().includes(searchParams.search.toLowerCase()) ||
          job.CompanyName.toLowerCase().includes(searchParams.search.toLowerCase()) ||
          job.Location.toLowerCase().includes(searchParams.search.toLowerCase())
        );
      }

      if (searchParams.location) {
        allFallbackJobs = allFallbackJobs.filter(job => 
          job.Location.toLowerCase().includes(searchParams.location.toLowerCase())
        );
      }

      if (filters.industry && filters.industry.length > 0) {
        allFallbackJobs = allFallbackJobs.filter(job => filters.industry.includes(job.Industry));
      }

      if (filters.jobType && filters.jobType.length > 0) {
        allFallbackJobs = allFallbackJobs.filter(job => filters.jobType.includes(job.JobType));
      }

      if (filters.contractType && filters.contractType.length > 0) {
        allFallbackJobs = allFallbackJobs.filter(job => filters.contractType.includes(job.ContractType));
      }

      if (filters.level && filters.level.length > 0) {
        allFallbackJobs = allFallbackJobs.filter(job => filters.level.includes(job.Level));
      }

      // Apply salary filter if enabled
      if (filters.salaryRange && (filters.salaryRange.min > 0 || filters.salaryRange.max < 200000)) {
        allFallbackJobs = allFallbackJobs.filter(job => {
          // Extract salary from string like "$20,000 - $25,000"
          const salaryMatch = job.Salary.match(/\$(\d{1,3}(?:,\d{3})*)\s*-\s*\$(\d{1,3}(?:,\d{3})*)/);
          if (salaryMatch) {
            const minSalary = parseInt(salaryMatch[1].replace(/,/g, ''));
            const maxSalary = parseInt(salaryMatch[2].replace(/,/g, ''));
            const avgSalary = (minSalary + maxSalary) / 2;
            return avgSalary >= filters.salaryRange.min && avgSalary <= filters.salaryRange.max;
          }
          return true;
        });
      }
      
      // Tính toán pagination cho fallback data
      const totalJobs = allFallbackJobs.length;
      const jobsPerPage = 9;
      const totalPagesCalc = Math.ceil(totalJobs / jobsPerPage);
      const startIndex = (currentPage - 1) * jobsPerPage;
      const endIndex = startIndex + jobsPerPage;
      const paginatedJobs = allFallbackJobs.slice(startIndex, endIndex);
      
      setJobData(paginatedJobs);
      setTotalPages(totalPagesCalc);
    } finally {
      setLoading(false);
    }
  };

  // Quản lý scroll khi filter mở/đóng
  useEffect(() => {
    if (showFilters) {
      scrollPositionRef.current = window.pageYOffset;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPositionRef.current}px`;
      document.body.style.width = '100%';
    } else {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollPositionRef.current);
    }

    return () => {
      if (showFilters) {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
      }
    };
  }, [showFilters]);

  // Đọc query parameters từ URL khi component mount
  useEffect(() => {
    const searchFromUrl = searchParams.get('search') || '';
    const locationFromUrl = searchParams.get('location') || '';
    
    if (searchFromUrl) setSearchTerm(searchFromUrl);
    if (locationFromUrl) setLocation(locationFromUrl);
    
    // Nếu có params, tự động search
    if (searchFromUrl || locationFromUrl) {
      fetchJobs({ search: searchFromUrl, location: locationFromUrl });
    }
  }, []);

  // Load jobs khi component mount hoặc page change
  useEffect(() => {
    fetchJobs();
  }, [currentPage]);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset về trang đầu
    fetchJobs({ search: searchTerm, location: location });
  };

  // Handle pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const popularSearches = [
    'Front-end', 'Back-end', 'Development', 'PHP', 'Laravel',
    'Bootstrap', 'Developer', 'Team Lead', 'Product Testing', 'Javascript'
  ];

  const getJobTypeClass = (type) => {
    switch (type) {
      case 'Onsite': return 'job-badge onsite';
      case 'Remote': return 'job-badge remote';
      case 'Hybrid': return 'job-badge hybrid';
      case 'Fulltime': return 'job-badge fulltime';
      case 'Parttime': return 'job-badge parttime';
      case 'Contract': return 'job-badge contract';
      case 'Internship': return 'job-badge internship';
      default: return 'job-badge';
    }
  };

  const getJobTypeLabel = (type) => {
    switch (type) {
      case 'Onsite': return 'Tại văn phòng';
      case 'Remote': return 'Từ xa';
      case 'Hybrid': return 'Kết hợp';
      case 'Fulltime': return 'Toàn thời gian';
      case 'Parttime': return 'Bán thời gian';
      case 'Contract': return 'Hợp đồng';
      case 'Internship': return 'Thực tập';
      default: return type;
    }
  };

  // Xử lý hover cho tooltip
  const handleJobTitleHover = async (job, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const tooltipWidth = 400;
    const tooltipHeight = 500; // Ước tính chiều cao tooltip
    
    // Tính toán vị trí X (trái/phải) để không bị cắt
    let xPosition = rect.right + 10;
    if (xPosition + tooltipWidth > viewportWidth) {
      xPosition = rect.left - tooltipWidth - 10;
    }
    // Nếu vẫn bị cắt bên trái, đặt sát cạnh phải
    if (xPosition < 10) {
      xPosition = viewportWidth - tooltipWidth - 10;
    }
    
    // Tính toán vị trí Y (trên/dưới) để không bị cắt
    let yPosition = rect.top;
    // Nếu tooltip bị cắt ở phía dưới màn hình
    if (yPosition + tooltipHeight > viewportHeight) {
      yPosition = Math.max(10, viewportHeight - tooltipHeight - 10);
    }
    // Đảm bảo không bị cắt ở phía trên
    yPosition = Math.max(10, yPosition);
    
    setTooltipPosition({
      x: Math.max(10, Math.min(xPosition, viewportWidth - tooltipWidth - 10)),
      y: yPosition
    });
    
    setHoveredJob(job);
    
    // Fetch chi tiết công việc
    await fetchJobDetails(job.JobID);
  };

  const handleJobTitleLeave = () => {
    // Delay để cho phép hover vào tooltip
    setTimeout(() => {
      if (!document.querySelector('.job-tooltip:hover')) {
        setHoveredJob(null);
      }
    }, 100);
  };

  // Handle bookmark
  const handleBookmark = async (jobId) => {
    try {
      const isBookmarked = bookmarkedJobs.has(jobId);
      const method = isBookmarked ? 'DELETE' : 'POST';
      
      await fetch(`${API_BASE_URL}/jobs/${jobId}/favorite`, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${userToken}` // Nếu cần auth
        }
      });
      
      setBookmarkedJobs(prev => {
        const newSet = new Set(prev);
        if (isBookmarked) {
          newSet.delete(jobId);
        } else {
          newSet.add(jobId);
        }
        return newSet;
      });
      
    } catch (err) {
      console.error('Error bookmarking job:', err);
      // Fallback: toggle locally
      setBookmarkedJobs(prev => {
        const newSet = new Set(prev);
        if (prev.has(jobId)) {
          newSet.delete(jobId);
        } else {
          newSet.add(jobId);
        }
        return newSet;
      });
    }
  };

  // Handle apply job
  const handleApplyJob = (jobId) => {
    // Chuyển đến trang apply
    navigate(`/jobs/${jobId}/apply`);
  };

  // Handle view details
  const handleViewDetails = (jobId) => {
    // Chuyển đến trang chi tiết công việc
    navigate(`/jobs/${jobId}`);
  };

  // Handle job title click
  const handleJobTitleClick = (jobId) => {
    navigate(`/jobs/${jobId}`);
  };

  // Component JobTooltip
  const JobTooltip = ({ job, position }) => {
    if (!job) return null;

    const currentJobDetails = jobDetails[job.JobID] || {};

    return (
      <div 
        className="job-tooltip" 
        style={{ 
          left: position.x, 
          top: position.y,
          position: 'fixed',
          zIndex: 9999
        }}
        onMouseEnter={() => setHoveredJob(job)}
        onMouseLeave={() => setHoveredJob(null)}
      >
        <div className="tooltip-header">
          <div className="tooltip-company-info">
            <div className="tooltip-logo">
              <img src={job.CompanyLogo || "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"} alt={job.CompanyName} />
            </div>
            <div className="tooltip-title-section">
              <h4 className="tooltip-job-title">{job.JobName}</h4>
              <p className="tooltip-company-name">{job.CompanyName}</p>
              <p className="tooltip-salary">{job.Salary}</p>
            </div>
            <button 
              className={`tooltip-bookmark ${bookmarkedJobs.has(job.JobID) ? 'bookmarked' : ''}`}
              onClick={() => handleBookmark(job.JobID)}
              title="Bookmark job"
            >
              <BookmarkIcon />
            </button>
          </div>
          <div className="tooltip-meta">
            <div className="tooltip-location">
              <MapPin size={16} strokeWidth={2} className="inline mr-1" />
               {currentJobDetails.workLocation || job.location}
            </div>
            <div className="tooltip-experience">
              <Briefcase size={16} strokeWidth={2} className="inline mr-1" />
               {currentJobDetails.experience || '1-3 năm'}
            </div>
            <div className="tooltip-deadline">
              <Clock size={16} strokeWidth={2} className="inline mr-1" />
               {currentJobDetails.applicationDeadline || 'Còn 30 ngày'}
            </div>
          </div>
        </div>
        
        <div className="tooltip-content">
          {loadingJobIds.has(job.JobID) ? (
            <div className="tooltip-loading">
              <div className="tooltip-spinner"></div>
              <span>Đang tải chi tiết...</span>
            </div>
          ) : (
            <>
              <div className="tooltip-section">
                <h5>Mô tả công việc</h5>
                <p>{currentJobDetails.description || 'Đang cập nhật mô tả công việc...'}</p>
              </div>
              
              {currentJobDetails.skills && (
                <div className="tooltip-section">
                  <h5>Kỹ năng yêu cầu</h5>
                  <div className="tooltip-skills">
                    {currentJobDetails.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="tooltip-actions">
                <button 
                  className="tooltip-btn apply-btn"
                  onClick={() => handleApplyJob(job.JobID)}
                >
                  Ứng tuyển
                </button>
                <button 
                  className="tooltip-btn detail-btn"
                  onClick={() => handleViewDetails(job.JobID)}
                >
                  Xem chi tiết
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="find-job-page">
      {/* Page Title Section */}
      <div className="page-title-section">
        <div className="container">
          <div className="title-breadcrumb-wrapper">
            <h1 className="page-main-title">Tìm việc làm</h1>
            <div className="breadcrumb-trail">
              <span className="breadcrumb-item" onClick={() => navigate('/')}>Trang chủ</span>
              <span className="breadcrumb-separator">/</span>
              <span className="breadcrumb-item active">Tìm việc</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          
          {/* Search Box Large */}
          <div className="search-wrapper">
            <form onSubmit={handleSearch} className="search-box-large">
              <div className="input-group">
                <span className="icon"><SearchIcon /></span>
                <input 
                  type="text" 
                  placeholder="Tên công việc, vị trí, từ khóa..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="divider"></div>
              <div className="input-group">
                <span className="icon inline-flex items-center">
  <MapPin size={16} strokeWidth={2} className="text-indigo-600" />
</span>
                <input 
                  type="text" 
                  placeholder="Thành phố, tỉnh thành" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <span className="crosshair">⌖</span>
              </div>
              <div className="action-group">
                <button 
                  type="button" 
                  className="btn-filters"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <FilterIcon /> Bộ lọc
                </button>
                <button type="submit" className="btn-find" disabled={loading}>
                  {loading ? 'Đang tìm...' : 'Tìm việc'}
                </button>
              </div>
            </form>
          </div>

          {/* Popular Searches */}
          <div className="popular-searches">
            <span className="popular-label">Tìm kiếm phổ biến:</span>
            <div className="popular-tags">
              {popularSearches.map((search, index) => (
                <button 
                  key={index} 
                  className="tag-link"
                  onClick={() => {
                    setSearchTerm(search);
                    fetchJobs({ search: search });
                  }}
                >
                  {search}
                </button>
              ))}
            </div>
          </div>

          {/* Filter Sidebar - Chỉ render khi showFilters = true */}
          {showFilters && (
            <FilterSidebar 
              showFilters={showFilters}
              setShowFilters={setShowFilters}
              filters={filters}
              toggleFilter={toggleFilter}
              handleSalaryRangeChange={handleSalaryRangeChange}
              setQuickSalaryRange={setQuickSalaryRange}
              applyFilters={applyFilters}
              clearFilters={clearFilters}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              location={location}
              setLocation={setLocation}
              hasFilterChanges={hasFilterChanges}
            />
          )}
          {showFilters && (
            <div 
              className="filter-overlay"
              onClick={() => setShowFilters(false)}
            />
          )}

          {/* Error Message */}
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {/* Loading Indicator */}
          {loading && (
            <div className="loading-indicator">
              <div className="spinner"></div>
              <span>Đang tải công việc...</span>
            </div>
          )}

          {/* Job Listings Grid */}
          <div className="job-grid">
            {jobData.map((job) => (
              <div key={job.JobID} className={`job-card ${job.JobID === 6 ? 'highlighted' : ''}`}>
                <div className="card-top">
                    <h3 
                      className="job-title" 
                      onMouseEnter={(e) => handleJobTitleHover(job, e)}
                      onMouseLeave={handleJobTitleLeave}
                      onClick={() => handleJobTitleClick(job.JobID)}
                      style={{ cursor: 'pointer' }}
                    >
                      {job.JobName}
                    </h3>
                </div>
                
                <div className="card-meta">
                  <span className={getJobTypeClass(job.JobType)}>{getJobTypeLabel(job.JobType)}</span>
                  <span className="salary">Mức lương: {job.Salary}</span>
                </div>

                <div className="card-footer">
                  <div className="company-info">
                    <div className="logo-box">
                       <img 
                         src={job.CompanyLogo || "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"} 
                         alt={job.CompanyName} 
                       />
                    </div>
                    <div className="info-text">
                      <div className="company-name">{job.CompanyName}</div>
                      <div className="location">
                       <MapPin size={16} strokeWidth={2} className="text-indigo-600" />
                        {job.Location}
                      </div>
                    </div>
                  </div>
                  <button 
                    className={`bookmark-btn ${bookmarkedJobs.has(job.JobID) ? 'bookmarked' : ''}`}
                    onClick={() => handleBookmark(job.JobID)}
                  >
                    <BookmarkIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {!loading && jobData.length === 0 && (
            <div className="empty-state">
              <p>Không tìm thấy công việc nào. Hãy thử tìm kiếm với từ khóa khác.</p>
            </div>
          )}

          {/* Pagination */}
          <div className="pagination">
            <button 
              className="page-btn arrow" 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
            >
              ←
            </button>
            
            {[...Array(Math.min(totalPages, 5))].map((_, index) => {
              const pageNumber = index + 1;
              return (
                <button 
                  key={pageNumber}
                  className={`page-btn ${currentPage === pageNumber ? 'active' : ''}`}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber.toString().padStart(2, '0')}
                </button>
              );
            })}
            
            {totalPages > 5 && (
              <span className="pagination-dots">...</span>
            )}
            
            <button 
              className="page-btn arrow"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
            >
              →
            </button>
          </div>
        </div>
      </main>
      
      {/* Job Tooltip */}
      {hoveredJob && (
        <JobTooltip job={hoveredJob} position={tooltipPosition} />
      )}
    </div>
  );
};

export default FindJobPage;