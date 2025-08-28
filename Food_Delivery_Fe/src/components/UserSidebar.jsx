import React from "react";
import { useEffect, useState } from "react";
import { getMyInfo } from "../api/User";
import { FaUser, FaShoppingCart, FaCreditCard } from "react-icons/fa";
const menu = [
  {
    key: "profile",
    label: "Cập nhật tài khoản",
    icon: <FaUser className="mr-2" />,
  },
  {
    key: "orders",
    label: "Thông tin đơn hàng",
    icon: <FaShoppingCart className="mr-2" />,
  },
  {
    key: "payment",
    label: "Phương thức thanh toán",
    icon: <FaCreditCard className="mr-2" />,
  },
];
const UserSidebar = ({ active, onSelect }) => {
  const [user, setUser] = useState({ avatarUrl: "", username: "" });

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getMyInfo();
      if (res && res.result) {
        setUser({
          avatarUrl: res.result.avatarUrl || "",
          username: res.result.username || "",
        });
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="w-72 bg-white rounded-xl shadow-lg p-8 flex flex-col items-center sticky top-8 z-30 transition-transform duration-300 hover:translate-x-2">
      <img
        src={
          user.avatarUrl
            ? `http://localhost:8080/food/uploads/images/${user.avatarUrl}`
            : "https://tse1.mm.bing.net/th/id/OIP.C6kSV1Gpk1wAWUnp-K_ePQAAAA?rs=1&pid=ImgDetMain&o=7&rm=3"
        }
        alt="avatar"
        className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-[#cc3333] shadow"
      />
      <div className="font-bold text-xl mb-8 text-center text-blue-800">
        {user.username}
      </div>
      <ul className="w-full space-y-2">
        {menu.map((item) => (
          <li
            key={item.key}
            className={`flex items-center p-2 rounded cursor-pointer transition ${
              active === item.key
                ? "bg-red-100 text-red-600 font-semibold"
                : "hover:bg-gray-100 text-gray-700"
            }`}
            onClick={() => onSelect(item.key)}
          >
            {item.icon}
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserSidebar;
