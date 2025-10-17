import React from "react";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaClipboardList } from "react-icons/fa";

const statusColor = {
  "Đang giao": "bg-yellow-100 text-yellow-700",
  "Đã giao": "bg-green-100 text-green-700",
  "Đã hủy": "bg-gray-100 text-gray-500",
  "Đang xử lý": "bg-blue-100 text-blue-700",
};

export default function OrderItem({ order }) {
  const navigate = useNavigate();

  const handleViewDetail = () => {
    navigate(`/order-detail/${order.id}`);
  };

  const items = order.items || order.orderItems || [];

  return (
    <li className="bg-white rounded-lg shadow-lg border-2 border-orange-200 hover:border-orange-500 transition p-2 sm:p-3 mb-2 flex flex-col gap-1">
      {/* Header */}
      <div className="flex justify-between items-center mb-0.5">
        <div className="flex items-center gap-1">
          <FaClipboardList className="text-orange-500 text-lg" />
          <span className="font-bold text-sm sm:text-base text-orange-700">
            {order.shopName}
          </span>
        </div>
        <span
          className={`px-2 py-0.5 text-xs rounded-full font-bold uppercase tracking-wide shadow-sm ${
            statusColor[order.status] || "bg-gray-100 text-gray-500"
          }`}
        >
          {order.status}
        </span>
      </div>

      {/* Địa chỉ */}
      <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
        <FaMapMarkerAlt className="text-gray-400" />
        <span>{order.shippingAddress?.fullAddress || order.address}</span>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="text-xs mb-1">
        <span className="font-medium text-gray-800">Sản phẩm:</span>
        <ul className="ml-3 mt-0.5">
          {items.slice(0, 2).map((item, idx) => (
            <li
              key={idx}
              className="flex items-center justify-between text-gray-700 text-xs gap-2"
            >
              <span className="flex items-center gap-2">
                <img
                  src={`http://localhost:8080/food/uploads/images/${item.imageUrl}`}
                  alt={item.foodName || item.name}
                  className="w-7 h-7 object-cover rounded border"
                />
                {item.foodName || item.name} x{item.quantity || item.qty}
              </span>
              <span className="text-gray-500">
                {(item.price || 0).toLocaleString()}đ
              </span>
            </li>
          ))}

          {items.length > 2 && (
            <li className="ml-2 text-gray-500 text-xs italic">
              +{items.length - 2} sản phẩm khác
            </li>
          )}
        </ul>
      </div>

      {/* Tổng & nút xem chi tiết */}
      <div className="flex justify-between items-center mt-1">
        <span className="font-bold text-orange-600 text-sm sm:text-base">
          Tổng: {order.total?.toLocaleString()}đ
        </span>
        <button
          className="px-2 py-1 text-xs sm:text-sm rounded bg-orange-500 text-white font-semibold hover:bg-orange-600 transition"
          onClick={handleViewDetail}
        >
          Xem chi tiết
        </button>
      </div>
    </li>
  );
}
