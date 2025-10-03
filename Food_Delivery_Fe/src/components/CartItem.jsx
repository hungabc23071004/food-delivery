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
      {/* Số lượng và nút tăng giảm */}
      <div className="flex flex-col items-center gap-2">
        <button
          className="w-7 h-7 rounded bg-orange-100 text-orange-600 font-bold text-lg flex items-center justify-center hover:bg-orange-200"
          onClick={onIncrease}
        >
          +
        </button>
        <span className="font-semibold text-base">{item.quantity}</span>
        <button
          className="w-7 h-7 rounded bg-orange-100 text-orange-600 font-bold text-lg flex items-center justify-center hover:bg-orange-200"
          onClick={onDecrease}
        >
          -
        </button>
      </div>
    </div>
  );
};

export default CartItem;
