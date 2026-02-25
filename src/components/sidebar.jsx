import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Admin from "./Navigation/Admin";
import Leader from "./Navigation/Leader";
import Employee from "./Navigation/Employee";

const SideBar = ({ isSidebarMini }) => {
  const { user } = useSelector((state) => state.authSlice);

  return (
    <div
      className={`main-sidebar sidebar-pro ${isSidebarMini ? "sidebar-mini" : ""}`}
    >
      <aside id="sidebar-wrapper" className="sidebar-inner">
        {/* Brand — full width */}
        <div className="sidebar-brand hide-sidebar-mini">
          <NavLink to="/home" className="sidebar-brand-link">
            <span className="sidebar-logo">
              <svg
                width="28"
                height="28"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <rect
                  width="32"
                  height="32"
                  rx="8"
                  fill="currentColor"
                  opacity="1"
                />
                <path
                  d="M10 10h4v12h-4V10zm8 0h4v12h-4V10zM8 22h16v2H8v-2z"
                  fill="var(--surface)"
                />
              </svg>
            </span>
            <span className="sidebar-brand-text">HRM Demo</span>
          </NavLink>
        </div>

        {/* Brand — mini (icon only) */}
        <div className="sidebar-brand sidebar-brand-sm">
          <NavLink
            to="/home"
            className="sidebar-brand-link sidebar-brand-link-mini"
            aria-label="Home"
          >
            <span className="sidebar-logo-mini">TM</span>
          </NavLink>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {user?.type === "Admin" && <Admin />}
          {user?.type === "Leader" && <Leader />}
          {user?.type === "Employee" && <Employee />}
        </nav>
      </aside>
    </div>
  );
};

export default SideBar;
