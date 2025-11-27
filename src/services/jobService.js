// Job API Service - Aligned with Database Schema
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Fetch jobs với các filter options
// Schema: job table có các trường: JobID, JobName, JD, JobType, ContractType, Level, 
// Quantity, SalaryFrom, SalaryTo, RequiredExpYear, Location, PostDate, ExpireDate, 
// JobStatus, NumberOfApplicant, EmployerID
export const fetchJobs = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams({
      page: params.page || 1,
      limit: params.limit || 12,
      ...params
    });

    const response = await fetch(`${API_BASE_URL}/jobs?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};

// Fetch job details by ID
export const fetchJobById = async (jobId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/jobs/${jobId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching job details:', error);
    throw error;
  }
};

// Apply for a job
// Schema: apply table có các trường: CandidateID, JobID, upLoadCV, CoverLetter, Status_apply
export const applyForJob = async (jobId, applicationData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/apply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add authorization header if needed
        // 'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        CandidateID: applicationData.candidateId,
        JobID: jobId,
        upLoadCV: applicationData.cvPath,
        CoverLetter: applicationData.coverLetter || null,
        Status_apply: 'Dang duyet' // Default status
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error applying for job:', error);
    throw error;
  }
};

// Bookmark/Save job (favorite table in schema)
// Schema: favourite table có các trường: CandidateID, JobID, Date
export const toggleBookmark = async (jobId, candidateId, isBookmarked) => {
  try {
    const method = isBookmarked ? 'DELETE' : 'POST';
    const response = await fetch(`${API_BASE_URL}/favourite`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        // Add authorization header if needed
        // 'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        CandidateID: candidateId,
        JobID: jobId,
        Date: new Date().toISOString().split('T')[0]
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error toggling bookmark:', error);
    throw error;
  }
};

// Get job categories/filters
// Schema: job_category table có các trường: JCName, Specialty
export const fetchJobCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/job-categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Get skills list
// Schema: skill table có các trường: SkillName, Description
export const fetchSkills = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/skills`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching skills:', error);
    throw error;
  }
};