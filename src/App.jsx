
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./App.css";
import "./styles/animations.css";

import DashboardLayout from "./layouts/DashboardLayout";

// User pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Invitations from "./pages/Invitations";
import Templates from "./pages/Templates";
import Guests from "./pages/Guests";
import Analytics from "./pages/Analytics";
import Favorites from "./pages/Favorites";
import Drafts from "./pages/Drafts";
import Pricing from "./pages/Pricing";
import PaymentHistory from "./pages/PaymentHistory";
import Settings from "./pages/Settings";
import CreateInvitation from "./pages/CreateInvitation";
import PublicInvitation from "./pages/PublicInvitation";
import InvitationDetails from "./pages/InvitationDetails";
import SupportChat from "./pages/SupportChat";

import ProtectedRoute from "./components/ProtectedRoute";

// Admin pages
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminProtectedRoute from "./admin/AdminProtectedRoute";
import AdminUsers from "./admin/pages/AdminUsers";
import AdminInvitations from "./admin/pages/AdminInvitations";
import AdminTemplates from "./admin/pages/AdminTemplates";
import AdminTemplateEdit from "./admin/pages/AdminTemplateEdit";
import AdminTemplateAdd from "./admin/pages/AdminTemplateAdd";
import AdminPayments from "./admin/pages/AdminPayments";
import AdminPlans from "./admin/pages/AdminPlans";
import AdminRoles from "./admin/pages/AdminRoles";
import AdminSettings from "./admin/pages/AdminSettings";
import AdminSupportChat from "./admin/pages/AdminSupportChat";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Root */}
        <Route
          path="/"
          element={<Navigate to="/home" replace />}
        />

        {/* Public homepage: no dashboard sidebar or topbar */}
        <Route path="/home" element={<Home />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/admin/login"
          element={<Navigate to="/login" replace />}
        />

        {/* Public invitation sharing */}
        <Route
          path="/invite/:slug"
          element={<PublicInvitation />}
        />

        {/* Protected user pages: dashboard layout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/support" element={<SupportChat />} />

            <Route path="/invitations" element={<Invitations />} />
            <Route
              path="/invitations/:id"
              element={<InvitationDetails />}
            />
            <Route
              path="/invitations/create"
              element={<CreateInvitation />}
            />
            <Route
              path="/invitations/create/:templateId"
              element={<CreateInvitation />}
            />

            <Route path="/templates" element={<Templates />} />
            <Route path="/guests" element={<Guests />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/drafts" element={<Drafts />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route
              path="/payment-history"
              element={<PaymentHistory />}
            />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>

        {/* Protected admin pages */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminProtectedRoute>
              <AdminUsers />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/invitations"
          element={
            <AdminProtectedRoute>
              <AdminInvitations />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/templates"
          element={
            <AdminProtectedRoute>
              <AdminTemplates />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/templates/add"
          element={
            <AdminProtectedRoute>
              <AdminTemplateAdd />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/templates/edit/:id"
          element={
            <AdminProtectedRoute>
              <AdminTemplateEdit />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/support"
          element={
            <AdminProtectedRoute>
              <AdminSupportChat />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/payments"
          element={
            <AdminProtectedRoute>
              <AdminPayments />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/plans"
          element={
            <AdminProtectedRoute>
              <AdminPlans />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/roles"
          element={
            <AdminProtectedRoute>
              <AdminRoles />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <AdminProtectedRoute>
              <AdminSettings />
            </AdminProtectedRoute>
          }
        />

        {/* Unknown paths */}
        <Route
          path="*"
          element={<Navigate to="/home" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
