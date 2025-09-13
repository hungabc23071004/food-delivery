import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="flex border-b py-3">
      {/* Ảnh món */}
      <div className="w-24 h-24 flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover rounded"
        />
      </div>

      {/* Thông tin món */}
      <div className="flex-1 px-3">
        <h4 className="font-semibold">{product.name}</h4>
        {product.description && (
          <p className="text-sm text-gray-500 truncate">
            {product.description}
          </p>
        )}
        <p className="text-xs text-gray-400">
          {product.sold} đã bán · {product.likes} lượt thích
        </p>
        {product.remaining && (
          <p className="text-xs text-red-500">{product.remaining}</p>
        )}

        {/* Giá */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-red-500 font-bold">{product.price}đ</span>
          <span className="line-through text-gray-400 text-sm">
            {product.originalPrice}đ
          </span>
        </div>

        {/* Badge */}
        {product.badge && (
          <span className="inline-block mt-1 text-xs bg-red-100 text-red-500 px-2 py-0.5 rounded">
            {product.badge}
          </span>
        )}
      </div>

      {/* Nút thêm */}
      <div className="flex items-end">
        <button className="bg-orange-500 text-white w-8 h-8 rounded flex items-center justify-center">
          +
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
