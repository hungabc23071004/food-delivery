import React, { useState } from "react";

const ProductCard = ({ product }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});

  // Toggle chọn option
  const handleToggleOption = (groupId, optionId) => {
    setSelectedOptions((prev) => {
      const current = prev[groupId] || [];
      return current.includes(optionId)
        ? { ...prev, [groupId]: current.filter((id) => id !== optionId) }
        : { ...prev, [groupId]: [...current, optionId] };
    });
  };

  // Tính tổng giá
  const calcTotalPrice = () => {
    let total = product.price || 0;
    product.optionGroups?.forEach((group) => {
      const selected = selectedOptions[group.id] || [];
      selected.forEach((optId) => {
        const opt = group.options.find((o) => o.id === optId);
        if (opt?.extraPrice) total += opt.extraPrice;
      });
    });
    return total.toLocaleString();
  };

  return (
    <>
      {/* Card */}
      <div className="flex border-b py-3">
        {/* Ảnh */}
        <div className="w-24 h-24 flex-shrink-0">
          <img
            src={`http://localhost:8080/food/uploads/images/${
              product.images?.[0] ?? "default.png"
            }`}
            alt={product.name}
            className="w-full h-full object-cover rounded"
          />
        </div>

        {/* Nội dung */}
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
            <span className="text-red-500 font-bold">
              {(product.price ?? 0).toLocaleString()}đ
            </span>
            {product.originalPrice && (
              <span className="line-through text-gray-400 text-sm">
                {product.originalPrice.toLocaleString()}đ
              </span>
            )}
          </div>
          {/* Badge */}
          {product.badge && (
            <span className="inline-block mt-1 text-xs bg-red-100 text-red-500 px-2 py-0.5 rounded">
              {product.badge}
            </span>
          )}
        </div>

        {/* Nút mở modal */}
        <div className="flex items-end">
          <button
            className="bg-orange-500 text-white w-8 h-8 rounded flex items-center justify-center"
            onClick={() => setShowOptions(true)}
          >
            +
          </button>
        </div>
      </div>

      {/* Modal */}
      {showOptions && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setShowOptions(false)} // 👉 click ra ngoài sẽ đóng
        >
          {/* modal box */}
          <div
            className="bg-white rounded-xl shadow-lg p-6 min-w-[320px] max-w-[90vw] relative"
            onClick={(e) => e.stopPropagation()} // 👉 chặn click trong modal làm đóng
          >
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-xl"
              onClick={() => setShowOptions(false)}
            >
              ×
            </button>
            <h3 className="text-lg font-bold mb-4 text-orange-600">
              Chọn thêm cho món: {product.name}
            </h3>

            {/* Option groups */}
            {product.optionGroups?.length > 0 ? (
              product.optionGroups.map((group) => (
                <div key={group.id} className="mb-4">
                  <div className="font-semibold mb-2 text-gray-700">
                    {group.name}
                  </div>
                  <div className="divide-y">
                    {group.options.map((opt) => (
                      <label
                        key={opt.id}
                        className="flex items-center justify-between py-2 cursor-pointer"
                      >
                        <div>
                          <span className="text-base text-gray-800">
                            {opt.optionName}
                          </span>
                          <span className="ml-2 text-gray-500 text-sm">
                            +{(opt.extraPrice ?? 0).toLocaleString()}đ
                          </span>
                        </div>
                        <input
                          type="checkbox"
                          className="w-5 h-5 accent-orange-500"
                          checked={
                            selectedOptions[group.id]?.includes(opt.id) || false
                          }
                          onChange={() => handleToggleOption(group.id, opt.id)}
                        />
                      </label>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-400">Không có lựa chọn thêm.</div>
            )}

            {/* Footer */}
            <div className="mt-6 flex items-center justify-between">
              <span className="font-bold text-orange-600 text-lg">
                Tổng: {calcTotalPrice()}đ
              </span>
              <button
                className="bg-orange-500 text-white px-4 py-2 rounded font-semibold hover:bg-orange-600"
                onClick={() => setShowOptions(false)}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
