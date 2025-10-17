import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/Authentication";
import {
  MapPin,
  User,
  Search,
  Calendar,
  Wallet,
  UserCircle,
  Power,
  ChevronDown,
  Store,
} from "lucide-react";
import { GiFoodTruck } from "react-icons/gi";

// Importing useNavigate for routing
const Header = () => {
  const [mode, setMode] = useState("Giao hàng");

  const cartCount = 2;
  const [showUserMenu, setShowUserMenu] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("accessToken");
  let username = "";
  if (isLoggedIn) {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      username = user?.username || "";
    } catch {}
  }

  const handleLogout = async () => {
    const token = localStorage.getItem("accessToken");
    console.log("Logout token:", token);
    try {
      await logout(token);
    } catch (err) {
      console.error("Logout error:", err);
    }
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    window.location.reload();
  };

  // 👉 Đóng menu khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 shadow border-b-2 border-orange-500 bg-white">
      <div className="max-w-7xl mx-auto flex items-center px-8 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2 mr-8">
          <span className="text-2xl font-bold text-orange-500">🍴</span>
          <span className="font-bold text-xl text-orange-500">FoodGo</span>
        </div>

        {/* Search */}
        <div className="flex-1 flex items-center">
          <div className="relative w-full max-w-xl">
            <input
              type="text"
              placeholder="Tìm quán ăn, món, địa chỉ."
              className="w-full border rounded-full px-4 py-2 pl-10 text-base focus:outline-none focus:ring-2 border-orange-200 focus:ring-orange-200"
            />
            <Search
              size={20}
              className="absolute left-3 top-2.5 text-orange-400"
            />
          </div>
        </div>

        {/* Mode switch */}
        <div className="flex items-center gap-2 ml-8">
          {["Giao hàng", "Tự lấy"].map((item) => (
            <button
              key={item}
              onClick={() => setMode(item)}
              className={`px-4 py-1 rounded-full text-base font-medium border transition-all duration-150 ${
                mode === item
                  ? "bg-orange-500 text-white border-orange-500 shadow-sm"
                  : "bg-orange-50 text-orange-500 border-transparent hover:bg-orange-100"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-6 ml-8">
          {/* GiFoodTruck icon cho đơn hàng có tooltip và onClick */}
          <div
            className="relative group cursor-pointer"
            onClick={() => navigate("/orders")}
          >
            <span className="text-orange-500">
              <GiFoodTruck size={30} />
            </span>
            <span className="absolute left-1/2 -translate-x-1/2 mt-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-all duration-150">
              Xem đơn hàng
            </span>
          </div>

          <div className="relative group cursor-pointer">
            {/* Thay ShoppingCart bằng Store */}
            <Store
              size={22}
              className="text-orange-500 cursor-pointer"
              onClick={() => navigate("/shop-admin")}
            />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full px-1.5 border border-white">
                {cartCount}
              </span>
            )}
            <span className="absolute left-1/2 -translate-x-1/2 mt-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-all duration-150">
              Xem cửa hàng của bạn
            </span>
          </div>

          {/* User */}
          <div className="relative flex items-center gap-1" ref={dropdownRef}>
            <button
              className="flex items-center gap-1 hover:bg-orange-50 p-2 rounded-full text-orange-500"
              onClick={() => setShowUserMenu((prev) => !prev)}
            >
              <User size={24} />
              <ChevronDown
                size={18}
                className={`transition-transform duration-200 ${
                  showUserMenu ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
            {isLoggedIn && username && (
              <span className="ml-1 text-orange-500 font-medium">
                {username.length > 12
                  ? username.slice(0, 12) + "..."
                  : username}
              </span>
            )}

            {/* Dropdown menu */}
            {showUserMenu && (
              <div className="absolute left-0 top-full mt-2 w-56 bg-white border rounded shadow-lg z-50">
                {isLoggedIn ? (
                  <>
                    <button
                      className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-orange-50"
                      onClick={() => (window.location.href = "/order-history")}
                    >
                      <Calendar size={20} className="text-green-500" />
                      <span className="font-medium text-gray-700">
                        Lịch sử đơn hàng
                      </span>
                    </button>
                    <button
                      className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-orange-50"
                      onClick={() => (window.location.href = "/voucher-wallet")}
                    >
                      <Wallet size={20} className="text-blue-500" />
                      <span className="font-medium text-gray-700">
                        Ví Voucher
                      </span>
                    </button>
                    <button
                      className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-orange-50"
                      onClick={() => navigate("/account/profile")}
                    >
                      <UserCircle size={20} className="text-orange-400" />
                      <span className="font-medium text-gray-700">
                        Cập nhật tài khoản
                      </span>
                    </button>
                    <button
                      className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-orange-50"
                      onClick={handleLogout}
                    >
                      <Power size={20} className="text-gray-500" />
                      <span className="font-medium text-gray-700">
                        Đăng xuất
                      </span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="block w-full px-4 py-2 text-left hover:bg-orange-50 text-orange-500"
                      onClick={() => (window.location.href = "/login")}
                    >
                      Đăng nhập
                    </button>
                    <button
                      className="block w-full px-4 py-2 text-left hover:bg-orange-50 text-orange-500"
                      onClick={() => (window.location.href = "/register")}
                    >
                      Đăng ký
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Address */}
        <div className="flex items-center gap-1 ml-8 text-orange-500">
          <MapPin size={20} className="text-orange-500" />
          <span className="font-medium">123 Nguyễn Trãi</span>
          <span className="ml-1 text-xs">▼</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
