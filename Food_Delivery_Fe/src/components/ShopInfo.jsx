import React from "react";
import { MdLocationOn } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { FaTicketAlt } from "react-icons/fa";

const ShopInfo = () => {
  return (
    <div className="bg-white mb-10 p-8 md:p-12">
      <div className="flex flex-col md:flex-row gap-8 items-stretch">
        {/* Banner 50% */}
        <div className="basis-1/2 flex justify-center items-center md:ml-16">
          <div className="w-full h-full flex items-center justify-center">
            <img
              src="https://png.pngtree.com/thumb_back/fw800/background/20190220/ourmid/pngtree-board-food-lunch-food-image_9613.jpg"
              alt="Shop Banner"
              className="rounded-3xl w-full h-[340px] object-cover shadow-2xl border-4 border-orange-200 bg-white"
              style={{ boxShadow: "0 8px 32px rgba(255, 140, 0, 0.15)" }}
            />
          </div>
        </div>

        {/* Info 50% */}
        <div className="basis-1/2 flex flex-col justify-center items-start space-y-4 pl-0 md:pl-4 bg-white rounded-3xl">
          {/* Breadcrumb + Badge */}
          <div className="flex items-center flex-wrap gap-2 text-base mb-2">
            <span className="text-blue-500">
              Home &gt; Hà Nội &gt; ToCoToCo
            </span>
            <span className="px-2 py-1 bg-gray-100 text-orange-500 rounded text-xs font-bold flex items-center gap-1">
              Yêu thích
            </span>
            <span className="px-2 py-1 bg-gray-100 text-black rounded text-xs font-bold">
              Quán ăn
            </span>
          </div>

          {/* Title & Address */}
          <div className="mb-1 w-full">
            <h2 className="text-xl md:text-xl font-extrabold text-black mb-1">
              Trà Sữa ToCoToCo
            </h2>
            <p className="text-black mt-2 text-sm md:text-base leading-relaxed flex items-center gap-2">
              <MdLocationOn className="text-orange-500 text-lg" />
              LK3 Số 3 Ngõ 17 Nguyễn Văn Lộc, P. Mộ Lao, Hà Đông, Hà Nội
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-1 w-full">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-amber-300 text-xl font-bold">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </span>
              <span className="font-bold text-xl text-amber-300">4.6</span>
              <span className="bg-gray-100 text-orange-500 px-2 py-1 rounded text-xs font-bold">
                100+
              </span>
              <span className="text-xs text-blue-500">
                đánh giá trên FoodDelivery
              </span>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center gap-2 text-base font-semibold mb-2 w-full">
            <div className="flex items-center gap-2">
              <span className="text-black flex items-center">
                <span className="w-2 h-2 bg-black rounded-full mr-1"></span>Mở
                cửa
              </span>
              <span className="text-black">00:00 - 23:59</span>
              <span className="text-black">$ 0 - 0</span>
            </div>
          </div>

          {/* Promotions */}
          <div className="space-y-3 mt-1 w-full">
            <div className="flex items-center gap-3">
              <FaTicketAlt className="text-orange-500 text-2xl" />
              <span className="text-black text-base font-bold">
                Giảm <b>11%</b> tối đa <b>15.000đ</b> cho đơn từ <b>75.000đ</b>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <FaTicketAlt className="text-orange-500 text-2xl" />
              <span className="text-black text-base font-bold">
                Nhập <b className="text-black">TOCO20</b>: Giảm <b>40%</b>, tối
                đa <b>20.000đ</b>
              </span>
            </div>
            <div className="mt-4">
              <button className="text-orange-500 font-semibold underline hover:text-orange-600 transition-colors text-base">
                Xem tất cả các voucher
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopInfo;
