import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, MapPin, Briefcase, Building2, Users, FileText,
  Upload, Target, CheckCircle, Code, Layout, Server, 
  Smartphone, GitBranch, Bug, Palette, Cpu
} from 'lucide-react';
import '../styles/HomePage.css';
import CountUp from 'react-countup';

const Homepage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const [searchKeyword, setSearchKeyword] = useState('');
  const [location, setLocation] = useState('');

  // API States
  const [stats, setStats] = useState([]);
  const [topCompanies, setTopCompanies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState({
    stats: true,
    categories: true,
    companies: true,
  });

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  // ========== FETCH STATS ==========
  useEffect(() => {
    const fetchStats = async () => {
      console.log('🔄 Fetching stats from:', `${API_BASE_URL}/stats`);
      
      try {
        const response = await fetch(`${API_BASE_URL}/stats`);
        console.log('📊 Stats response status:', response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('❌ Stats API error:', errorText);
          throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        console.log('✅ Stats data received:', data);
        setStats(data);
        
      } catch (error) {
        console.error('❌ Error fetching stats:', error.message);
        console.error('Stack:', error.stack);
        
        // Fallback data
        setStats([
          { icon: 'briefcase', number: '175,324', label: 'Live Job' },
          { icon: 'building', number: '97,354', label: 'Companies' },
          { icon: 'users', number: '3,847,154', label: 'Candidates' },
          { icon: 'file', number: '7,532', label: 'New Jobs' }
        ]);
      } finally {
        setLoading(prev => ({ ...prev, stats: false }));
      }
    };
    fetchStats();
  }, [API_BASE_URL]);

  // ========== FETCH CATEGORIES ==========
  useEffect(() => {
    const fetchCategories = async () => {
      console.log('🔄 Fetching categories from:', `${API_BASE_URL}/categories`);
      
      try {
        const response = await fetch(`${API_BASE_URL}/categories`);
        console.log('📂 Categories response status:', response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('❌ Categories API error:', errorText);
          throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        console.log('✅ Categories data received:', data);
        setCategories(data);
        
      } catch (error) {
        console.error('❌ Error fetching categories:', error.message);
        
        // Fallback data
        setCategories([
          { id: 1, icon: 'code', name: 'Software Engineering', openPositions: 35241 },
          { id: 2, icon: 'layout', name: 'Frontend Developer', openPositions: 18273 },
          { id: 3, icon: 'server', name: 'Backend Developer', openPositions: 16192 },
          { id: 4, icon: 'smartphone', name: 'Mobile Developer', openPositions: 9874 },
          { id: 5, icon: 'gitbranch', name: 'DevOps Engineer', openPositions: 8201 },
          { id: 6, icon: 'bug', name: 'QA / Tester', openPositions: 7834 },
          { id: 7, icon: 'palette', name: 'UI/UX Designer', openPositions: 6923 },
          { id: 8, icon: 'cpu', name: 'AI / Machine Learning', openPositions: 3741 }
        ]);
      } finally {
        setLoading(prev => ({ ...prev, categories: false }));
      }
    };
    fetchCategories();
  }, [API_BASE_URL]);

  // ========== FETCH TOP COMPANIES ==========
  useEffect(() => {
    const fetchTopCompanies = async () => {
      console.log('🔄 Fetching companies from:', `${API_BASE_URL}/companies/top?limit=6`);
      
      try {
        const response = await fetch(`${API_BASE_URL}/companies/top?limit=6`);
        console.log('🏢 Companies response status:', response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('❌ Companies API error:', errorText);
          throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        console.log('✅ Companies data received:', data);
        
        // Validate response format
        const companiesData = Array.isArray(data) ? data : (data.data || []);
        
        if (!Array.isArray(companiesData) || companiesData.length === 0) {
          console.warn('⚠️ No companies data, using fallback');
          throw new Error('Invalid or empty response');
        }

        // Sort by rating and mark top 3 as featured
        const sorted = [...companiesData].sort((a, b) => (b.rating || 0) - (a.rating || 0));
        const finalCompanies = sorted.map((company, index) => ({
          ...company,
          featured: index < 3,
          openPositions: company.openPositions || 0
        }));

        console.log('✅ Final companies:', finalCompanies);
        setTopCompanies(finalCompanies);
        
      } catch (error) {
        console.error('❌ Error fetching companies:', error.message);
        
        // Fallback data
        setTopCompanies([
          { 
            CompanyID: 1, 
            CompanyName: "FPT Software", 
            Logo: "https://cdn.topcv.vn/100/company_logos/fpt-software-6159c8f08d0a8.jpg", 
            CompanySize: "25,000+ employees", 
            Website: "https://fpt-software.com", 
            Description: "Công ty công nghệ hàng đầu Việt Nam", 
            Industry: "Information Technology", 
            CNationality: "Vietnam", 
            openPositions: 428, 
            rating: 4.5,
            featured: true
          },
          { 
            CompanyID: 2, 
            CompanyName: "VNG Corporation", 
            Logo: "https://cdn.topcv.vn/100/company_logos/vng-corporation-614e5f5e8d0a8.jpg", 
            CompanySize: "3,000 - 5,000 employees", 
            Website: "https://vng.com.vn", 
            Description: "Zalo • Zing • Cloud • Game", 
            Industry: "Internet", 
            CNationality: "Vietnam", 
            openPositions: 312, 
            rating: 4.2,
            featured: true
          }
        ]);
      } finally {
        setLoading(prev => ({ ...prev, companies: false }));
      }
    };
    fetchTopCompanies();
  }, [API_BASE_URL]);

  // Icon Mapping 
  const getIcon = (iconName) => {
    const icons = {
      briefcase: <Briefcase size={32} />,
      building: <Building2 size={32} />,
      users: <Users size={32} />,
      file: <FileText size={32} />,
      palette: <Palette size={32} />,
      code: <Code size={32} />,
      target: <Target size={32} />,
      layout: <Layout size={32} />,
      server: <Server size={32} />,
      smartphone: <Smartphone size={32} />,
      gitbranch: <GitBranch size={32} />,
      bug: <Bug size={32} />,
      cpu: <Cpu size={32} />
    };
    return icons[iconName?.toLowerCase()] || <Briefcase size={32} />;
  };

  const handleSearch = () => {
    navigate(`/find-job?search=${searchKeyword}&location=${location}`);
  };

  const howItWorks = [
    { icon: <Users size={40} />, title: 'Create account', desc: 'Tạo tài khoản miễn phí trong 1 phút' },
    { icon: <Upload size={40} />, title: 'Upload CV/Resume', desc: 'Tải lên CV để nhà tuyển dụng tìm thấy bạn' },
    { icon: <Target size={40} />, title: 'Find suitable job', desc: 'Tìm việc phù hợp với kỹ năng của bạn' },
    { icon: <CheckCircle size={40} />, title: 'Apply job', desc: 'Ứng tuyển chỉ với 1 click' }
  ];

  const liveJobsCount = stats.find(s => s.label === 'Live Job')?.number?.replace(/,/g, '') || '175324';

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-container">
        <div className="container">
          <div className="hero-content">
            <div className="hero-left">
              <h1 className={isVisible ? 'fade-in' : ''}>
                Tìm công việc IT <br /> phù hợp với bạn.
              </h1>

              {!loading.stats ? (
                <p className="hero-count">
                  <CountUp
                    end={parseInt(liveJobsCount)}
                    duration={2.5}
                    separator=","
                  />
                  <span>+</span> việc làm IT đang chờ những Developer thật sự "chất".
                </p>
              ) : (
                <p className="hero-count skeleton-count">000,000+ việc làm IT đang chờ...</p>
              )}

              <div className="home-search-box">
                <div className="home-search-input-group">
                  <Search className="search-icon" size={22} />
                  <input placeholder="Job title, Keyword..." value={searchKeyword} onChange={e => setSearchKeyword(e.target.value)} />
                </div>
                <div className="search-divider"></div>
                <div className="home-search-input-group">
                  <MapPin className="search-icon" size={22} />
                  <input placeholder="Hà Nội, TP.HCM, Remote..." value={location} onChange={e => setLocation(e.target.value)} />
                </div>
                <button className="btn-find-job" onClick={handleSearch}>Find Job</button>
              </div>
            </div>
            <div className="hero-right">
              <img src="/images/hero-section.png" alt="Hero" className="hero-img" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="hp-stats">
        <div className="container">
          {loading.stats ? (
            <div className="loading">Loading stats...</div>
          ) : (
            <div className="hp-stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="hp-stat-card">
                  <div className="hp-stat-icon">
                    {getIcon(stat.icon)}
                  </div>
                  <div className="hp-stat-info">
                    <h3>{stat.number}</h3>
                    <p>{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How it Works */}
      <section className="how-it-works">
        <div className="container">
          <h2>How ITviec works</h2>
          <div className="steps-grid">
            {howItWorks.map((step, index) => (
              <div key={index} className="step-card">
                <div className="step-icon">
                  {step.icon}
                </div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Category */}
      <section className="popular-category">
        <div className="container">
          <div className="section-header">
            <h2>Popular category</h2>
            <a href="/jobs" className="view-all-link">View All →</a>
          </div>
          {loading.categories ? (
            <div className="category-grid">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="category-card skeleton">
                  <div className="category-icon skeleton"></div>
                  <div className="category-info">
                    <h3 className="skeleton-line"></h3>
                    <p className="skeleton-line small"></p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="category-grid">
              {categories.map((cat) => (
                <div key={cat.id} className="category-card">
                  <div className="category-icon">
                    {getIcon(cat.icon)}
                  </div>
                  <div className="category-info">
                    <h3>{cat.name}</h3>
                    <p>{cat.openPositions || cat.jobCount || 0} Open positions</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Top Companies */}
      <section className="top-companies">
        <div className="container">
          <div className="section-header">
            <h2>Top công ty đang tuyển dụng</h2>
            <a href="/companies" className="view-all-link">Xem tất cả →</a>
          </div>

          {loading.companies ? (
            <div className="company-grid">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="company-card skeleton">
                  <div className="company-logo skeleton"></div>
                  <div className="company-info">
                    <h3 className="skeleton-line"></h3>
                    <p className="skeleton-line small"></p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="company-grid">
              {topCompanies.map((company) => (
                <div
                  key={company.CompanyID}
                  className={`company-card ${company.featured ? 'featured' : ''}`}
                >
                  <div className="company-header">
                    {company.Logo ? (
                      <img src={company.Logo} alt={company.CompanyName} className="company-logo" />
                    ) : (
                      <div className="logo-placeholder">
                        {company.CompanyName.charAt(0)}
                      </div>
                    )}
                    {company.featured && <span className="featured-badge">Featured</span>}
                  </div>

                  <div className="company-body">
                    <h3>{company.CompanyName}</h3>
                    <p className="company-desc">{company.Description}</p>

                    <div className="company-meta">
                      <span className="meta-item">
                        <Building2 size={14} /> {company.CompanySize}
                      </span>
                      <span className="meta-item">
                        {company.CNationality}
                      </span>
                      <span className="meta-item">
                        {company.Industry}
                      </span>
                    </div>

                    <div className="company-footer">
                      <a href={company.Website} target="_blank" rel="noopener noreferrer" className="website">
                        {company.Website.replace('https://', '').replace('www.', '')}
                      </a>
                      <div className="open-jobs">
                        <Briefcase size={16} /> {company.openPositions} việc làm
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Homepage;