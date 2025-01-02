import  {  useState } from "react";
import { NavLink} from "react-router-dom";
import menuIcon from "../assets/menu.svg";
import "../styles/Navbar.css";

const Navbar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const checkActive = (pathname, search) => {
    return location.pathname === pathname && location.search === search;
  };

  return (
    <>
      {/* Hamburger icon for smaller screens */}
      <a className="hamburger" onClick={toggleSidebar}>
        <img src={menuIcon} alt="Menu" />
      </a>

      {/* Sidebar menu for smaller screens */}
      <div className={`sidebar-menu ${isSidebarOpen ? "active" : ""}`}>
        <a onClick={toggleSidebar} className="hamburger">
          ✖
        </a>
        <nav>
          <ul>
            <li className="name-li">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive && checkActive("/", "") ? "active" : ""
                }
                end
              >
                Home
              </NavLink>
            </li>
            <li className="name-li">
              <NavLink
                to="?about"
                className={({ isActive }) =>
                  isActive && checkActive("/", "?about") ? "active" : ""
                }
              >
                About
              </NavLink>
            </li>
            <li className="name-li">
              <NavLink
                to="/?careers"
                className={({ isActive }) =>
                  isActive && checkActive("/", "?careers") ? "active" : ""
                }
              >
                Careers
              </NavLink>
            </li>
            <li className="name-li">
              <NavLink
                to="/?contact"
                className={({ isActive }) =>
                  isActive && checkActive("/", "?contact") ? "active" : ""
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      {/* Standard navbar visible on larger screens */}
      <section className="nav-bar">
        <nav>
          <ul>
            <li className="name-li">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive && checkActive("/", "") ? "active" : ""
                }
                end
              >
                Home
              </NavLink>
            </li>
            <li className="name-li">
              <NavLink
                to="?about"
                className={({ isActive }) =>
                  isActive && checkActive("/", "?about") ? "active" : ""
                }
              >
                About
              </NavLink>
            </li>
            <li className="name-li">
              <NavLink
                to="/?careers"
                className={({ isActive }) =>
                  isActive && checkActive("/", "?careers") ? "active" : ""
                }
              >
                Careers
              </NavLink>
            </li>
            <li className="name-li">
              <NavLink
                to="/?contact"
                className={({ isActive }) =>
                  isActive && checkActive("/", "?contact") ? "active" : ""
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>
      </section>
    </>
  );
};

export default Navbar;
