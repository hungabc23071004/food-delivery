import React, { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";

// Giả sử bạn có API này, nếu chưa có thì sẽ cần bổ sung ở backend và file api
// import { getShopNotifications } from "../../api/Notification";

const mockNotifications = [
  {
    id: 1,
    message: "Bạn có đơn hàng mới!",
    createdAt: "2025-10-14T09:00:00",
    read: false,
  },
  {
    id: 2,
    message: "Khách hàng đã thanh toán đơn hàng #1234.",
    createdAt: "2025-10-13T15:30:00",
    read: true,
  },
];

const AdminNotificationList = ({ shopId }) => {
  // Khi có API thật, thay mockNotifications bằng state và gọi API
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!shopId) return;
    setLoading(true);
    // getShopNotifications(shopId)
    //   .then((res) => setNotifications(res.result || []))
    //   .catch(() => setError("Không thể tải thông báo."))
    //   .finally(() => setLoading(false));
    setTimeout(() => {
      setNotifications(mockNotifications);
      setLoading(false);
    }, 500);
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
              key={n.id}
              className={`py-3 flex items-start gap-3 ${
                n.read ? "bg-gray-50" : "bg-orange-50"
              }`}
            >
              <span className="flex-1">
                <span className="block font-medium text-gray-800">
                  {n.message}
                </span>
                <span className="block text-xs text-gray-400 mt-1">
                  {new Date(n.createdAt).toLocaleString("vi-VN")}
                </span>
              </span>
              {!n.read && (
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
