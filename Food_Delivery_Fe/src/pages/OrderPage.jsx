import React, { useEffect, useState } from "react";
import OrderItem from "../components/OrderItem";
import OrderTabs from "../components/OrderTabs";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { getOrdersByUserId } from "../api/Order";

// ---------------- Component chính ----------------
export default function OrderPage() {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("cho-xac-nhan");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getOrdersByUserId(page, size)
      .then((res) => {
        setOrders(res.result?.content || []);
        setTotalPages(res.result?.totalPages || 1);
        setTotalElements(res.result?.totalElements || 0);
      })
      .finally(() => setLoading(false));
  }, [page, size]);

  // Map giữa key tab và trạng thái đơn hàng
  const tabStatusMap = {
    "cho-xac-nhan": "Chờ xác nhận",
    "cho-lay-hang": "Chờ lấy hàng",
    "cho-giao-hang": "Chờ giao hàng",
    "da-giao": "Đã giao",
  };

  // Hiện tất cả đơn hàng ở mọi tab (không lọc)
  const filteredOrders = orders;

  return (
    <>
      <Header />

      <main className="min-h-[60vh] bg-gray-50 py-10">
        <div className="max-w-6xl mx-auto flex gap-8 p-4">
          {/* Sidebar trạng thái đơn */}
          <OrderTabs active={activeTab} onChange={setActiveTab} />

          {/* Nội dung chính */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Đơn hàng của tôi
            </h2>

            {loading ? (
              <div className="text-center text-gray-400 py-10">
                Đang tải đơn hàng...
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="text-center text-gray-400 py-10">
                Không có đơn hàng nào ở trạng thái này.
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {filteredOrders.map((order) => (
                  <OrderItem
                    key={order.id}
                    order={order}
                    onViewDetail={() =>
                      navigate("/order-detail", { state: { order } })
                    }
                  />
                ))}
              </div>
            )}
            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-8">
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
        </div>
      </main>

      <Footer />
    </>
  );
}
