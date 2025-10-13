import React from "react";
import {
  FaStore,
  FaBoxOpen,
  FaUser,
  FaUtensils,
  FaClipboardList,
  FaCog,
  FaSignOutAlt,
  FaBell,
  FaRegClock,
} from "react-icons/fa";

const sidebarItems = [
  { icon: <FaStore />, label: "Dashboard" },
  { icon: <FaUtensils />, label: "Products" },
  { icon: <FaClipboardList />, label: "Category" },
  { icon: <FaBoxOpen />, label: "Orders" },
  { icon: <FaUser />, label: "Customers" },
  { icon: <FaRegClock />, label: "History" },
  { icon: <FaCog />, label: "Settings" },
  { icon: <FaBell />, label: "Notifications" },
  { icon: <FaSignOutAlt />, label: "Logout" },
];

const AdminSidebar = ({ selected, onMenuSelect }) => (
  <aside className="w-56 bg-white border-r flex flex-col py-6 px-3 min-h-screen">
    <div className="mb-8 flex items-center gap-2 px-2">
      <FaStore className="text-orange-500 text-2xl" />
      <span className="font-bold text-lg text-orange-600">Shop Admin</span>
    </div>
    <nav className="flex-1">
      {sidebarItems.map((item, idx) => (
        <div
          key={item.label}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg mb-1 cursor-pointer hover:bg-orange-50 text-gray-700 transition ${
            selected === item.label
              ? "bg-orange-100 text-orange-600 font-semibold"
              : ""
          }`}
          onClick={() => onMenuSelect && onMenuSelect(item.label)}
        >
          <span className="text-lg">{item.icon}</span>
          <span className="text-sm">{item.label}</span>
        </div>
      ))}
    </nav>
  </aside>
);

export default AdminSidebar;
