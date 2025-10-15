import React, { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import { subscribe, unsubscribe } from "../../api/WebsocketService";
import { fetchNotifications } from "../../api/NotificationApi";
import axios from "axios";

// ...existing code...

const AdminNotificationList = ({ shopId }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const pageSize = 10;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!shopId) return;
    setLoading(true);
    setError(null);
    fetchNotifications(shopId)
      .then((data) => {
        // Nếu API trả về result là mảng (không phải paginated)
        const arr = Array.isArray(data?.result) ? data.result : [];
        setNotifications(arr);
        setTotalPages(Math.max(1, Math.ceil(arr.length / pageSize)));
      })
      .catch(() => setError("Không thể tải thông báo."))
      .finally(() => setLoading(false));

    // Lắng nghe notification mới qua WebSocket
    const topic = `/topic/notifications/${shopId}`;
    subscribe(topic, (notif) => {
      setNotifications((prev) => [notif, ...prev]);
    });
    return () => {
      unsubscribe(topic);
    };
  }, [shopId]);

  // Đánh dấu đã đọc notification
  const markAsRead = async (id) => {
    try {
      await axios.put(
        `/food/notifications/${id}/read`,
        {},
        {
          headers: localStorage.getItem("accessToken")
            ? { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
            : {},
        }
      );
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, readed: true } : n))
      );
    } catch (e) {
      // Có thể show toast lỗi nếu muốn
    }
  };

  if (loading)
    return <div className="p-6 text-gray-400">Đang tải thông báo...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  // Phân trang phía client
  const pagedNotifications = notifications.slice(
    page * pageSize,
    (page + 1) * pageSize
  );

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center gap-2 mb-4">
        <FaBell className="text-orange-500" />
        <h2 className="text-lg font-semibold">Thông báo của shop</h2>
      </div>
      {pagedNotifications.length === 0 ? (
        <div className="text-gray-400">Không có thông báo nào.</div>
      ) : (
        <>
          <ul className="flex flex-col gap-2">
            {pagedNotifications.map((n) => (
              <li
                key={n.id || n._id}
                className={`flex items-start gap-3 rounded-lg shadow-sm transition-all border border-gray-100 px-4 py-3 relative group
                  ${
                    n.readed === true
                      ? "bg-white"
                      : "bg-yellow-50 hover:bg-yellow-100 cursor-pointer"
                  }`}
                onClick={() => {
                  if (!n.readed) markAsRead(n.id);
                }}
              >
                <span className="mt-1">
                  <FaBell
                    className={
                      n.readed === true
                        ? "text-gray-300"
                        : "text-orange-400 animate-bounce group-hover:animate-none"
                    }
                    size={20}
                  />
                </span>
                <span className="flex-1 min-w-0">
                  <span
                    className={`block font-semibold text-base truncate ${
                      n.readed === true ? "text-gray-500" : "text-gray-900"
                    }`}
                  >
                    {n.title || "Thông báo"}
                  </span>
                  <span
                    className={`block text-sm mt-1 whitespace-pre-line ${
                      n.readed === true ? "text-gray-400" : "text-gray-700"
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
                {n.readed !== true && (
                  <span className="absolute top-2 right-4 text-xs font-bold text-white bg-orange-500 rounded-full px-2 py-0.5 shadow">
                    Mới
                  </span>
                )}
              </li>
            ))}
          </ul>
          {/* Pagination controls */}
          <div className="flex justify-center gap-2 mt-6">
            <button
              className="px-3 py-1 rounded border bg-white hover:bg-gray-100 disabled:opacity-50"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
            >
              Trang trước
            </button>
            <span className="px-2 py-1 text-sm">
              {page + 1} / {totalPages}
            </span>
            <button
              className="px-3 py-1 rounded border bg-white hover:bg-gray-100 disabled:opacity-50"
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
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
