import React, { useEffect, useState } from "react";
import { getOrdersByShopId } from "../../api/Order";
import OrderItem from "../OrderItem";

export default function AdminOrderTable({ shopId }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [size] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    console.log("AdminOrderTable shopId:", shopId);
    if (!shopId) return;
    setLoading(true);
    getOrdersByShopId(shopId, page, size)
      .then((res) => {
        console.log("getOrdersByShopId response:", res);
        setOrders(res.result?.content || []);
        setTotalPages(res.result?.totalPages || 1);
      })
      .finally(() => setLoading(false));
  }, [shopId, page, size]);

  if (loading) {
    return (
      <div className="text-gray-400 text-center py-6">Đang tải đơn hàng...</div>
    );
  }
  if (!orders || orders.length === 0) {
    return (
      <div className="text-gray-400 text-center py-6">
        Chưa có đơn hàng nào.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-bold mb-4 text-gray-800">
        Danh sách đơn hàng
      </h3>
      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </div>
      <div className="flex justify-center items-center gap-2 mt-6">
        <button
          className="px-3 py-1 rounded border bg-white text-gray-700 font-semibold disabled:opacity-50"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Trang trước
        </button>
        <span className="mx-2 text-sm">
          Trang {page} / {totalPages}
        </span>
        <button
          className="px-3 py-1 rounded border bg-white text-gray-700 font-semibold disabled:opacity-50"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Trang sau
        </button>
      </div>
    </div>
  );
}
