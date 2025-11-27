import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import FindJobPage from "./pages/FindJobPage";
import JobDetails from "./pages/JobDetails";
import ApplyJobPage from "./pages/ApplyJobPage";
import SignIn from "./pages/SignInPage";

function App() {
  console.log("App rendered");
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/find-job" element={<FindJobPage />} />
        <Route path="/jobs/:jobId" element={<JobDetails />} />
        <Route path="/jobs/:jobId/apply" element={<ApplyJobPage />} />
        
      </Routes>
    </Layout>
  );
}

export default App;
