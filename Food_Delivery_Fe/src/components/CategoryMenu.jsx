import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAllCategoryRoot } from "../api/Category";

const CategoryMenu = ({ activeIndex, setActiveIndex, onCategoryClick }) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCategoryRoot();
        const cats = res.result || [];
        setCategories(cats);
        // Gọi hàm onCategoryClick cho category đầu tiên nếu có
        if (cats.length > 0 && onCategoryClick) {
          onCategoryClick(cats[0].id, 0);
        }
      } catch (err) {
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

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
        <span className="ml-2" style={{ visibility: "hidden" }}>
          .
        </span>
      </div>
      {categories.map((cat, index) => (
        <div
          key={cat.id}
          onClick={() => {
            setActiveIndex(index);
            if (onCategoryClick) {
              onCategoryClick(cat.id, index);
            }
          }}
          className={`flex items-center gap-3 px-3 py-3 rounded cursor-pointer mb-2 transition-all
          ${
            activeIndex === index
              ? "text-red-500 font-semibold bg-orange-50"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          {/* Nếu có logoUrl thì render hình ảnh, nối với domain backend */}
          {cat.logoUrl ? (
            <img
              src={`http://localhost:8080/food/uploads/images/${cat.logoUrl}`}
              alt={cat.name}
              className="w-7 h-7 object-contain"
            />
          ) : (
            <span
              className="text-xl flex items-center justify-center"
              style={{ width: "1.5em" }}
            >
              {/* icon fallback nếu cần */}
            </span>
          )}
          <span className="ml-2">{cat.name}</span>
        </div>
      ))}
    </div>
  );
};

export default CategoryMenu;
