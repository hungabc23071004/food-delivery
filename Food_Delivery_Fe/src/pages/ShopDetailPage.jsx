import React, { useState } from "react";
import ShopInfo from "../components/ShopInfo";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FoodMenu from "../components/FoodMenu";
import ProductCard from "../components/ProductCard";
import { FaSearch } from "react-icons/fa";

const ShopDetailPage = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Danh mục
  const categories = [
    { id: "all", name: "Tất cả", icon: "🍽️" },
    { id: "Khuyến mãi", name: "Khuyến mãi", icon: "🔥" },
    { id: "Đồ uống", name: "Đồ uống", icon: "🥤" },
  ];

  // Danh sách món ăn
  const foods = [
    {
      id: 1,
      category: "Khuyến mãi",
      name: "Combo Sundae Mê Ly",
      description:
        "01 Super Sundae Trân châu đường đen + 01 Lucky Sundae Ococo",
      price: 50000,
      originalPrice: 56000,
      sold: 5,
      likes: 20,
      remaining: "Còn lại 3 suất",
      badge: "Giảm giá",
      image:
        "https://hopdungthucan.com/wp-content/uploads/2022/05/hinh-anh-tra-sua-dep-tuyet-800x800.jpg",
    },
    {
      id: 2,
      category: "Đồ uống",
      name: "Tiếp sức diệu binh",
      description: "02 Nước chanh tươi lạnh, gấp đôi Vitamin C",
      price: 29000,
      originalPrice: 36000,
      sold: 4,
      likes: 15,
      remaining: "",
      badge: "Hot",
      image:
        "https://hopdungthucan.com/wp-content/uploads/2022/05/hinh-anh-tra-sua-dep-tuyet-800x800.jpg",
    },
    {
      id: 3,
      category: "Đồ uống",
      name: "Combo Summer Fresh",
      description:
        "01 Trà sữa trân châu M + 01 Trà sữa bá vương + 01 Nước chanh",
      price: 71000,
      originalPrice: 79000,
      sold: 2,
      likes: 10,
      remaining: "",
      badge: "",
      image:
        "https://hopdungthucan.com/wp-content/uploads/2022/05/hinh-anh-tra-sua-dep-tuyet-800x800.jpg",
    },
  ];

  // Lọc theo tìm kiếm + category
  const filteredFoods = foods.filter(
    (food) =>
      food.name.toLowerCase().includes(search.toLowerCase()) &&
      (selectedCategory === null ||
        selectedCategory === "all" ||
        food.category === selectedCategory)
  );

  return (
    <>
      <Header />
      <div className="pb-20 bg-gradient-to-br from-orange-50 via-white to-orange-100 min-h-screen">
        <ShopInfo />

        {/* Thanh phân cách */}
        <div className="w-full h-1 bg-gradient-to-r from-orange-300 via-orange-100 to-orange-300 rounded-full my-8 shadow-md"></div>

        {/* Layout 2 cột */}
        <div className="flex flex-col md:flex-row justify-between items-start mt-8 px-4 md:px-16 gap-8">
          {/* Menu bên trái */}
          <div className="flex-shrink-0 w-full md:w-[370px]">
            <div className="bg-white rounded-3xl shadow-2xl border-4 border-orange-400 p-8 mb-6 transition-all duration-300 hover:shadow-orange-200">
              <FoodMenu
                categories={categories}
                selectedCategory={selectedCategory}
                onSelect={setSelectedCategory}
              />
            </div>
          </div>

          {/* Danh sách món ăn bên phải */}
          <div className="flex-1">
            <div className="bg-white rounded-3xl shadow-2xl p-8 transition-all duration-300 hover:shadow-orange-200">
              {/* Search */}
              <div className="flex items-center gap-2 border rounded-xl px-4 py-3 mb-6 bg-gradient-to-r from-orange-50 via-white to-orange-100">
                <FaSearch className="text-orange-400 text-lg animate-bounce" />
                <input
                  type="text"
                  placeholder="Tìm món..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full outline-none text-base bg-transparent"
                />
              </div>

              <h2 className="text-2xl font-extrabold mb-6 text-orange-600 tracking-wide drop-shadow">
                Danh sách món ăn
              </h2>

              <div className="space-y-8">
                {filteredFoods.length > 0 ? (
                  // Nhóm theo category
                  Object.entries(
                    filteredFoods.reduce((acc, food) => {
                      acc[food.category] = acc[food.category] || [];
                      acc[food.category].push(food);
                      return acc;
                    }, {})
                  ).map(([category, foods]) => (
                    <div key={category} className="mb-8">
                      <h3 className="text-xl font-bold mb-4 text-orange-500 uppercase tracking-wider drop-shadow-lg">
                        {category}
                      </h3>
                      <div className="space-y-4">
                        {foods.map((food, idx) => (
                          <div
                            key={food.id}
                            className={`transition-all duration-200 bg-gradient-to-r from-white to-orange-50 rounded-2xl shadow-md hover:scale-[1.02] hover:shadow-orange-200 border border-orange-100 p-4 ${
                              idx % 2 === 0
                                ? "animate-fade-in-left"
                                : "animate-fade-in-right"
                            }`}
                          >
                            <ProductCard product={food} />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-base">
                    Không tìm thấy món nào.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShopDetailPage;
