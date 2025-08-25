import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import CategoryItem from "../components/CategoryItem";
import CategoryMenu from "../components/CategoryMenu";
import Header from "../components/Header";
import Footer from "../components/Footer";
const items = [
  {
    image: "https://cdn-icons-png.flaticon.com/128/3361/3361969.png",
    text: "Cơm",
  },
  {
    image: "https://cdn-icons-png.flaticon.com/128/3361/3361969.png",
    text: "Trà sữa",
  },
  {
    image: "https://cdn-icons-png.flaticon.com/128/3361/3361969.png",
    text: "Đồ ăn vặt",
  },
  {
    image: "https://cdn-icons-png.flaticon.com/128/3361/3361969.png",
    text: "Gà",
  },
  {
    image: "https://cdn-icons-png.flaticon.com/128/3361/3361969.png",
    text: "Cà phê",
  },
  {
    image: "https://cdn-icons-png.flaticon.com/128/3361/3361969.png",
    text: "Tráng miệng",
  },
  {
    image: "https://cdn-icons-png.flaticon.com/128/3361/3361969.png",
    text: "Bún",
  },
  {
    image: "https://cdn-icons-png.flaticon.com/128/3361/3361969.png",
    text: "Trà",
  },
  {
    image: "https://cdn-icons-png.flaticon.com/128/3361/3361969.png",
    text: "Bánh Âu Á",
  },
];
const CategoryPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      {" "}
      <Header />{" "}
      <div className="flex h-screen bg-white">
        {" "}
        {/* Sidebar CategoryMenu */}{" "}
        <div className="flex flex-col items-center w-56 bg-white border-r border-gray-200 ">
          {" "}
          <CategoryMenu
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />{" "}
        </div>{" "}
        {/* Main content */}{" "}
        <div className="flex-1 flex flex-col w-44 bg-white border border-orange-300 rounded-2xl shadow-lg h-full overflow-y-auto  ">
          <div className="flex items-center justify-center w-full py-6 bg-white mb-4">
            <h1 className="text-2xl font-bold text-gray-800">Danh mục</h1>{" "}
          </div>{" "}
          {/* Grid danh mục */}{" "}
          <div className="grid grid-cols-4 gap-x-8 gap-y-10 px-12 pb-12">
            {" "}
            {items.map((item, index) => (
              <CategoryItem key={index} image={item.image} text={item.text} />
            ))}{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      <Footer />{" "}
    </>
  );
};
export default CategoryPage;
