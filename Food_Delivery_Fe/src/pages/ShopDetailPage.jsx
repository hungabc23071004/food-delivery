import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getShopById } from "../api/Shop";
import { getCategoryOfShopByShopId } from "../api/CategoryOfShop";
import ShopInfo from "../components/ShopInfo";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FoodMenu from "../components/FoodMenu";
import ProductCard from "../components/ProductCard";
import { FaSearch } from "react-icons/fa";

const ShopDetailPage = () => {
  const { id } = useParams();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [categories, setCategories] = useState([]);

  // Danh sách món ăn (giữ nguyên demo)
  const foods = [
    // ...existing code...
  ];

  useEffect(() => {
    const fetchShopAndCategories = async () => {
      try {
        setLoading(true);
        const shopData = await getShopById(id);
        setShop(shopData.result || null);
        const categoryData = await getCategoryOfShopByShopId(id);
        setCategories(categoryData.result || []);
      } catch (err) {
        setError("Không thể tải thông tin shop hoặc danh mục");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchShopAndCategories();
  }, [id]);

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
        {/* Hiển thị loading hoặc lỗi */}
        {loading ? (
          <div className="text-center py-8 text-gray-500">
            Đang tải thông tin shop...
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">{error}</div>
        ) : shop ? (
          <ShopInfo shop={shop} />
        ) : null}

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
