import React from "react";

const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
  return (
    <div className="flex items-center border-b py-4 gap-3">
      {/* Ảnh món */}
      <img
        src={item.image}
        alt={item.name}
        className="w-16 h-16 rounded object-cover border"
      />
      {/* Thông tin món */}
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-base truncate">{item.name}</div>
        {item.option && (
          <div className="text-gray-500 text-sm truncate">{item.option}</div>
        )}
        {item.note && (
          <div className="text-xs text-gray-400 mt-1">Ghi chú: {item.note}</div>
        )}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-orange-600 font-bold text-base">
            {item.price.toLocaleString()}đ
          </span>
          {item.originalPrice && (
            <span className="line-through text-gray-400 text-sm">
              {item.originalPrice.toLocaleString()}đ
            </span>
          )}
        </div>
      </div>
      {/* Số lượng và nút tăng giảm ngang - nhỏ hơn */}
      <div className="flex items-center gap-0 bg-white rounded-lg border border-orange-200 px-0.5 py-0.5">
        <button
          className="w-6 h-6 rounded-l bg-orange-50 text-orange-500 font-bold text-base flex items-center justify-center hover:bg-orange-100 focus:outline-none"
          onClick={onDecrease}
        >
          -
        </button>
        <span className="w-6 text-center font-semibold text-sm select-none">
          {item.quantity}
        </span>
        <button
          className="w-6 h-6 rounded-r bg-orange-50 text-orange-500 font-bold text-base flex items-center justify-center hover:bg-orange-100 focus:outline-none"
          onClick={onIncrease}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartItem;
