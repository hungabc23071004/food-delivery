import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import CategoryItem from "../components/CategoryItem";
import CategoryMenu from "../components/CategoryMenu";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getCategoryByParentId } from "../api/Category";
const CategoryPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [subCategories, setSubCategories] = useState([]);

  // Hàm gọi khi chọn category
  const handleCategoryClick = async (categoryId, index) => {
    setActiveIndex(index);
    try {
      const res = await getCategoryByParentId(categoryId);
      setSubCategories(res.result || []);
    } catch (err) {
      setSubCategories([]);
    }
  };

  return (
    <>
      <Header />
      <div className="flex h-screen bg-white">
        {/* Sidebar CategoryMenu */}
        <div className="flex flex-col items-center w-56 bg-white border-r border-gray-200 ">
          <CategoryMenu
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            onCategoryClick={handleCategoryClick}
          />
        </div>
        {/* Main content */}
        <div className="flex-1 flex flex-col w-44 bg-white border border-orange-300 rounded-2xl shadow-lg h-full overflow-y-auto  ">
          <div className="flex items-center justify-center w-full py-6 bg-white mb-4">
            <h1 className="text-2xl font-bold text-gray-800">Danh mục</h1>
          </div>
          {/* Grid danh mục động */}
          <div className="grid grid-cols-4 gap-x-8 gap-y-10 px-12 pb-12">
            {subCategories.map((item, index) => (
              <CategoryItem
                key={index}
                image={`http://localhost:8080/food/uploads/images/${item.logoUrl}`}
                text={item.name}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default CategoryPage;
