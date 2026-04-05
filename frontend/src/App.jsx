import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ChakraProvider, Box, Button, VStack, Heading } from '@chakra-ui/react';

import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Clubs from './pages/Clubs';
import ClubDetails from "./pages/ClubDetails";
import Achievements from "./pages/Achievements";
import DashAchievements from "./pages/AchievementOnDashboard";
import Events from './pages/Events';
import Interviews from './pages/Interviews';
import Notifications from './pages/Notifications';
import RegisterForm from './pages/RegisterForm';
import UserLogin from "./auth/UserLogin";
import UserSignup from "./auth/UserSignup";

import AdminSidebar from './admin-components/Sidebar-admin';
import AdminDashboard from './admin-components/Dashboard-admin';
import ClubManagement from './admin-components/ClubManagement-admin';
import MemberManagement from './admin-components/MemberManagement-admin';
import EventManagement from './admin-components/EventManagement-admin';
import ManageClubPage from './admin-components/ManageClubPage-admin';
import AdminLogin from "./auth/AdminLogin";
import AdminSignup from "./auth/AdminSignup";


const HomePage = () => {
  const navigate = useNavigate();
  return (
    <Box display="flex" alignItems="center" justifyContent="center" minH="100vh" bg="gray.100">
      <VStack spacing={6} p={8} boxShadow="lg" bg="white" borderRadius="md">
        <Heading>Select User Type</Heading>
        <Button colorScheme="blue" onClick={() => navigate('/user-login')}>User</Button>
        <Button colorScheme="green" onClick={() => navigate('admin/admin-login')}>Admin</Button>
      </VStack>
    </Box>
  );
};

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          
          {/* User Section */}
          <Route
            path="/*"
            element={
              <UserLayout>
                <Routes>
                    <Route path="/user" element={
                      <ProtectedRoute requireUser={true}>
                        <Dashboard />
                      </ProtectedRoute>
                    } />
                    <Route path="/clubs" element={
                      <ProtectedRoute requireUser={true}>
                        <Clubs />
                      </ProtectedRoute>
                    } />
                    <Route path="/clubs/:clubName" element={
                      <ProtectedRoute requireUser={true}>
                        <ClubDetails />
                      </ProtectedRoute>
                    } />
                    <Route path="/clubs/:clubName/achievements" element={
                      <ProtectedRoute requireUser={true}>
                        <Achievements />
                      </ProtectedRoute>
                    } />
                    <Route path="/events" element={
                      <ProtectedRoute requireUser={true}>
                        <Events />
                      </ProtectedRoute>
                    } />
                    <Route path="/register-form" element={
                      <ProtectedRoute requireUser={true}>
                        <RegisterForm />
                      </ProtectedRoute>
                    } />
                    <Route path="/interviews" element={
                      <ProtectedRoute requireUser={true}>
                        <Interviews />
                      </ProtectedRoute>
                    } />
                    <Route path="/notifications" element={
                      <ProtectedRoute requireUser={true}>
                        <Notifications />
                      </ProtectedRoute>
                    } />
                    <Route path="/achievements" element={
                      <ProtectedRoute requireUser={true}>
                        <DashAchievements />
                      </ProtectedRoute>
                    } />
                  <Route path="/user-login" element={<UserLogin />} />
                  <Route path="/user-signup" element={<UserSignup />} />
                </Routes>
              </UserLayout>
            }
          />

          {/* Admin Section */}
          <Route
            path="/admin/*"
            element={
              <AdminLayout>
                <Routes>
                    <Route path="/" element={
                      <ProtectedRoute requireAdmin={true}>
                        <AdminDashboard />
                      </ProtectedRoute>
                    } />
                    <Route path="clubs-admin" element={
                      <ProtectedRoute requireAdmin={true}>
                        <ClubManagement />
                      </ProtectedRoute>
                    } />
                    <Route path="manage-club/:clubId" element={
                      <ProtectedRoute requireAdmin={true}>
                        <ManageClubPage />
                      </ProtectedRoute>
                    } />
                    <Route path="members-admin" element={
                      <ProtectedRoute requireAdmin={true}>
                        <MemberManagement />
                      </ProtectedRoute>
                    } />
                    <Route path="events-admin" element={
                      <ProtectedRoute requireAdmin={true}>
                        <EventManagement />
                      </ProtectedRoute>
                    } />
                  <Route path="admin-login" element={<AdminLogin />} />
                  <Route path="admin-signup" element={<AdminSignup />} />
                </Routes>
              </AdminLayout>
            }
          />
        </Routes>
      </Router>
      </AuthProvider>
    </ChakraProvider>
  );
}

const UserLayout = ({ children }) => {
  const location = useLocation();
  const hideSidebar = ['/user-login', '/user-signup'].includes(location.pathname);
  return (
    <div className="flex min-h-screen bg-gray-100">
      {!hideSidebar && <Sidebar />}
      <div className="flex-1 p-8">{children}</div>
    </div>
  );
};

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const hideSidebar = ['/admin/admin-login', '/admin/admin-signup'].includes(location.pathname);
  return (
    <Box display="flex" bg="gray.900" minH="100vh">
      {!hideSidebar && <AdminSidebar />}
      <Box flex="1" p={4}>{children}</Box>
    </Box>
  );
};

export default App;