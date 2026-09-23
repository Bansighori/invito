import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import "./App.css";

import DashboardLayout
  from "./layouts/DashboardLayout";
  import "./styles/animations.css";
import Home from "./pages/Home";
import ProtectedRoute
  from "./components/ProtectedRoute";

import Dashboard
  from "./pages/Dashboard";

import Invitations
  from "./pages/Invitations";

import Templates
  from "./pages/Templates";

import Guests
  from "./pages/Guests";

import Analytics
  from "./pages/Analytics";

import Favorites
  from "./pages/Favorites";

import Drafts
  from "./pages/Drafts";
  import Pricing from "./pages/Pricing";
  import PaymentHistory from "./pages/PaymentHistory";

import Settings
  from "./pages/Settings";

import CreateInvitation
  from "./pages/CreateInvitation";

import PublicInvitation
  from "./pages/PublicInvitation";

import InvitationDetails
  from "./pages/InvitationDetails";

import Login
  from "./pages/Login";

import Register
  from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

import AdminLogin from "./admin/pages/AdminLogin";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminProtectedRoute from "./admin/AdminProtectedRoute";
import AdminUsers from "./admin/pages/AdminUsers";
import AdminInvitations from "./admin/pages/AdminInvitations";


function App() {
  return (
    <BrowserRouter>

      <Routes>

        
        

        <Route
          path="/login"
          element={<Login />}
        />
        

        <Route
          path="/register"
          element={<Register />}
        />
        <Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>

        {/* Public Invitation */}

        <Route
          path="/invite/:slug"
          element={<PublicInvitation />}
        />
        <Route
  path="/admin/users"
  element={
    <AdminProtectedRoute>
      <AdminUsers />
    </AdminProtectedRoute>
  }
/>


        {/* Protected Routes */}

        <Route element={<ProtectedRoute />}>

          <Route
            element={
              <DashboardLayout />
            }
          >

            <Route
  path="/"
  element={<Navigate to="/login" replace />}
/>
<Route path="/home" element={<Home />} />
            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/invitations"
              element={<Invitations />}
            />

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

            <Route
              path="/templates"
              element={<Templates />}
            />

            <Route
              path="/guests"
              element={<Guests />}
            />

            <Route
              path="/analytics"
              element={<Analytics />}
            />

            <Route
              path="/favorites"
              element={<Favorites />}
            />

            <Route
              path="/drafts"
              element={<Drafts />}
            />
            <Route
  path="/pricing"
  element={<Pricing />}
/>
<Route
  path="/payment-history"
  element={<PaymentHistory />}
/>
            <Route
              path="/settings"
              element={<Settings />}
            />

          </Route>

        </Route>
        <Route
  path="/admin/login"
  element={<AdminLogin />}
/>

<Route
  path="/admin/dashboard"
  element={
    <AdminProtectedRoute>
      <AdminDashboard />
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

      </Routes>

    </BrowserRouter>
  );
}

export default App;