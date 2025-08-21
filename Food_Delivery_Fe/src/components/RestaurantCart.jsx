import React from "react";
import { MapPin, Tag } from "lucide-react";
const RestaurantCart = ({ image, name, address, discount }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      {/* Hình ảnh */}
      <div className="relative">
        <img src={image} alt={name} className="w-full h-40 object-cover" />
        {/* Chấm trạng thái (online) */}
        <span className="absolute top-2 left-2 w-3 h-3 bg-green-500 rounded-full border border-white"></span>
      </div>

      {/* Nội dung */}
      <div className="p-3">
        <h3 className="font-semibold text-gray-800 truncate">{name}</h3>
        <div className="flex items-center text-sm text-gray-500 mt-1">
          <MapPin size={14} className="mr-1" />
          <span className="truncate">{address}</span>
        </div>

        {/* Mã giảm giá */}
        {discount && (
          <div className="flex items-center mt-2 text-red-500 font-medium text-sm bg-red-50 px-2 py-1 rounded-md w-fit">
            <Tag size={14} className="mr-1" />
            Mã giảm {discount}
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantCart;
