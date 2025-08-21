import React, { useState } from "react";
import RestaurantCart from "./RestaurantCart";

const itemsPerPage = 15; // số lượng nhà hàng mỗi trang

const RestaurantList = () => {
  // ...existing code...
  const [currentPage, setCurrentPage] = useState(1);

  const restaurants = [
    {
      id: 1,
      image:
        "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "MiMix - Mì & Đồ Ăn Vặt",
      address: "Dãy Trọ Cây Sữa, Số 2 Ngõ 30A Lê...",
      discount: "50k",
    },
    {
      id: 2,
      image:
        "https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Bún Chả Hà Nội",
      address: "12B Láng Hạ, Đống Đa",
      discount: "30k",
    },
    {
      id: 3,
      image:
        "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Trà Sữa Nhà Làm",
      address: "Số 10 Phạm Văn Đồng, Cầu Giấy",
      discount: "50k",
    },
    {
      id: 4,
      image:
        "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Phở Bò Gia Truyền",
      address: "101 Trần Hưng Đạo, Hoàn Kiếm",
      discount: "20k",
    },
    {
      id: 5,
      image:
        "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Cafe Acoustic",
      address: "78 Nguyễn Thị Minh Khai, Q.1",
      discount: "50k",
    },
    {
      id: 6,
      image:
        "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Bánh Mì Sài Gòn",
      address: "25 Võ Văn Ngân, Thủ Đức",
      discount: "10k",
    },
    {
      id: 7,
      image:
        "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Cơm Tấm Bình Dân",
      address: "47 Hai Bà Trưng, Hoàn Kiếm",
      discount: "50k",
    },
    {
      id: 8,
      image:
        "https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Mì Cay Seoul",
      address: "66 Nguyễn Văn Cừ, Long Biên",
      discount: "50k",
    },
    {
      id: 9,
      image:
        "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Bún Bò Huế",
      address: "56 Hồ Tùng Mậu, Cầu Giấy",
      discount: "30k",
    },
    {
      id: 10,
      image:
        "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Nem Nướng Nha Trang",
      address: "89 Tôn Đức Thắng, Ba Đình",
      discount: "50k",
    },
    {
      id: 11,
      image:
        "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Cháo Sườn Sụn",
      address: "12B Láng Hạ, Đống Đa",
      discount: "20k",
    },
    {
      id: 12,
      image:
        "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Pizza Handmade",
      address: "25 Võ Văn Ngân, Thủ Đức",
      discount: "50k",
    },
    {
      id: 13,
      image:
        "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Gà Rán Giòn Tan",
      address: "Số 10 Phạm Văn Đồng, Cầu Giấy",
      discount: "30k",
    },
    {
      id: 14,
      image:
        "https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Cơm Gà Hải Nam",
      address: "78 Nguyễn Thị Minh Khai, Q.1",
      discount: "50k",
    },
    {
      id: 15,
      image:
        "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Trà Chanh 8x",
      address: "101 Trần Hưng Đạo, Hoàn Kiếm",
      discount: "10k",
    },
    {
      id: 16,
      image:
        "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Bánh Xèo Miền Trung",
      address: "56 Hồ Tùng Mậu, Cầu Giấy",
      discount: "30k",
    },
    {
      id: 17,
      image:
        "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Ốc Cay Sài Gòn",
      address: "66 Nguyễn Văn Cừ, Long Biên",
      discount: "50k",
    },
    {
      id: 18,
      image:
        "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Hủ Tiếu Nam Vang",
      address: "47 Hai Bà Trưng, Hoàn Kiếm",
      discount: "50k",
    },
    {
      id: 19,
      image:
        "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Súp Cua Sài Gòn",
      address: "25 Võ Văn Ngân, Thủ Đức",
      discount: "20k",
    },
    {
      id: 20,
      image:
        "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Bún Đậu Mắm Tôm",
      address: "12B Láng Hạ, Đống Đa",
      discount: "10k",
    },
    {
      id: 21,
      image:
        "https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Cơm Văn Phòng",
      address: "101 Trần Hưng Đạo, Hoàn Kiếm",
      discount: "50k",
    },
    {
      id: 22,
      image:
        "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Kem Tươi Ý",
      address: "78 Nguyễn Thị Minh Khai, Q.1",
      discount: "50k",
    },
    {
      id: 23,
      image:
        "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Lẩu Thái Chua Cay",
      address: "47 Hai Bà Trưng, Hoàn Kiếm",
      discount: "20k",
    },
    {
      id: 24,
      image:
        "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Cà Ri Gà Ấn Độ",
      address: "89 Tôn Đức Thắng, Ba Đình",
      discount: "30k",
    },
    {
      id: 25,
      image:
        "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Dimsum HongKong",
      address: "25 Võ Văn Ngân, Thủ Đức",
      discount: "50k",
    },
  ];

  const totalPages = Math.ceil(restaurants.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentRestaurants = restaurants.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="max-w-7xl mx-auto px-2 py-6">
      {/* Thành phần 'GỢI Ý HÔM NAY' */}
      <div className="bg-[#f7f7f7] py-8 text-center">
        <div className="bg-white py-8">
          <div className="text-[#F15A29] text-2xl font-medium tracking-wide mb-2">
            GỢI Ý HÔM NAY
          </div>
          <div className="border-b-4 border-[#F15A29] w-full mx-auto"></div>
        </div>
      </div>

      {/* Grid danh sách nhà hàng */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {currentRestaurants.map((item) => (
          <RestaurantCart
            key={item.id}
            image={item.image}
            name={item.name}
            address={item.address}
            discount={item.discount}
          />
        ))}
      </div>

      {/* Thanh phân trang */}
      <div className="flex justify-center items-center mt-6 gap-2">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          ‹
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === i + 1
                ? "bg-orange-500 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          ›
        </button>
      </div>
      {/* Đường kẻ ngang màu cam cuối trang */}

      <div
        className="mt-10"
        style={{
          position: "relative",
          width: "100vw",
          left: "50%",
          right: "50%",
          marginLeft: "-50vw",
          marginRight: "-50vw",
          background: "#fff",
          height: "2.5rem",
          zIndex: 10,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "6px",
            background: "#F15A29",
            boxShadow: "0 2px 8px -2px #F15A29",
          }}
        ></div>
      </div>
    </div>
  );
};

export default RestaurantList;
