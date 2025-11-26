import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import FindJobPage from "./pages/FindJobPage";
import JobDetails from "./pages/JobDetails";
import ApplyJobPage from "./pages/ApplyJobPage";

function App() {
  console.log("App rendered");
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/find-job" element={<FindJobPage />} />
        <Route path="/jobs/:jobId" element={<JobDetails />} />
        <Route path="/jobs/:jobId/apply" element={<ApplyJobPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
