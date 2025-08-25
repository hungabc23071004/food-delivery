import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UserInfo from "../components/UserInfo";
import UserSidebar from "../components/UserSidebar";
import UserAddress from "../components/UserAddress";

const UserAccountPage = () => {
  const [active, setActive] = useState("profile");

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex w-full max-w-6xl mx-auto mt-8 gap-8 items-start">
        {/* Sidebar */}
        <UserSidebar active={active} onSelect={setActive} />

        {/* Main content */}
        <div className="flex-1">
          <div className="bg-white rounded-xl shadow-lg p-8">
            {active === "profile" && <UserInfo />}
            {active === "orders" && <UserAddress />}
            {active === "payment" && (
              <div className="text-lg font-semibold">
                Phương thức thanh toán
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserAccountPage;
