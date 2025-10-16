import React, { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import { subscribe, unsubscribe } from "../../api/WebsocketService";
import { fetchNotifications, markAsRead } from "../../api/NotificationApi";

const AdminNotificationList = ({ shopId }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // backend 1-based
  const pageSize = 5;
  const [totalPages, setTotalPages] = useState(1);
  const [hasNew, setHasNew] = useState(false);

  // 📥 Hàm tải danh sách thông báo theo trang
  const loadNotifications = async (pageNum = 1) => {
    if (!shopId) return;
    try {
      setLoading(true);
      setError(null);
      const data = await fetchNotifications(shopId, pageNum, pageSize);
      // Lấy notifications từ result.content (BE đã phân trang)
      const arr = Array.isArray(data?.result?.content)
        ? data.result.content
        : [];
      setNotifications(arr);
      // Lấy số trang từ BE (nếu có), luôn ưu tiên số trang từ BE
      if (typeof data?.result?.totalPages === "number") {
        setTotalPages(data.result.totalPages);
      } else {
        console.log("Không thể lấy số trang từ backend, sử dụng mặc định là 1");
        setTotalPages(1);
      }
      setHasNew(false);
    } catch {
      setError("Không thể tải thông báo.");
    } finally {
      setLoading(false);
    }
  };

  // 🔁 Gọi API mỗi khi shopId hoặc page thay đổi
  useEffect(() => {
    loadNotifications(page);
  }, [shopId, page]);

  // 🔔 Lắng nghe WebSocket thông báo mới
  useEffect(() => {
    if (!shopId) return;
    const topic = `/topic/notifications/${shopId}`;
    subscribe(topic, (notif) => {
      setNotifications((prev) => {
        // Nếu thông báo đã tồn tại → bỏ qua
        if (prev.some((n) => n.id === notif.id)) return prev;

        if (page === 1) {
          // Đang ở trang đầu → thêm thông báo mới vào đầu danh sách
          const newList = [notif, ...prev];
          return newList.slice(0, pageSize); // chỉ giữ tối đa 5 thông báo
        } else {
          // Nếu đang ở trang khác → hiển thị badge "Có thông báo mới"
          setHasNew(true);
          return prev;
        }
      });
    });
    return () => unsubscribe(topic);
  }, [shopId, page]);

  // ⏱ Tự động đồng bộ mỗi 3 phút (chỉ khi đang ở trang 1)
  useEffect(() => {
    const interval = setInterval(() => {
      if (page === 1) {
        loadNotifications(1);
      }
    }, 180000);
    return () => clearInterval(interval);
  }, [shopId, page]);

  // ✅ Đánh dấu thông báo đã đọc
  const handleMarkAsRead = async (id) => {
    try {
      await markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, readed: true } : n))
      );
    } catch (e) {
      console.error("Lỗi đánh dấu đã đọc:", e);
    }
  };

  if (loading)
    return <div className="p-6 text-gray-400">Đang tải thông báo...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6 relative">
      <div className="flex items-center gap-2 mb-4">
        <FaBell className="text-orange-500" />
        <h2 className="text-lg font-semibold">Thông báo của shop</h2>
      </div>

      {/* 🔔 Badge hiển thị khi có thông báo mới */}
      {hasNew && (
        <div
          className="absolute top-4 right-6 bg-orange-500 text-white text-xs px-3 py-1 rounded-full shadow cursor-pointer"
          onClick={() => {
            setPage(1);
            loadNotifications(1);
          }}
        >
          Có thông báo mới
        </div>
      )}

      {notifications.length === 0 ? (
        <div className="text-gray-400">Không có thông báo nào.</div>
      ) : (
        <>
          <ul className="flex flex-col gap-2">
            {notifications.map((n) => (
              <li
                key={n.id || n._id}
                className={`flex items-start gap-3 rounded-lg shadow-sm transition-all border border-gray-100 px-4 py-3 relative group
                  ${
                    n.readed
                      ? "bg-white"
                      : "bg-yellow-50 hover:bg-yellow-100 cursor-pointer"
                  }`}
                onClick={() => !n.readed && handleMarkAsRead(n.id)}
              >
                <FaBell
                  className={`mt-1 ${
                    n.readed
                      ? "text-gray-300"
                      : "text-orange-400 animate-bounce group-hover:animate-none"
                  }`}
                  size={20}
                />
                <span className="flex-1 min-w-0">
                  <span
                    className={`block font-semibold text-base truncate ${
                      n.readed ? "text-gray-500" : "text-gray-900"
                    }`}
                  >
                    {n.title || "Thông báo"}
                  </span>
                  <span
                    className={`block text-sm mt-1 whitespace-pre-line ${
                      n.readed ? "text-gray-400" : "text-gray-700"
                    }`}
                  >
                    {n.message}
                  </span>
                  <span className="block text-xs text-gray-400 mt-1">
                    {n.createdAt
                      ? new Date(n.createdAt).toLocaleString("vi-VN")
                      : ""}
                  </span>
                </span>
                {!n.readed && (
                  <span className="absolute top-2 right-4 text-xs font-bold text-white bg-orange-500 rounded-full px-2 py-0.5 shadow">
                    Mới
                  </span>
                )}
              </li>
            ))}
          </ul>
          {/* 📄 Pagination */}
          <div className="flex justify-center gap-2 mt-6">
            <button
              className="px-3 py-1 rounded border bg-white hover:bg-gray-100 disabled:opacity-50"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Trang trước
            </button>
            <span className="px-2 py-1 text-sm">
              {page} / {totalPages}
            </span>
            <button
              className="px-3 py-1 rounded border bg-white hover:bg-gray-100 disabled:opacity-50"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
            >
              Trang sau
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminNotificationList;
