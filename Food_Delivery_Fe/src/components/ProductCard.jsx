import React from "react";

const ProductCard = ({ product, onCartChange, onOpenModal }) => {
  return (
    <div className="flex justify-between items-center border rounded-2xl p-4 hover:shadow-md transition">
      <div className="flex items-center gap-4">
        {/* Ảnh */}
        <div className="w-24 h-24 flex-shrink-0 flex items-center justify-center relative">
          {Array.isArray(product.images) && product.images.length > 1 ? (
            <div className="grid grid-cols-2 grid-rows-2 gap-0.5 w-full h-full">
              {product.images.slice(0, 4).map((img, idx) => (
                <img
                  key={idx}
                  src={`http://localhost:8080/food/uploads/images/${img}`}
                  alt={product.name}
                  className="object-cover w-full h-full rounded"
                />
              ))}
            </div>
          ) : (
            <img
              src={`http://localhost:8080/food/uploads/images/${
                product.images?.[0] ?? "default.png"
              }`}
              alt={product.name}
              className="w-full h-full object-cover rounded"
            />
          )}
        </div>
        <div>
          <h3 className="font-semibold text-lg">{product.name}</h3>
          <p className="text-gray-500 text-sm">{product.description}</p>
          <p className="text-orange-500 font-bold mt-1">
            {product.price?.toLocaleString()}đ
          </p>
        </div>
      </div>
      <button
        onClick={onOpenModal}
        className="bg-orange-500 text-white w-8 h-8 flex items-center justify-center rounded-lg hover:bg-orange-600"
      >
        +
      </button>
    </div>
  );
};

export default ProductCard;
