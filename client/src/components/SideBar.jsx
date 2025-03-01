import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Home, File, Calendar, Users, Settings, LogOut } from "lucide-react";
import Dashboard from "@/pages/Dashboard/Dashboard";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { name: "Dashboard", icon: <Home />, path: "/" },
    { name: "File Repository", icon: <File />, path: "/files" },
    { name: "Team Management", icon: <Users />, path: "/team" },
    { name: "Calendar", icon: <Calendar />, path: "/calendar" },
    { name: "Settings", icon: <Settings />, path: "/settings" },
    { name: "Logout", icon: <LogOut />, path: "/logout" },
  ];

  return (
    <div className="flex">
      <div className={`bg-[#F66435] ${isOpen ? 'w-64' : 'w-20'} min-h-screen transition-width duration-300`}>
        <button onClick={toggleSidebar} className="p-4">
          <Menu className="text-white" />
        </button>
        <ul className="mt-4">
          {menuItems.map((item, index) => (
            <li key={index} className="flex items-center p-4 text-white hover:bg-[#F66435]/75">
              {item.icon}
              {isOpen && <Link to={item.path} className="ml-4">{item.name}</Link>}
            </li>
          ))}
        </ul>
      </div>
      
    </div>
  );
};

export default Sidebar;
