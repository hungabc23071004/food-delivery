import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { getShopById } from "../api/Shop";
import { getCategoryOfShopByShopId } from "../api/CategoryOfShop";
import { getFoodByCategoryId } from "../api/Food";
import { MdRestaurantMenu } from "react-icons/md";
import ShopInfo from "../components/ShopInfo";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FoodMenu from "../components/FoodMenu";
import ProductCard from "../components/ProductCard";
import { FaSearch } from "react-icons/fa";
import CartBar from "../components/CartBar";
import { getCart } from "../api/Cart";
import ProductModal from "../components/ProductModal";

const ShopDetailPage = () => {
  const { id } = useParams();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartData, setCartData] = useState(null);

  const [categories, setCategories] = useState([]);
  const [foodsByCategory, setFoodsByCategory] = useState({});
  const categoryRefs = useRef({});

  // modal
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchShopAndCategories = async () => {
      try {
        setLoading(true);
        const shopData = await getShopById(id);
        setShop(shopData.result || null);
        const categoryData = await getCategoryOfShopByShopId(id);
        setCategories(categoryData.result || []);
      } catch {
        setError("Không thể tải thông tin shop hoặc danh mục");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchShopAndCategories();
  }, [id]);

  useEffect(() => {
    const fetchFoods = async () => {
      if (!categories || categories.length === 0) return;
      setLoading(true);
      try {
        const foodsObj = {};
        for (const cat of categories) {
          const foodRes = await getFoodByCategoryId(cat.id);
          foodsObj[cat.id] = foodRes.result || [];
        }
        setFoodsByCategory(foodsObj);
      } catch {
        setError("Không thể tải danh sách món ăn");
      } finally {
        setLoading(false);
      }
    };
    fetchFoods();
  }, [categories]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await getCart();
        setCartData(res.data.result || null);
      } catch {
        setCartData(null);
      }
    };
    fetchCart();
  }, [id]);

  const filteredFoodsByCategory = {};
  Object.entries(foodsByCategory).forEach(([catId, foods]) => {
    filteredFoodsByCategory[catId] = foods.filter((food) =>
      food.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  const scrollToCategory = (catId) => {
    setTimeout(() => {
      if (categoryRefs.current[catId]) {
        categoryRefs.current[catId].scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  };

  return (
    <>
      <Header />
      <div className="pb-20 bg-gradient-to-br from-orange-50 via-white to-orange-100 min-h-screen">
        {loading ? (
          <div className="text-center py-8 text-gray-500">
            Đang tải thông tin shop...
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">{error}</div>
        ) : shop ? (
          <ShopInfo shop={shop} />
        ) : null}

        <div className="w-full h-1 bg-gradient-to-r from-orange-300 via-orange-100 to-orange-300 rounded-full my-8 shadow-md"></div>

        <div className="flex flex-col md:flex-row justify-between items-start mt-8 px-4 md:px-16 gap-8">
          <div className="flex-shrink-0 w-full md:w-[370px]">
            <div className="bg-white rounded-3xl shadow-2xl border-4 border-orange-400 p-8 mb-6">
              <FoodMenu
                categories={categories}
                selectedCategory={selectedCategory}
                onSelect={(catId) => {
                  setSelectedCategory(catId);
                  scrollToCategory(catId);
                }}
              />
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <div className="flex items-center gap-2 border rounded-xl px-4 py-3 mb-6 bg-gradient-to-r from-orange-50 via-white to-orange-100">
                <FaSearch className="text-orange-400 text-lg" />
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
                {categories.length > 0 ? (
                  categories.map((cat) => (
                    <div
                      key={cat.id}
                      className="mb-8 scroll-mt-24"
                      ref={(el) => (categoryRefs.current[cat.id] = el)}
                    >
                      <h3 className="text-xl font-bold mb-4 text-orange-500 uppercase flex items-center gap-2">
                        <MdRestaurantMenu className="text-orange-400" />
                        {cat.name}
                      </h3>
                      <div className="space-y-4">
                        {filteredFoodsByCategory[cat.id]?.length > 0 ? (
                          filteredFoodsByCategory[cat.id].map((food) => (
                            <div key={food.id}>
                              <ProductCard
                                product={food}
                                onCartChange={setCartData}
                                onOpenModal={() => handleOpenModal(food)}
                              />
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-400 text-base">
                            Không có món nào trong danh mục này.
                          </p>
                        )}
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

      <CartBar cartData={cartData} />
      <Footer />

      {isModalOpen && selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={handleCloseModal}
          onCartChange={setCartData}
        />
      )}
    </>
  );
};

export default ShopDetailPage;
