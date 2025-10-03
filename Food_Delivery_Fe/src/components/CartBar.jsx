import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import CartItem from "./CartItem";

const fakeCart = [
  {
    id: 1,
    name: "Cơm Trộn Xúc Xích",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=80&q=80",
    option: "Xúc Xích Thêm 70gr",
    note: "",
    price: 68500,
    originalPrice: 100000,
    quantity: 1,
  },
  {
    id: 2,
    name: "Cơm Trộn Gà",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=80&q=80",
    option: "",
    note: "",
    price: 40000,
    originalPrice: 80000,
    quantity: 1,
  },
  {
    id: 3,
    name: "Cơm Trộn Thịt Bò",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=80&q=80",
    option: "Thịt Bò Thêm (70gr)",
    note: "",
    price: 74000,
    originalPrice: 110000,
    quantity: 1,
  },
];

const CartBar = () => {
  const [showModal, setShowModal] = useState(false);
  const cartItems = fakeCart; // sau này thay bằng state thực tế
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const originalTotal = cartItems.reduce(
    (sum, item) => sum + (item.originalPrice || item.price) * item.quantity,
    0
  );

  // Các hàm xử lý (demo)
  const handleIncrease = () => {};
  const handleDecrease = () => {};
  const handleRemove = () => {};
  const handleClear = () => {};
  const handleCheckout = () => alert("Đặt hàng!");

  return (
    <>
      <div className="fixed bottom-0 left-0 w-full bg-white shadow border-t-2 border-orange-300 z-50 flex items-center justify-between px-4 md:px-8 py-2 animate-slide-up">
        <div className="font-bold text-orange-600 text-base flex items-center gap-2 relative">
          <FaShoppingCart size={24} />
          <span>Giỏ hàng của bạn</span>
          {/* Badge số lượng */}
          <span className="absolute -top-2 left-5 bg-orange-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5 shadow">
            {cartCount}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-orange-600 font-bold text-base">
            {total.toLocaleString()}đ
          </span>
          <button
            className="bg-orange-500 text-white px-4 py-1.5 rounded-lg font-semibold hover:bg-orange-600 transition text-sm"
            onClick={() => setShowModal(true)}
          >
            Xem giỏ hàng
          </button>
        </div>
      </div>
      {/* Modal giỏ hàng */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end md:items-center justify-center">
          <div className="bg-white rounded-t-3xl md:rounded-3xl shadow-2xl w-full md:w-[480px] max-h-[90vh] flex flex-col animate-slide-up relative">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <button
                className="text-red-500 font-semibold"
                onClick={handleClear}
              >
                Xóa tất cả
              </button>
              <div className="font-bold text-lg">Giỏ hàng</div>
              <button
                className="text-2xl text-gray-400 hover:text-red-500"
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
            </div>
            {/* Danh sách món */}
            <div className="flex-1 overflow-y-auto px-6 py-2 divide-y bg-gradient-to-b from-white to-orange-50">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                  <svg width="48" height="48" fill="none" viewBox="0 0 24 24">
                    <path fill="#fbbf24" d="M7 18a5 5 0 0 0 10 0H7Z" />
                    <path
                      stroke="#fbbf24"
                      strokeWidth="2"
                      d="M12 2v2m6.364 1.636-1.414 1.414M22 12h-2M4 12H2m3.05 6.364 1.414-1.414M4.222 4.222l1.414 1.414"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="8"
                      stroke="#fbbf24"
                      strokeWidth="2"
                    />
                  </svg>
                  <div className="mt-4 text-lg">
                    Chưa có món nào trong giỏ hàng.
                  </div>
                </div>
              ) : (
                cartItems.map((item, idx) => (
                  <CartItem
                    key={item.id || idx}
                    item={item}
                    onIncrease={() => handleIncrease(item)}
                    onDecrease={() => handleDecrease(item)}
                    onRemove={() => handleRemove(item)}
                  />
                ))
              )}
            </div>
            {/* Footer */}
            <div className="px-6 py-4 border-t bg-white sticky bottom-0 z-10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 line-through text-base">
                  {originalTotal.toLocaleString()}đ
                </span>
                <span className="text-orange-600 font-extrabold text-xl drop-shadow">
                  {total.toLocaleString()}đ
                </span>
              </div>
              <button
                className="w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white py-2 rounded-xl font-bold text-lg shadow-lg hover:scale-[1.02] hover:from-orange-500 hover:to-orange-600 transition-all duration-200 flex items-center justify-center gap-2"
                onClick={handleCheckout}
                disabled={cartItems.length === 0}
              >
                <FaShoppingCart size={18} /> Giao hàng
              </button>
            </div>
            <div className="text-xs text-gray-400 text-center py-2">
              Giá món đã bao gồm thuế, nhưng chưa bao gồm phí giao hàng và các
              phí khác.
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartBar;
