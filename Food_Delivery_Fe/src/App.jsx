import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import VerifyAccount from "./components/VerifyAccount";
import UserAccountPage from "./pages/UserAccountPage";
import CategoryPage from "./pages/CategoryPage";
import ShopDetailPage from "./pages/ShopDetailPage";
import LogoutModal from "./components/LogoutModal";
import AdminShopDashboard from "./components/AdminShop/AdminShopDashboard";
import { connectWebSocket, disconnectWebSocket } from "./api/websocketService";

function App() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // ✅ Nếu có token thì kiểm tra hợp lệ
    if (token) {
      try {
        const tokenData = JSON.parse(atob(token.split(".")[1]));
        const currentTime = Date.now() / 1000;

        if (tokenData.exp < currentTime) {
          setShowLogoutModal(true);
          disconnectWebSocket();
          return;
        }

        // ✅ Token còn hạn → kết nối WebSocket
        connectWebSocket();
      } catch (error) {
        console.error("❌ Token invalid:", error);
        setShowLogoutModal(true);
        disconnectWebSocket();
        return;
      }
    }

    // Khi BE báo token hết hạn (qua custom event)
    const handleTokenExpired = () => {
      setShowLogoutModal(true);
      disconnectWebSocket();
    };

    window.addEventListener("tokenExpired", handleTokenExpired);

    return () => {
      window.removeEventListener("tokenExpired", handleTokenExpired);
      disconnectWebSocket(); // cleanup khi rời trang hoặc reload
    };
  }, []);

  // ✅ Khi user xác nhận logout
  const handleLogoutConfirm = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setShowLogoutModal(false);
    disconnectWebSocket();
    navigate("/login");
  };

  // ✅ Khi user đóng modal (vẫn logout)
  const handleLogoutCancel = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setShowLogoutModal(false);
    disconnectWebSocket();
    navigate("/login");
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/verification" element={<VerifyAccount />} />
        <Route path="/account/profile" element={<UserAccountPage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/shop/:id" element={<ShopDetailPage />} />
        <Route path="shop-admin" element={<AdminShopDashboard />} />
      </Routes>

      <LogoutModal
        isOpen={showLogoutModal}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
        title="Phiên đăng nhập hết hạn"
        message="Phiên đăng nhập của bạn đã hết hạn. Bạn cần đăng nhập lại để tiếp tục sử dụng."
        cancelText="Đóng"
        confirmText="Đăng nhập lại"
      />
    </>
  );
}

export default App;
