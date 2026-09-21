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
  Sparkles,CreditCard
} from "lucide-react";

import {
  NavLink,
  useNavigate
} from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("invitoToken");
    localStorage.removeItem("invitoUser");


    navigate("/login");
  };

  return (
    <aside className="sidebar">


      <div className="sidebar-logo">

        <div className="logo-icon">
          <Sparkles size={20} />
        </div>

        <span>
          Invito
        </span>

      </div>

      <div className="sidebar-section">

        <p className="sidebar-title">
          MAIN
        </p>


        <nav className="sidebar-nav">

          <NavLink
            to="/dashboard"
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
  className={({ isActive }) =>
    isActive ? "active" : ""
  }
>
  <CreditCard size={18} />
  <span className="nav-label">Pricing</span> 
</NavLink>
          
          <NavLink
  to="/payment-history"
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
      

      <div className="sidebar-bottom">

        <NavLink
          to="/settings"
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
  );
}

export default Sidebar;