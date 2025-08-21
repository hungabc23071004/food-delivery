import React from "react";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import FeaturesSection from "../components/FeaturesSection";
import RestaurantList from "../components/RestaurantList";
import CouponList from "../components/CouponList";
import OrderProtection from "../components/OrderProtection";

const HomePage = () => {
  return (
    <>
      <Header />
      <Banner />
      <CouponList />
      <RestaurantList />
      <OrderProtection />
      <FeaturesSection />
      <Footer />
    </>
  );
};

export default HomePage;
