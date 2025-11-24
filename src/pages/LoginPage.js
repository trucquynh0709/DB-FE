import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      {/* UI login ở đây */}
      <h1>Login Page</h1>
    </div>
  );
}

export default LoginPage;
