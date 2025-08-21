import React from "react";

const CouponCard = ({ image, title, locations }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer">
      {/* Hình ảnh */}
      <div className="relative">
        <img src={image} alt={title} className="w-full h-40 object-cover" />
      </div>

      {/* Nội dung */}
      <div className="p-3">
        <h3 className="font-semibold text-gray-800 truncate">{title}</h3>
        <p className="text-sm text-blue-500 mt-1">{locations} địa điểm</p>
      </div>
    </div>
  );
};

export default CouponCard;
