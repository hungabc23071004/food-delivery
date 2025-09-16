import React from "react";
import { MdRestaurantMenu } from "react-icons/md";

const FoodMenu = ({ categories, selectedCategory, onSelect }) => {
  return (
    <div className="w-full bg-transparent">
      <h2 className="text-lg font-bold mb-4 text-orange-600">Thực đơn</h2>
      <ul className="space-y-3">
        {categories.map((cat) => (
          <li
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={`flex items-center gap-3 px-6 py-4 rounded-2xl cursor-pointer text-base font-medium transition-all duration-150 border-2 border-transparent ${
              selectedCategory === cat.id
                ? "bg-orange-50 text-orange-600 font-bold border-orange-300 shadow"
                : "hover:bg-orange-100 hover:text-orange-600"
            }`}
          >
            <MdRestaurantMenu className="text-orange-500 text-xl" />
            <span className="text-xl">{cat.icon}</span> {cat.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FoodMenu;
