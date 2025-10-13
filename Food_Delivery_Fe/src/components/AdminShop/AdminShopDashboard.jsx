import React, { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminProductTable from "./AdminProductTable";
import AdminCategoryTable from "./AdminCategoryTable";
import AdminNotificationList from "./AdminNotificationList";
import { getMyShop } from "../../api/Shop";

// (Tuỳ chọn) dữ liệu giả cho phần Customers
const mockData = [
  {
    id: 1,
    profile: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Mendocart",
    email: "mendocart@gmail.com",
    products: 120,
    totalSell: 1150,
    status: "Active",
    joinOn: "19/09/2022",
  },
  {
    id: 2,
    profile: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Margaret Ak",
    email: "margaretak@gmail.com",
    products: 99,
    totalSell: 1998,
    status: "Active",
    joinOn: "25/02/2018",
  },
  {
    id: 3,
    profile: "https://randomuser.me/api/portraits/women/68.jpg",
    name: "Samantha",
    email: "samantha@gmail.com",
    products: 125,
    totalSell: 10225,
    status: "Active",
    joinOn: "12/05/2020",
  },
  {
    id: 4,
    profile: "https://randomuser.me/api/portraits/men/45.jpg",
    name: "Isabella Jhon",
    email: "isabellajhon@gmail.com",
    products: 120,
    totalSell: 1150,
    status: "Active",
    joinOn: "19/09/2022",
  },
  {
    id: 5,
    profile: "https://randomuser.me/api/portraits/women/12.jpg",
    name: "Jessicaren",
    email: "jessicaren@gmail.com",
    products: 99,
    totalSell: 1998,
    status: "Active",
    joinOn: "25/02/2018",
  },
];

const AdminShopDashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🧩 Lấy thông tin cửa hàng của người dùng hiện tại
  useEffect(() => {
    const fetchShop = async () => {
      setLoading(true);
      try {
        const res = await getMyShop();
        setShop(res?.result || null);
        setError("");
      } catch (err) {
        setShop(null);
        setError("Bạn chưa đăng ký nhà hàng.");
      } finally {
        setLoading(false);
      }
    };
    fetchShop();
  }, []);

  // ⏳ Hiển thị loading khi đang tải
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Đang tải thông tin cửa hàng...
      </div>
    );
  }

  // ❌ Hiển thị lỗi nếu chưa có shop
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500 font-semibold">
        {error}
      </div>
    );
  }

  // ✅ Giao diện chính
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar quản trị */}
      <AdminSidebar selected={selectedMenu} onMenuSelect={setSelectedMenu} />

      {/* Nội dung chính */}
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-1">Pages</h2>
          <div className="text-sm text-gray-400">Home / {selectedMenu}</div>
        </div>

        {/* Hiển thị từng trang tương ứng */}
        {selectedMenu === "Dashboard" && (
          <div className="bg-white rounded-lg shadow p-6 text-gray-500 text-center">
            Chào mừng bạn đến với bảng điều khiển quản trị của shop{" "}
            <span className="font-semibold text-gray-800">{shop?.name}</span>.
          </div>
        )}

        {selectedMenu === "Products" && shop?.id ? (
          <AdminProductTable shopId={shop.id} />
        ) : null}
        {selectedMenu === "Category" && shop?.id ? (
          <AdminCategoryTable shopId={shop.id} />
        ) : null}
        {selectedMenu === "Notifications" && shop?.id ? (
          <AdminNotificationList shopId={shop.id} />
        ) : null}

        {selectedMenu === "Orders" && (
          <div className="bg-white rounded-lg shadow p-6 text-gray-400 text-center">
            Chưa có bảng đơn hàng hoặc thông báo.
          </div>
        )}

        {selectedMenu === "Customers" && (
          <div className="bg-white rounded-lg shadow p-6 text-gray-400 text-center">
            (Giả lập) Dữ liệu khách hàng sẽ hiển thị ở đây.
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminShopDashboard;
