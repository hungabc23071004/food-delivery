import React from "react";
import { MdLocationOn, MdPhone, MdAccessTime } from "react-icons/md";
import { FaStar } from "react-icons/fa";

const ShopInfo = ({ shop }) => {
  if (!shop) return null;

  return (
    <div className="bg-white mb-10 p-8 md:p-12 rounded-3xl">
      <div className="flex flex-col md:flex-row gap-8 items-stretch">
        {/* Banner 50% */}
        <div className="basis-1/2 flex justify-center items-center md:ml-16">
          <div className="w-full h-full flex items-center justify-center">
            <img
              src={
                shop.banner
                  ? `http://localhost:8080/food/uploads/images/${shop.banner}`
                  : "https://png.pngtree.com/thumb_back/fw800/background/20190220/ourmid/pngtree-board-food-lunch-food-image_9613.jpg"
              }
              alt="Shop Banner"
              className="rounded-3xl w-full h-[340px] object-cover shadow-2xl border-4 border-orange-200 bg-white"
              style={{ boxShadow: "0 8px 32px rgba(255, 140, 0, 0.15)" }}
            />
          </div>
        </div>

        {/* Info 50% */}
        <div className="basis-1/2 flex flex-col justify-center items-start space-y-4 pl-0 md:pl-4 bg-white rounded-3xl">
          {/* Logo và tên shop nằm ngang nhau */}
          <div className="mb-1 w-full flex items-center gap-4">
            <img
              src={
                shop.logo
                  ? `http://localhost:8080/food/uploads/images/${shop.logo}`
                  : "https://tse1.mm.bing.net/th/id/OIP.C6kSV1Gpk1wAWUnp-K_ePQAAAA?rs=1&pid=ImgDetMain&o=7&rm=3"
              }
              alt="Shop Logo"
              className="w-16 h-16 object-cover rounded-full border-2 border-orange-300"
            />
            <div className="flex flex-col gap-1">
              <h2 className="text-xl md:text-xl font-extrabold text-black mb-1">
                {shop.name}
              </h2>
              <span
                className={`px-2 py-1 rounded text-xs font-bold flex items-center gap-1 ${
                  shop.status === "ONLINE"
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {shop.status === "ONLINE" ? "Đang mở cửa" : "Đang đóng cửa"}
              </span>
            </div>
          </div>

          {/* Mô tả */}
          <p className="text-black mt-2 text-sm md:text-base leading-relaxed">
            {shop.description}
          </p>

          {/* Địa chỉ */}
          <p className="text-black mt-2 text-sm md:text-base leading-relaxed flex items-center gap-2">
            <MdLocationOn className="text-orange-500 text-lg" />
            {shop.shopAddress?.fullAddress}
          </p>

          {/* Số điện thoại */}
          <p className="text-black text-sm md:text-base leading-relaxed flex items-center gap-2">
            <MdPhone className="text-orange-500 text-lg" />
            SĐT: {shop.phoneNumber}
          </p>

          {/* Thời gian mở/đóng cửa */}
          <div className="flex items-center gap-2 text-base font-semibold mb-2 w-full ">
            <span className="text-black flex items-center gap-2">
              <MdAccessTime className="text-orange-500 text-lg" />
              <span className="ml-1">Mở cửa</span>
              {shop.openingTime} - {shop.closingTime}
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-6">
            <span className="flex items-center gap-1 text-amber-300 text-xl font-bold">
              {[...Array(Math.round(shop.rating || 4.6))].map((_, i) => (
                <FaStar key={i} />
              ))}
            </span>
            <span className="font-bold text-xl text-amber-300">
              {shop.rating || 4.6}
            </span>
            <span className="bg-gray-100 text-orange-500 px-2 py-1 rounded text-xs font-bold">
              {shop.reviewCount || 100}+
            </span>
            <span className="text-xs text-blue-500">
              đánh giá trên FoodDelivery
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopInfo;
