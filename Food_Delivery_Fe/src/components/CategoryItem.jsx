import React from "react";

const CategoryItem = ({ image, text }) => (
  <div className="flex flex-col items-center justify-center cursor-pointer bg-white rounded-xl shadow hover:shadow-lg border hover:border-orange-400 transition-all duration-200 p-4 hover:scale-105">
    <img
      src={image}
      alt={text}
      className="w-16 h-16 object-cover rounded-full mb-2"
    />
    <span className="mt-2 text-base font-semibold text-gray-800">{text}</span>
  </div>
);

export default CategoryItem;
