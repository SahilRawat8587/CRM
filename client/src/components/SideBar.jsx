import React, { useEffect, useState } from "react";
import {
  Menu,
  Home,
  File,
  Calendar,
  Users,
  LogOut,
  UserPlus,
  User2,
  XCircle,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const navigate = useNavigate();
  const location = useLocation();

  // Automatically highlight active menu on route change
  useEffect(() => {
    const urlArray = location.pathname.split("/");
    const activeKey = urlArray[1];
    setSelectedKey(activeKey || "dashboard");
  }, [location.pathname]);

  // Toggle sidebar open/close
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Menu items data
  const menuItems = [
    {
      key: "dashboard",
      name: "Dashboard",
      icon: <Home size={20} />,
      path: "/dashboard",
      visible: true,
    },
   
    {
      key: "employee",
      name: "Employee",
      icon: <User2 size={20} />,
      path: "/employee",
      visible: true,
    },
    {
      key: "files",
      name: "File Repository",
      icon: <File size={20} />,
      path: "/files",
      visible: true,
    },
    {
      key: "team",
      name: "Team Management",
      icon: <Users size={20} />,
      path: "/team",
      visible: true,
    },
    {
      key: "calendar",
      name: "Calendar",
      icon: <Calendar size={20} />,
      path: "/calendar",
      visible: true,
    },
    {
      key: "logout",
      name: "Logout",
      icon: <LogOut size={20} />,
      path: "/logout",
      visible: true,
    },
  ];

  // Filter to only show visible menu items
  const filterMenuItems = (items) => items.filter((item) => item.visible);

  return (
    <div
      className="flex"
      style={{
       
      }}
    >
      {/* Sidebar Main Wrapper */}
      <div
        className={`bg-[#F4EFCA] ${
          isOpen ? "w-64" : "w-20"
        } min-h-screen transition-all duration-500 ease-in-out relative`}
      >
        {/* Sidebar Header */}
        <button
          onClick={toggleSidebar}
          className="text-[#F66435] focus:outline-none absolute top-4 left-4 z-20"
        >
          {isOpen ? (
            <XCircle
              className="transition-transform duration-300 rotate-180"
              size={28}
            />
          ) : (
            <Menu
              className="transition-transform duration-300 rotate-0"
              size={28}
            />
          )}
        </button>

        {/* Sidebar Menu Items */}
        <ul className="mt-20">
          {filterMenuItems(menuItems).map((item, index) => (
            <li
              key={index}
              className={`group relative flex items-center p-4 text-[#F66435] hover:bg-[#F66435] hover:text-[#F4EFCA] rounded-lg m-2 text-sm cursor-pointer transition-all duration-200 ease-in-out ${
                selectedKey === item.key ? "bg-[#F66435] text-black" : ""
              }`}
              onClick={() => navigate(item.path)}
            >
              {item.icon}
              {isOpen ? (
                <span className="ml-4">{item.name}</span>
              ) : (
                // Tooltip for collapsed sidebar
                <span className="absolute left-16 bg-[#2F3E46] text-[#F4EFCA] px-2 py-1 rounded-md text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {item.name}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;