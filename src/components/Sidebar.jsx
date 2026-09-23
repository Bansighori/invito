import {
  LayoutDashboard,
  Mail,
  Palette,
  Users,
  BarChart3,
  Star,
  FileText,
  Settings,
  LogOut,
  Sparkles,
  CreditCard,
  Menu,
  X
} from "lucide-react";

import {
  NavLink,
  useNavigate
} from "react-router-dom";

import {
  useState
} from "react";




function Sidebar() {

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);


  const handleLogout = () => {

    localStorage.removeItem("invitoToken");
    localStorage.removeItem("invitoUser");

    navigate("/login");

  };


  const closeSidebar = () => {
    setIsOpen(false);
  };


  return (
    <>

      {/* =================================================
          HAMBURGER BUTTON
      ================================================= */}

      <button
        type="button"
        className={`sidebar-menu-button ${
          isOpen ? "sidebar-menu-open" : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >

        {isOpen ? (
          <X size={21} />
        ) : (
          <Menu size={21} />
        )}

      </button>


      {/* =================================================
          OVERLAY
      ================================================= */}

      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={closeSidebar}
        />
      )}


      {/* =================================================
          SIDEBAR
      ================================================= */}

      <aside
        className={`sidebar ${
          isOpen ? "sidebar-open" : ""
        }`}
      >


        {/* =================================================
            LOGO
        ================================================= */}

        <div className="sidebar-logo">

          <div className="logo-icon">

            <Sparkles size={20} />

          </div>

          <span>
            Invito
          </span>

        </div>


        {/* =================================================
            MAIN NAVIGATION
        ================================================= */}

        <div className="sidebar-section">

          <p className="sidebar-title">
            MAIN
          </p>


          <nav className="sidebar-nav">


            <NavLink
              to="/home"
              onClick={closeSidebar}
              className={({ isActive }) =>
                `sidebar-link ${
                  isActive ? "active" : ""
                }`
              }
            >

              <LayoutDashboard size={19} />

              <span>
                Home
              </span>

            </NavLink>


            <NavLink
              to="/dashboard"
              onClick={closeSidebar}
              className={({ isActive }) =>
                `sidebar-link ${
                  isActive ? "active" : ""
                }`
              }
            >

              <LayoutDashboard size={19} />

              <span>
                Dashboard
              </span>

            </NavLink>


            <NavLink
              to="/invitations"
              onClick={closeSidebar}
              className={({ isActive }) =>
                `sidebar-link ${
                  isActive ? "active" : ""
                }`
              }
            >

              <Mail size={19} />

              <span>
                My Invitations
              </span>

            </NavLink>


            <NavLink
              to="/templates"
              onClick={closeSidebar}
              className={({ isActive }) =>
                `sidebar-link ${
                  isActive ? "active" : ""
                }`
              }
            >

              <Palette size={19} />

              <span>
                Templates
              </span>

            </NavLink>


            <NavLink
              to="/guests"
              onClick={closeSidebar}
              className={({ isActive }) =>
                `sidebar-link ${
                  isActive ? "active" : ""
                }`
              }
            >

              <Users size={19} />

              <span>
                Guests
              </span>

            </NavLink>


            <NavLink
              to="/analytics"
              onClick={closeSidebar}
              className={({ isActive }) =>
                `sidebar-link ${
                  isActive ? "active" : ""
                }`
              }
            >

              <BarChart3 size={19} />

              <span>
                Analytics
              </span>

            </NavLink>


            <NavLink
              to="/favorites"
              onClick={closeSidebar}
              className={({ isActive }) =>
                `sidebar-link ${
                  isActive ? "active" : ""
                }`
              }
            >

              <Star size={19} />

              <span>
                Favorites
              </span>

            </NavLink>


            <NavLink
              to="/drafts"
              onClick={closeSidebar}
              className={({ isActive }) =>
                `sidebar-link ${
                  isActive ? "active" : ""
                }`
              }
            >

              <FileText size={19} />

              <span>
                Drafts
              </span>

            </NavLink>


            <NavLink
              to="/pricing"
              onClick={closeSidebar}
              className={({ isActive }) =>
                `sidebar-link ${
                  isActive ? "active" : ""
                }`
              }
            >

              <CreditCard size={19} />

              <span>
                Pricing
              </span>

            </NavLink>


            <NavLink
              to="/payment-history"
              onClick={closeSidebar}
              className={({ isActive }) =>
                `sidebar-link ${
                  isActive ? "active" : ""
                }`
              }
            >

              <CreditCard size={19} />

              <span>
                Payment History
              </span>

            </NavLink>


          </nav>

        </div>


        {/* =================================================
            BOTTOM
        ================================================= */}

        <div className="sidebar-bottom">


          <NavLink
            to="/settings"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `sidebar-link ${
                isActive ? "active" : ""
              }`
            }
          >

            <Settings size={19} />

            <span>
              Settings
            </span>

          </NavLink>


          <button
            type="button"
            className="sidebar-link logout-link"
            onClick={handleLogout}
          >

            <LogOut size={19} />

            <span>
              Logout
            </span>

          </button>


        </div>


      </aside>

    </>
  );
}


export default Sidebar;