import React, { useState, useEffect } from "react";
import { Home, Heart, Clock, Grid, Search } from "lucide-react";

const images = [
  "https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1350&q=80",
  "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "https://images.pexels.com/photos/691114/pexels-photo-691114.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Tự động chuyển ảnh mỗi 2 giây
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative w-full h-[550px] bg-cover bg-center transition-all duration-1000"
      style={{
        backgroundImage: `url(${images[currentIndex]})`,
      }}
    >
      {/* Lớp phủ gradient (sáng hơn) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40"></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4 pt-10 pb-6">
        {/* Tiêu đề */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center leading-tight drop-shadow-2xl mb-2">
          Đặt Đồ ăn, Giao hàng nhanh từ 20'
        </h1>
        <p className="mt-2 text-base md:text-lg text-orange-200 font-medium text-center drop-shadow">
          Có <span className="font-semibold text-orange-400">95,472</span> địa
          điểm tại TP. Hà Nội từ 00:00 - 23:59
        </p>

        {/* Ô tìm kiếm */}
        <div className="flex w-full max-w-2xl mt-8 bg-white rounded-full shadow-xl overflow-hidden border-2 border-orange-400">
          <input
            type="text"
            placeholder="Tìm địa điểm, món ăn, địa chỉ..."
            className="flex-1 px-5 py-4 text-gray-700 text-base outline-none bg-transparent"
          />
          <button className="bg-orange-500 hover:bg-orange-600 transition px-6 flex items-center justify-center">
            <Search className="text-white" size={24} />
          </button>
        </div>

        {/* 4 nút chức năng */}
        <div className="grid grid-cols-2 sm:flex gap-5 mt-10 justify-center">
          {[
            { icon: <Home size={20} />, label: "Gần tôi" },
            { icon: <Heart size={20} />, label: "Yêu thích" },
            { icon: <Clock size={20} />, label: "Mở cửa" },
            { icon: <Grid size={20} />, label: "Danh mục" },
          ].map((btn, index) => (
            <button
              key={index}
              className="flex items-center gap-3 px-6 py-3 bg-white text-gray-800 rounded-2xl shadow-md hover:bg-red-500 hover:text-white transition group"
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white group-hover:bg-white group-hover:text-red-500 transition">
                {btn.icon}
              </div>
              <span className="font-medium">{btn.label}</span>
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-lg font-medium opacity-90">
            Trải nghiệm dịch vụ của FoodGo ngay trên Website
          </p>
          <button className="mt-4 px-8 py-3 bg-red-500 hover:bg-red-600 rounded-full font-semibold text-white shadow-lg transition">
            Đặt món ngay
          </button>
        </div>

        {/* Nút chuyển ảnh thủ công */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full transition ${
                currentIndex === idx ? "bg-red-500" : "bg-white/50"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
