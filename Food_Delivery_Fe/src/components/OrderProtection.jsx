import React from "react";

const OrderProtection = () => {
  return (
    <>
      <div className="bg-white rounded-xl shadow p-10 flex flex-col items-center justify-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center">
          Đơn hàng của bạn sẽ được bảo quản như thế nào?
        </h2>
        <p className="text-gray-700 text-lg mb-8 text-center max-w-2xl">
          FoodGo sẽ bảo quản đơn của bạn bằng túi & thùng để chống nắng mưa, giữ
          nhiệt... trên đường đi một cách tốt nhất.
        </p>

        {/* Hình minh họa */}
        <div className="flex flex-row items-center justify-between w-full max-w-4xl px-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
            alt="Đồ ăn"
            className="h-24 w-auto object-contain"
          />
          <span className="text-3xl text-gray-400">&#8594;</span>
          <img
            src="https://cdn-icons-png.flaticon.com/512/679/679922.png"
            alt="Thùng hàng"
            className="h-24 w-auto object-contain"
          />
          <span className="text-3xl text-gray-400">&#8594;</span>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
            alt="Xe máy"
            className="h-24 w-auto object-contain"
          />
        </div>
      </div>

      {/* Thanh ngang full width nằm ngoài box */}
      <div className="w-screen h-1.5 bg-[#F15A29] shadow-md mt-10"></div>
    </>
  );
};

export default OrderProtection;
