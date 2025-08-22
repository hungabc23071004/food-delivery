import React, { useState } from "react";
import { MapPin, ShoppingCart, User, Search, Moon, Sun } from "lucide-react";

const Header = () => {
  const [mode, setMode] = useState("Giao hàng");
  const cartCount = 2;

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
          <button
            onClick={() => setMode("Giao hàng")}
            className={`px-4 py-1 rounded-full text-base font-medium border transition-all duration-150 ${
              mode === "Giao hàng"
                ? "bg-orange-500 text-white border-orange-500 shadow-sm"
                : "bg-orange-50 text-orange-500 border-transparent hover:bg-orange-100"
            }`}
          >
            Giao hàng
          </button>
          <button
            onClick={() => setMode("Tự lấy")}
            className={`px-4 py-1 rounded-full text-base font-medium border transition-all duration-150 ${
              mode === "Tự lấy"
                ? "bg-orange-500 text-white border-orange-500 shadow-sm"
                : "bg-orange-50 text-orange-500 border-transparent hover:bg-orange-100"
            }`}
          >
            Tự lấy
          </button>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-6 ml-8">
          {/* Clock icon */}
          <span className="text-orange-500">
            <span className="inline-block align-middle">🕒</span>
          </span>
          {/* Cart */}
          <div className="relative cursor-pointer">
            <ShoppingCart size={24} className="text-orange-500" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full px-1.5 border border-white">
                {cartCount}
              </span>
            )}
          </div>
          {/* User */}
          <button className="hover:bg-orange-50 p-2 rounded-full text-orange-500">
            <User size={24} />
          </button>
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
