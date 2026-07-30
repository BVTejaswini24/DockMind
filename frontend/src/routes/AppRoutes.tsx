import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import DashboardLayout from '../layouts/DashboardLayout'
import Landing from '../pages/Landing'
import LoginPage from '../pages/Login'
import SignupPage from '../pages/Signup'
import ForgotPasswordPage from '../pages/ForgotPassword'
import ResetPasswordPage from '../pages/ResetPassword'
import EmailVerificationPage from '../pages/EmailVerification'
import DashboardPage from '../pages/Dashboard'
import DocumentsPage from '../pages/Documents'
import ConversationsPage from '../pages/Conversations'
import SettingsPage from '../pages/Settings'
import ProfilePage from '../pages/Profile'
import NotFoundPage from '../pages/NotFound'
import ProtectedRoute from '../components/common/ProtectedRoute'

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Public routes */}
        <Route index element={<Landing />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />
        <Route path="verify-email" element={<EmailVerificationPage />} />
      </Route>

      {/* Protected routes with DashboardLayout */}
      <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="chat" element={<DocumentsPage />} />
        <Route path="conversations" element={<ConversationsPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
