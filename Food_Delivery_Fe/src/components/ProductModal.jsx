import React, { useState, useRef, useEffect } from "react";
import { addCartItem } from "../api/Cart";

const ProductModal = ({ product, onClose, onCartChange }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);

  // Đóng khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleToggleOption = (groupId, optId) => {
    setSelectedOptions((prev) => {
      const current = prev[groupId] || [];
      return current.includes(optId)
        ? { ...prev, [groupId]: current.filter((id) => id !== optId) }
        : { ...prev, [groupId]: [...current, optId] };
    });
  };

  const calcTotalPrice = () => {
    let total = (product.price || 0) * quantity;
    product.optionGroups?.forEach((g) => {
      (selectedOptions[g.id] || []).forEach((optId) => {
        const opt = g.options.find((o) => o.id === optId);
        if (opt?.extraPrice) total += opt.extraPrice * quantity;
      });
    });
    return total;
  };

  const handleAdd = async () => {
    setLoading(true);
    try {
      const res = await addCartItem({
        foodId: product.id,
        quantity,
        optionIds: Object.values(selectedOptions).flat(),
      });
      if (res.data?.result) onCartChange(res.data.result);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 animate-fadeIn">
      <div
        ref={modalRef}
        className="bg-white rounded-xl p-6 min-w-[320px] max-w-[90vw] relative"
      >
        <button
          className="absolute top-2 right-2 text-gray-500 text-xl"
          onClick={onClose}
        >
          ×
        </button>

        <div className="flex items-center mb-4">
          <img
            src={`http://localhost:8080/food/uploads/images/${
              product.images?.[0] ?? "default.png"
            }`}
            alt={product.name}
            className="w-20 h-20 object-cover rounded-lg mr-3"
          />
          <div>
            <p className="font-semibold">{product.name}</p>
            <p className="text-gray-500 text-sm">{product.description}</p>
            <p className="text-red-500 font-bold">
              {(product.price ?? 0).toLocaleString()}đ
            </p>
          </div>
        </div>

        {/* Số lượng */}
        <div className="flex justify-end mb-4">
          <div className="flex border border-orange-400 rounded-md overflow-hidden">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-3 text-orange-500"
            >
              −
            </button>
            <input
              value={quantity}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "") setQuantity("");
                else if (/^\d+$/.test(val)) setQuantity(Number(val));
              }}
              onBlur={() => {
                if (!quantity || quantity < 1) setQuantity(1);
              }}
              className="w-10 text-center outline-none"
            />
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="px-3 text-orange-500"
            >
              +
            </button>
          </div>
        </div>

        {/* Options */}
        {product.optionGroups?.map((g) => (
          <div key={g.id} className="mb-3">
            <p className="font-semibold">{g.name}</p>
            {g.options.map((opt) => (
              <label
                key={opt.id}
                className="flex justify-between py-1 cursor-pointer"
              >
                <span>
                  {opt.optionName} (+{(opt.extraPrice ?? 0).toLocaleString()}đ)
                </span>
                <input
                  type="checkbox"
                  checked={selectedOptions[g.id]?.includes(opt.id) || false}
                  onChange={() => handleToggleOption(g.id, opt.id)}
                  className="accent-orange-500"
                />
              </label>
            ))}
          </div>
        ))}

        {/* Footer */}
        <div className="flex justify-between mt-4">
          <span className="font-bold text-orange-600">
            Tổng: {calcTotalPrice().toLocaleString()}đ
          </span>
          <button
            onClick={handleAdd}
            disabled={loading}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 disabled:opacity-60"
          >
            {loading ? "Đang thêm..." : "Xác nhận"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
