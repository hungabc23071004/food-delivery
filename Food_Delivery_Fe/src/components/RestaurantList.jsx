import React, { useState, useEffect } from "react";
import RestaurantCart from "./RestaurantCart";
import { getAllShop } from "../api/Shop";

const RestaurantList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAllShop(currentPage - 1);
        if (data && data.result && Array.isArray(data.result.content)) {
          setRestaurants(data.result.content);
          setTotalPages(data.result.totalPages || 1);
        } else {
          setRestaurants([]);
          setTotalPages(1);
        }
      } catch (err) {
        setError("Không thể tải danh sách nhà hàng");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentPage]);

  // Không cần cắt mảng, lấy trực tiếp từ backend
  const currentRestaurants = restaurants;

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

      {/* Hiển thị trạng thái loading hoặc lỗi */}
      {loading ? (
        <div className="text-center py-8 text-gray-500">
          Đang tải danh sách nhà hàng...
        </div>
      ) : error ? (
        <div className="text-center py-8 text-red-500">{error}</div>
      ) : (
        <>
          {/* Grid danh sách nhà hàng */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {currentRestaurants.map((item) => (
              <RestaurantCart
                key={item.id || item._id}
                image={
                  item.logo
                    ? `http://localhost:8080/food/uploads/images/${item.logo}`
                    : undefined
                }
                name={item.name}
                address={item.shopAddress?.fullAddress || ""}
                discount={item.discount || ""}
                description={item.description}
                banner={
                  item.banner ? `/uploads/images/${item.banner}` : undefined
                }
                phoneNumber={item.phoneNumber}
                status={item.status}
                id={item.id}
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
        </>
      )}

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
