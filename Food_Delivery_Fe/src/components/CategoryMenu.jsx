import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = [
  { icon: "🔥", text: "Phổ biến" },
  { icon: "🥟", text: "Bánh truyền thống" },
  { icon: "🍲", text: "Lẩu & Nướng" },
  { icon: "🍚", text: "Cơm" },
  { icon: "🍢", text: "Đồ ăn vặt" },
  { icon: "🍰", text: "Tráng miệng" },
  { icon: "🧁", text: "Bánh Âu Á" },
  { icon: "🥦", text: "Đồ chay" },
  { icon: "🍜", text: "Bún/Phở/Mỳ" },
  { icon: "🥣", text: "Cháo/Súp" },
];

const CategoryMenu = ({ activeIndex, setActiveIndex }) => {
  const navigate = useNavigate();
  return (
    <div
      className="w-44 bg-white border border-orange-300 rounded-2xl shadow-lg h-full overflow-y-auto pt-0 ml-6 "
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {/* Ẩn scrollbar trên Chrome, Edge */}
      <style>{`
        .category-menu::-webkit-scrollbar { display: none; }
      `}</style>
      <div className="flex items-center gap-3 px-3 py-4 mb-2">
        <span
          className="flex items-center justify-center text-xl text-orange-500 cursor-pointer"
          style={{ width: "1.5em" }}
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="w-6 h-6" />
        </span>
        {/* giữ chỗ cho text để thẳng hàng */}
        <span className="ml-2" style={{ visibility: "hidden" }}>
          .
        </span>
      </div>
      {categories.map((cat, index) => (
        <div
          key={index}
          onClick={() => setActiveIndex(index)}
          className={`flex items-center gap-3 px-3 py-3 rounded cursor-pointer mb-2 transition-all
          ${
            activeIndex === index
              ? "text-red-500 font-semibold bg-orange-50"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <span
            className="text-xl flex items-center justify-center"
            style={{ width: "1.5em" }}
          >
            {cat.icon}
          </span>
          <span className="ml-2">{cat.text}</span>
        </div>
      ))}
    </div>
  );
};

export default CategoryMenu;
