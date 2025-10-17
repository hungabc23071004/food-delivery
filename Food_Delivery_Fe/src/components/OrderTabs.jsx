import React from "react";

const TABS = [
  { key: "tat-ca", label: "Tất cả" },
  { key: "cho-xac-nhan", label: "Chờ xác nhận" },
  { key: "cho-lay-hang", label: "Chờ lấy hàng" },
  { key: "cho-giao-hang", label: "Chờ giao hàng" },
  { key: "da-giao", label: "Đã giao" },
];

export default function OrderTabs({ active, onChange }) {
  return (
    <aside className="w-56 bg-white rounded-xl shadow flex flex-col gap-2">
      <div className="text-lg font-bold text-orange-600 mb-4 pl-4 pt-4">
        Trạng thái đơn hàng
      </div>
      {TABS.map((tab) => (
        <button
          key={tab.key}
          className={`w-full text-left px-4 py-3 rounded-lg text-base font-semibold transition-all duration-150
            ${
              active === tab.key
                ? "bg-orange-50 text-orange-600"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          onClick={() => onChange(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </aside>
  );
}
