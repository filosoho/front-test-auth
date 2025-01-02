import { NavLink } from "react-router-dom";
import "../styles/TopicsBar.css";

const TopicsBar = () => {
  const checkActive = (pathname, search) => {
    return location.pathname === pathname && location.search === search;
  };

  return (
    <>
      <ul>
        <li className="name-li">
          <NavLink
            to="articles/coding"
            className={({ isActive }) =>
              isActive && checkActive("/", "articles/coding") ? "active" : ""
            }
          >
            Coding
          </NavLink>
        </li>
        <li className="name-li">
          <NavLink
            to="articles/cooking"
            className={({ isActive }) =>
              isActive && checkActive("/", "articles/cooking") ? "active" : ""
            }
          >
            Cooking
          </NavLink>
        </li>
        <li className="name-li">
          <NavLink
            to="articles/football"
            className={({ isActive }) =>
              isActive && checkActive("/", "articles/football") ? "active" : ""
            }
          >
            Football
          </NavLink>
        </li>
      </ul>
      {/* <Toggle /> */}
    </>
  );
};

export default TopicsBar;
