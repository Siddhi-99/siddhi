import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  RiDashboardLine,
  RiTeamLine,
  RiCalendarEventLine,
  RiUserVoiceLine,
  RiNotification3Line,
  RiLogoutBoxLine,
  RiMenuFoldLine,
  RiMenuUnfoldLine,
} from "react-icons/ri";

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate(); // React Router navigation

  // Handle Logout
  const handleLogout = () => {
    sessionStorage.clear(); // Clear session data
    navigate("/user-login"); // Redirect to login page
  };

  return (
    <aside
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } bg-white text-gray-800 p-4 flex flex-col h-screen border-r border-gray-300 transition-all duration-300`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between mb-8">
        {!isCollapsed && <h1 className="text-2xl font-bold text-blue-800">Club Connect</h1>}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-gray-200 rounded-lg text-gray-800"
        >
          {isCollapsed ? <RiMenuUnfoldLine className="w-5 h-5" /> : <RiMenuFoldLine className="w-5 h-5" />}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 space-y-1">
        <SidebarItem to="/user/" icon={<RiDashboardLine />} text="Dashboard" isCollapsed={isCollapsed} />
        <SidebarItem to="/clubs" icon={<RiTeamLine />} text="Clubs" isCollapsed={isCollapsed} />
        <SidebarItem to="/events" icon={<RiCalendarEventLine />} text="Events" isCollapsed={isCollapsed} />
        <SidebarItem to="/interviews" icon={<RiUserVoiceLine />} text="Interviews" isCollapsed={isCollapsed} />
        <SidebarItem to="/notifications" icon={<RiNotification3Line />} text="Notifications" isCollapsed={isCollapsed} />
        <SidebarItem to="/achievements" icon={<RiNotification3Line />} text="Achievements" isCollapsed={isCollapsed} />
      </nav>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className={`flex items-center ${
          isCollapsed ? "justify-center px-2" : "justify-start px-4"
        } py-3 text-sm rounded-lg text-gray-700 hover:bg-gray-200 mt-auto transition`}
      >
        <RiLogoutBoxLine className="w-5 h-5" />
        {!isCollapsed && <span className="ml-3">Logout</span>}
      </button>
    </aside>
  );
}

const SidebarItem = ({ to, icon, text, isCollapsed }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center ${
        isCollapsed ? "justify-center px-2" : "justify-start px-4"
      } py-3 text-sm rounded-lg font-medium transition ${
        isActive ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-200"
      }`
    }
  >
    {icon}
    {!isCollapsed && <span className="ml-3">{text}</span>}
  </NavLink>
);

export default Sidebar;
