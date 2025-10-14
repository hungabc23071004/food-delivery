import React, { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import {
  connectNotificationWS,
  disconnectNotificationWS,
} from "../../api/Notification";

// ...existing code...

const AdminNotificationList = ({ shopId }) => {
  // Khi có API thật, thay mockNotifications bằng state và gọi API
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!shopId) return;
    // Kết nối WebSocket khi mount, nhận notification mới
    connectNotificationWS(shopId, (notif) => {
      setNotifications((prev) => [notif, ...prev]);
    });
    // TODO: Có thể fetch danh sách notification cũ qua REST API nếu cần
    return () => {
      disconnectNotificationWS();
    };
  }, [shopId]);

  if (loading)
    return <div className="p-6 text-gray-400">Đang tải thông báo...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center gap-2 mb-4">
        <FaBell className="text-orange-500" />
        <h2 className="text-lg font-semibold">Thông báo của shop</h2>
      </div>
      {notifications.length === 0 ? (
        <div className="text-gray-400">Không có thông báo nào.</div>
      ) : (
        <ul className="divide-y">
          {notifications.map((n) => (
            <li
              key={n.id || n._id}
              className={`py-3 flex items-start gap-3 ${
                n.readed || n.read ? "bg-gray-50" : "bg-orange-50"
              }`}
            >
              <span className="flex-1">
                <span className="block font-medium text-gray-800">
                  {n.title || "Thông báo"}
                  <br />
                  {n.message}
                </span>
                <span className="block text-xs text-gray-400 mt-1">
                  {n.createdAt
                    ? new Date(n.createdAt).toLocaleString("vi-VN")
                    : ""}
                </span>
              </span>
              {!(n.readed || n.read) && (
                <span className="text-xs text-orange-500 font-bold">Mới</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminNotificationList;
