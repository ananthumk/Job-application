import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Loader from './components/Loader';

// Auth Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

// Candidate Pages
import Jobs from './pages/Candidate/Jobs';
import JobDetails from './pages/Candidate/JobDetails';
import MyApplications from './pages/Candidate/MyApplications';
import MyFavourites from './pages/Candidate/MyFavourites';

// Admin Pages
import AdminJobs from './pages/Admin/AdminJobs';
import JobForm from './pages/Admin/JobForm';
import Applicants from './pages/Admin/Applicants';
import Dashboard from './pages/Admin/Dashboard';

function App() {
  const { loading } = useAuth();

  if (loading) {
    return <Loader fullScreen />;
  }

  return (
    <div>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Candidate Routes */}
        <Route
          path="/jobs"
          element={
            <ProtectedRoute requiredRole="candidate">
              <Jobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs/:id"
          element={
            <ProtectedRoute requiredRole="candidate">
              <JobDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-applications"
          element={
            <ProtectedRoute requiredRole="candidate">
              <MyApplications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-favourites"
          element={
            <ProtectedRoute requiredRole="candidate">
              <MyFavourites />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/jobs"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminJobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/jobs/create"
          element={
            <ProtectedRoute requiredRole="admin">
              <JobForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/jobs/:jobId/edit"
          element={
            <ProtectedRoute requiredRole="admin">
              <JobForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/jobs/:jobId/applicants"
          element={
            <ProtectedRoute requiredRole="admin">
              <Applicants />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute requiredRole="admin">
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* 404 Route */}
        <Route path="*" element={<div className="text-center py-20"><p className="text-xl text-gray-600">Page not found</p></div>} />
      </Routes>
    </div>
  );
}

export default App;
